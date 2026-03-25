import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BiCodeBlock, BiLayer, BiMusic, BiHash, BiMap, BiCameraMovie, BiCommentDetail } from 'react-icons/bi';
import { useAdminConfig } from '../../../context/AdminConfigContext';

const MEDIA_FIELDS = [
  'url',
  'videoUrl',
  'mediaUrl',
  'image',
  'thumbnail',
  'cover',
  'coverImage',
  'avatar',
  'src',
  'poster',
];
const DEFAULT_REEL_SECTIONS = [
  { id: 'foryou', label: 'For You' },
  { id: 'following', label: 'Following' },
  { id: 'trending', label: 'Trending' },
];

const isUrlLike = (value) => typeof value === 'string' && /^(https?:\/\/|\/|blob:|data:)/.test(value);
const isVideoUrl = (url = '') => /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || /\/video\//i.test(url);
const isImageUrl = (url = '') => /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(url) || /\/image\//i.test(url);

const getMediaKind = (item, url) => {
  const explicitType = (item?.type || '').toLowerCase();
  if (explicitType === 'video') {
    return 'video';
  }
  if (explicitType === 'photo' || explicitType === 'image') {
    return 'image';
  }
  if (isVideoUrl(url)) {
    return 'video';
  }
  if (isImageUrl(url)) {
    return 'image';
  }
  return 'image';
};

const getMediaTitle = (item, fallback) =>
  item?.title ||
  item?.caption ||
  item?.musicName ||
  item?.username ||
  item?.label ||
  item?.name ||
  fallback;

const getMediaSubtitle = (item) =>
  (item?.username && `@${item.username}`) ||
  item?.creator ||
  item?.host ||
  item?.shopName ||
  item?.meta ||
  item?.type ||
  '';

const inferMediaType = (url = '') => {
  if (isVideoUrl(url)) {
    return 'video';
  }
  if (isImageUrl(url)) {
    return 'image';
  }
  return 'video';
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });

const extractMediaEntries = (value, sectionId) => {
  const entries = [];
  const seen = new Set();

  const visit = (node, path = sectionId) => {
    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }

    if (!node || typeof node !== 'object') {
      return;
    }

    const url = MEDIA_FIELDS.map((key) => node[key]).find((candidate) => isUrlLike(candidate));

    if (url) {
      const dedupeKey = `${path}:${url}`;
      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey);
        entries.push({
          id: node.id || dedupeKey,
          url,
          kind: getMediaKind(node, url),
          title: getMediaTitle(node, 'Untitled media'),
          subtitle: getMediaSubtitle(node),
        });
      }
    }

    Object.entries(node).forEach(([key, child]) => {
      if (child && typeof child === 'object') {
        visit(child, `${path}.${key}`);
      }
    });
  };

  visit(value, sectionId);
  return entries;
};

const AdminJsonEditor = ({ title, description, value, onSave }) => {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState('');

  React.useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
    setError('');
  }, [value]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(draft);
      onSave(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON. Please check your formatting.');
    }
  };

  return (
    <div className="admin-card admin-json-editor">
      <div className="admin-card-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button type="button" className="admin-primary-btn" onClick={handleSave}>
          Save JSON
        </button>
      </div>
      <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={14} />
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
};

const AdminMediaAsset = ({ item }) => {
  const [mediaError, setMediaError] = useState(false);

  if (mediaError) {
    return (
      <div className="admin-media-fallback">
        <span className="admin-media-fallback-title">Media preview unavailable</span>
        <span className="admin-media-fallback-url">{item.url}</span>
      </div>
    );
  }

  if (item.kind === 'video') {
    return (
      <video
        src={item.url}
        controls
        preload="metadata"
        playsInline
        onError={() => setMediaError(true)}
      />
    );
  }

  return <img src={item.url} alt={item.title} loading="lazy" onError={() => setMediaError(true)} />;
};

const AdminMediaPreview = ({ title, description, items, actionNode, renderItemActions }) => (
  <div className="admin-card admin-media-preview">
    <div className="admin-card-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="admin-card-actions">
        <span className="admin-chip">{items.length} media items</span>
        {actionNode}
      </div>
    </div>

    {items.length === 0 ? (
      <p className="admin-note">No media URLs found in this section.</p>
    ) : (
      <div className="admin-media-grid">
        {items.map((item) => (
          <div key={item.id} className="admin-media-card">
            <div className="admin-media-frame">
              <AdminMediaAsset item={item} />
            </div>
            <div className="admin-media-meta">
              <p className="admin-media-title">{item.title}</p>
              {item.subtitle ? <p className="admin-media-subtitle">{item.subtitle}</p> : null}
              {renderItemActions ? (
                <div className="admin-media-actions">{renderItemActions(item)}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AdminContent = () => {
  const { config, setConfig } = useAdminConfig();
  const [activeTab, setActiveTab] = useState('reels');
  const [isAddReelModalOpen, setIsAddReelModalOpen] = useState(false);
  const [addReelError, setAddReelError] = useState('');
  const uploadInputRef = useRef(null);
  const [editReelError, setEditReelError] = useState('');
  const [editingReelId, setEditingReelId] = useState(null);
  const editUploadInputRef = useRef(null);
  const [addReelForm, setAddReelForm] = useState({
    uploadUrl: '',
    uploadName: '',
    username: '',
    caption: '',
    music: '',
    likes: '0',
    comments: '0',
    shares: '0',
    mediaType: '',
    sectionId: '',
  });
  const [editReelForm, setEditReelForm] = useState({
    uploadUrl: '',
    uploadName: '',
    username: '',
    caption: '',
    music: '',
    likes: '0',
    comments: '0',
    shares: '0',
    mediaType: 'video',
  });

  const sections = useMemo(
    () => [
      { id: 'reels', label: 'Reels', icon: <BiLayer /> },
      { id: 'sounds', label: 'Sounds', icon: <BiMusic /> },
      { id: 'hashtags', label: 'Hashtags', icon: <BiHash /> },
      { id: 'shop', label: 'Shop', icon: <BiCameraMovie /> },
      { id: 'live', label: 'Live', icon: <BiCameraMovie /> },
      { id: 'templates', label: 'Templates', icon: <BiCameraMovie /> },
      { id: 'locations', label: 'Locations', icon: <BiMap /> },
      { id: 'interests', label: 'Interests', icon: <BiCameraMovie /> },
      { id: 'comments', label: 'Comments', icon: <BiCommentDetail /> },
      { id: 'create', label: 'Create Tools', icon: <BiCodeBlock /> },
    ],
    [],
  );

  const setSection = (updater) => {
    setConfig((currentConfig) => updater(currentConfig));
  };

  const sectionMap = {
    reels: {
      title: 'Reel Library',
      description: 'Manage the core reel inventory and section routing.',
      value: config?.reels,
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          reels: nextValue,
        })),
    },
    sounds: {
      title: 'Sound Catalog',
      description: 'Search and create sound entries visible across the app.',
      value: config?.search?.sounds,
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          search: {
            ...currentConfig.search,
            sounds: nextValue,
          },
        })),
    },
    hashtags: {
      title: 'Hashtags',
      description: 'Edit hashtag discovery items and detail mapping.',
      value: {
        hashtags: config?.search?.hashtags || [],
        hashtagDetails: config?.search?.hashtagDetails || {},
      },
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          search: {
            ...currentConfig.search,
            hashtags: nextValue.hashtags || [],
            hashtagDetails: nextValue.hashtagDetails || {},
          },
        })),
    },
    shop: {
      title: 'Shop Inventory',
      description: 'Manage shop cards displayed in search.',
      value: config?.search?.shop,
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          search: {
            ...currentConfig.search,
            shop: nextValue,
          },
        })),
    },
    live: {
      title: 'Live Results',
      description: 'Manage live cards and host previews.',
      value: config?.search?.live,
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          search: {
            ...currentConfig.search,
            live: nextValue,
          },
        })),
    },
    templates: {
      title: 'Templates',
      description: 'Gallery items shown in the create templates tray.',
      value: config?.createFlow?.galleryItems || [],
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          createFlow: {
            ...currentConfig.createFlow,
            galleryItems: nextValue,
          },
        })),
    },
    locations: {
      title: 'Locations',
      description: 'Popular location chips and search results.',
      value: config?.createFlow?.locations || { chips: [], results: [] },
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          createFlow: {
            ...currentConfig.createFlow,
            locations: nextValue,
          },
        })),
    },
    interests: {
      title: 'Onboarding Interests',
      description: 'Interest clusters powering the onboarding flow.',
      value: config?.onboarding?.interests || [],
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          onboarding: {
            ...currentConfig.onboarding,
            interests: nextValue,
          },
        })),
    },
    comments: {
      title: 'Comments & Emojis',
      description: 'Seed comments and quick emoji chips.',
      value: config?.comments || {},
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          comments: nextValue,
        })),
    },
    create: {
      title: 'Create Flow Tools',
      description: 'Configure filters, tools, audiences, and share options.',
      value: config?.createFlow,
      onSave: (nextValue) =>
        setSection((currentConfig) => ({
          ...currentConfig,
          createFlow: nextValue,
        })),
    },
  };

  const activeSection = sectionMap[activeTab];
  const mediaItems = useMemo(
    () => (activeSection ? extractMediaEntries(activeSection.value, activeTab) : []),
    [activeSection, activeTab],
  );
  const shouldShowMediaPreview = mediaItems.length > 0;
  const reelSections = useMemo(() => {
    const existing = Array.isArray(config?.reels?.sections) ? config.reels.sections : [];
    const normalizedExisting = existing.filter(
      (section) => section && typeof section.id === 'string' && typeof section.label === 'string',
    );
    const seen = new Set(normalizedExisting.map((section) => section.id));
    const merged = [...normalizedExisting];

    DEFAULT_REEL_SECTIONS.forEach((section) => {
      if (!seen.has(section.id)) {
        merged.push({
          ...section,
          reelIds: [],
        });
      }
    });

    return merged;
  }, [config?.reels?.sections]);

  useEffect(() => {
    setIsAddReelModalOpen(false);
    setAddReelError('');
    setEditingReelId(null);
    setEditReelError('');
  }, [activeTab]);

  const openAddReelModal = () => {
    const defaultSectionId = reelSections[0]?.id || 'foryou';
    setAddReelForm({
      uploadUrl: '',
      uploadName: '',
      username: '',
      caption: '',
      music: '',
      likes: '0',
      comments: '0',
      shares: '0',
      mediaType: '',
      sectionId: defaultSectionId,
    });
    setAddReelError('');
    setIsAddReelModalOpen(true);
  };

  const closeAddReelModal = () => {
    setIsAddReelModalOpen(false);
    setAddReelError('');
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  };

  const handleReelFieldChange = (field, value) => {
    setAddReelForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openEditReelModal = (reelId) => {
    const reel = (config?.reels?.library || []).find((item) => item.id === reelId);
    if (!reel) {
      return;
    }
    setEditReelForm({
      uploadUrl: reel.url || '',
      uploadName: '',
      username: reel.username || '',
      caption: reel.caption || '',
      music: reel.music || '',
      likes: reel.likes || '0',
      comments: reel.comments || '0',
      shares: reel.shares || '0',
      mediaType: reel.type || inferMediaType(reel.url || ''),
    });
    setEditReelError('');
    setEditingReelId(reelId);
  };

  const closeEditReelModal = () => {
    setEditingReelId(null);
    setEditReelError('');
    if (editUploadInputRef.current) {
      editUploadInputRef.current.value = '';
    }
  };

  const handleEditFieldChange = (field, value) => {
    setEditReelForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUploadButtonClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleVideoSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('video/')) {
      setAddReelError('Please select a valid video file.');
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setAddReelForm((prev) => ({
        ...prev,
        uploadUrl: dataUrl,
        uploadName: file.name,
        mediaType: 'video',
      }));
      setAddReelError('');
    } catch {
      setAddReelError('Unable to read selected video file.');
    }
  };

  const handleEditUploadButtonClick = () => {
    if (editUploadInputRef.current) {
      editUploadInputRef.current.click();
    }
  };

  const handleEditVideoSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('video/')) {
      setEditReelError('Please select a valid video file.');
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setEditReelForm((prev) => ({
        ...prev,
        uploadUrl: dataUrl,
        uploadName: file.name,
        mediaType: 'video',
      }));
      setEditReelError('');
    } catch {
      setEditReelError('Unable to read selected video file.');
    }
  };

  const handlePostReel = () => {
    const url = addReelForm.uploadUrl;
    const username = addReelForm.username.trim().replace(/^@/, '');
    const caption = addReelForm.caption.trim();
    const sectionId = addReelForm.sectionId || reelSections[0]?.id || 'foryou';

    if (!url) {
      setAddReelError('Please upload a video file.');
      return;
    }
    if (!username) {
      setAddReelError('Username is required.');
      return;
    }
    if (!caption) {
      setAddReelError('Caption is required.');
      return;
    }

    const resolvedMediaType = addReelForm.mediaType || inferMediaType(url);
    const urlLooksLikeVideo = isVideoUrl(url);
    const urlLooksLikeImage = isImageUrl(url);

    if (!urlLooksLikeVideo && !urlLooksLikeImage && !addReelForm.mediaType) {
      setAddReelError('Please enter a direct media URL or select Media Type manually.');
      return;
    }
    if (resolvedMediaType === 'video' && !urlLooksLikeVideo && !addReelForm.mediaType) {
      setAddReelError('Video URL should be a direct playable link (for example .mp4).');
      return;
    }
    if (resolvedMediaType === 'image' && !urlLooksLikeImage && !addReelForm.mediaType) {
      setAddReelError('Image URL should be a direct image link (for example .jpg/.png).');
      return;
    }

    const newReelId = `reel-${Date.now()}`;

    setConfig((currentConfig) => {
      const currentLibrary = Array.isArray(currentConfig?.reels?.library)
        ? currentConfig.reels.library
        : [];
      const currentSections = Array.isArray(currentConfig?.reels?.sections)
        ? currentConfig.reels.sections
        : [];

      const nextReel = {
        id: newReelId,
        url,
        username,
        caption,
        music: addReelForm.music.trim() || 'Original Sound',
        likes: addReelForm.likes.trim() || '0',
        comments: addReelForm.comments.trim() || '0',
        shares: addReelForm.shares.trim() || '0',
        isLiked: false,
        type: resolvedMediaType,
      };

      const targetSectionIds = new Set([sectionId, 'foryou']);
      let sectionMatched = false;
      const nextSections = currentSections.map((section) => {
        if (!targetSectionIds.has(section.id)) {
          return section;
        }
        const reelIds = Array.isArray(section.reelIds) ? section.reelIds : [];
        sectionMatched = sectionMatched || section.id === sectionId;
        if (reelIds.includes(newReelId)) {
          return section;
        }
        return {
          ...section,
          reelIds: [...reelIds, newReelId],
        };
      });

      if (!sectionMatched) {
        const fallbackLabel =
          reelSections.find((section) => section.id === sectionId)?.label || sectionId;
        nextSections.push({
          id: sectionId,
          label: fallbackLabel,
          reelIds: [newReelId],
        });
      }
      if (!nextSections.some((section) => section.id === 'foryou')) {
        nextSections.push({
          id: 'foryou',
          label: 'For You',
          reelIds: [newReelId],
        });
      }

      return {
        ...currentConfig,
        reels: {
          ...currentConfig.reels,
          library: [...currentLibrary, nextReel],
          sections: nextSections,
        },
      };
    });

    closeAddReelModal();
  };

  const handleUpdateReel = () => {
    if (!editingReelId) {
      return;
    }

    const url = editReelForm.uploadUrl;
    const username = editReelForm.username.trim().replace(/^@/, '');
    const caption = editReelForm.caption.trim();

    if (!url) {
      setEditReelError('Please upload/select a valid media file.');
      return;
    }
    if (!username) {
      setEditReelError('Username is required.');
      return;
    }
    if (!caption) {
      setEditReelError('Caption is required.');
      return;
    }

    const resolvedMediaType = editReelForm.mediaType || inferMediaType(url);

    setConfig((currentConfig) => {
      const currentLibrary = Array.isArray(currentConfig?.reels?.library)
        ? currentConfig.reels.library
        : [];

      return {
        ...currentConfig,
        reels: {
          ...currentConfig.reels,
          library: currentLibrary.map((reel) =>
            reel.id === editingReelId
              ? {
                ...reel,
                url,
                username,
                caption,
                music: editReelForm.music.trim() || 'Original Sound',
                likes: editReelForm.likes.trim() || '0',
                comments: editReelForm.comments.trim() || '0',
                shares: editReelForm.shares.trim() || '0',
                type: resolvedMediaType,
              }
              : reel,
          ),
        },
      };
    });

    closeEditReelModal();
  };

  const handleDeleteReel = (reelId) => {
    setConfig((currentConfig) => {
      const currentLibrary = Array.isArray(currentConfig?.reels?.library)
        ? currentConfig.reels.library
        : [];
      const currentSections = Array.isArray(currentConfig?.reels?.sections)
        ? currentConfig.reels.sections
        : [];
      const currentProfiles = currentConfig?.users?.profiles || {};

      const nextSections = currentSections.map((section) => ({
        ...section,
        reelIds: (Array.isArray(section.reelIds) ? section.reelIds : []).filter((id) => id !== reelId),
      }));

      const nextProfiles = Object.fromEntries(
        Object.entries(currentProfiles).map(([key, profile]) => [
          key,
          {
            ...profile,
            savedReelIds: (Array.isArray(profile.savedReelIds) ? profile.savedReelIds : []).filter(
              (id) => id !== reelId,
            ),
            likedReelIds: (Array.isArray(profile.likedReelIds) ? profile.likedReelIds : []).filter(
              (id) => id !== reelId,
            ),
          },
        ]),
      );

      return {
        ...currentConfig,
        reels: {
          ...currentConfig.reels,
          library: currentLibrary.filter((reel) => reel.id !== reelId),
          sections: nextSections,
        },
        users: {
          ...currentConfig.users,
          profiles: nextProfiles,
        },
      };
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Content</h1>
          <p>Control every piece of content powering the user experience.</p>
        </div>
      </div>

      <div className="admin-tabs">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveTab(section.id)}
            className={`admin-tab ${activeTab === section.id ? 'active' : ''}`}
          >
            <span className="admin-tab-icon">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {activeSection &&
        (shouldShowMediaPreview ? (
          <>
            <AdminMediaPreview
              title={activeSection.title}
              description={activeSection.description}
              items={mediaItems}
              renderItemActions={
                activeTab === 'reels'
                  ? (item) => (
                    <>
                      <button
                        type="button"
                        className="admin-text-btn admin-media-action-btn"
                        onClick={() => openEditReelModal(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-text-btn admin-media-action-btn danger"
                        onClick={() => handleDeleteReel(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )
                  : undefined
              }
              actionNode={
                activeTab === 'reels' ? (
                  <button type="button" className="admin-primary-btn" onClick={openAddReelModal}>
                    Add Reel
                  </button>
                ) : null
              }
            />
          </>
        ) : (
          <AdminJsonEditor
            title={activeSection.title}
            description={activeSection.description}
            value={activeSection.value}
            onSave={activeSection.onSave}
          />
        ))}

      <div className="admin-card admin-content-summary">
        <div className="admin-card-header">
          <div>
            <h2>Quick Summary</h2>
            <p>Snapshot of key content inventories.</p>
          </div>
        </div>
        <div className="admin-summary-grid">
          <div>
            <p className="admin-summary-label">Reels</p>
            <p className="admin-summary-value">{config?.reels?.library?.length || 0}</p>
          </div>
          <div>
            <p className="admin-summary-label">Sounds</p>
            <p className="admin-summary-value">{config?.search?.sounds?.length || 0}</p>
          </div>
          <div>
            <p className="admin-summary-label">Hashtags</p>
            <p className="admin-summary-value">{config?.search?.hashtags?.length || 0}</p>
          </div>
          <div>
            <p className="admin-summary-label">Create Tools</p>
            <p className="admin-summary-value">{config?.createFlow?.sideTools?.length || 0}</p>
          </div>
        </div>
      </div>

      {isAddReelModalOpen ? (
        <div className="admin-modal-overlay" onClick={closeAddReelModal}>
          <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2>Add Reel</h2>
                <p>Fill details to post a reel into the selected section.</p>
              </div>
              <button type="button" className="admin-text-btn" onClick={closeAddReelModal}>
                Close
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <label>
                  Upload Video
                  <button type="button" className="admin-secondary-btn admin-upload-btn" onClick={handleUploadButtonClick}>
                    Upload Video
                  </button>
                  <input
                    ref={uploadInputRef}
                    type="file"
                    accept="video/*"
                    className="admin-hidden-file-input"
                    onChange={handleVideoSelect}
                  />
                  <span className="admin-upload-file-name">
                    {addReelForm.uploadName || 'No file selected'}
                  </span>
                </label>
                <label>
                  Username
                  <input
                    type="text"
                    value={addReelForm.username}
                    onChange={(event) => handleReelFieldChange('username', event.target.value)}
                    placeholder="creator_name"
                  />
                </label>
                <label>
                  Music
                  <input
                    type="text"
                    value={addReelForm.music}
                    onChange={(event) => handleReelFieldChange('music', event.target.value)}
                    placeholder="Original Sound"
                  />
                </label>
                <label>
                  Likes
                  <input
                    type="text"
                    value={addReelForm.likes}
                    onChange={(event) => handleReelFieldChange('likes', event.target.value)}
                  />
                </label>
                <label>
                  Comments
                  <input
                    type="text"
                    value={addReelForm.comments}
                    onChange={(event) => handleReelFieldChange('comments', event.target.value)}
                  />
                </label>
                <label>
                  Shares
                  <input
                    type="text"
                    value={addReelForm.shares}
                    onChange={(event) => handleReelFieldChange('shares', event.target.value)}
                  />
                </label>
                <label>
                  Media Type
                  <select
                    value={addReelForm.mediaType}
                    onChange={(event) => handleReelFieldChange('mediaType', event.target.value)}
                  >
                    <option value="">Auto detect</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </label>
                <label>
                  Section
                  <select
                    value={addReelForm.sectionId}
                    onChange={(event) => handleReelFieldChange('sectionId', event.target.value)}
                  >
                    {reelSections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="admin-form-textarea">
                Caption
                <textarea
                  rows={3}
                  value={addReelForm.caption}
                  onChange={(event) => handleReelFieldChange('caption', event.target.value)}
                  placeholder="Write reel caption"
                />
              </label>

              {addReelError ? <p className="admin-error">{addReelError}</p> : null}
            </div>

            <div className="admin-modal-footer">
              <button type="button" className="admin-secondary-btn" onClick={closeAddReelModal}>
                Cancel
              </button>
              <button type="button" className="admin-primary-btn" onClick={handlePostReel}>
                Post Reel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editingReelId ? (
        <div className="admin-modal-overlay" onClick={closeEditReelModal}>
          <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2>Edit Reel</h2>
                <p>Update reel details without changing other flows.</p>
              </div>
              <button type="button" className="admin-text-btn" onClick={closeEditReelModal}>
                Close
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <label>
                  Replace Video
                  <button
                    type="button"
                    className="admin-secondary-btn admin-upload-btn"
                    onClick={handleEditUploadButtonClick}
                  >
                    Upload Video
                  </button>
                  <input
                    ref={editUploadInputRef}
                    type="file"
                    accept="video/*"
                    className="admin-hidden-file-input"
                    onChange={handleEditVideoSelect}
                  />
                  <span className="admin-upload-file-name">
                    {editReelForm.uploadName || 'Keep existing media'}
                  </span>
                </label>
                <label>
                  Username
                  <input
                    type="text"
                    value={editReelForm.username}
                    onChange={(event) => handleEditFieldChange('username', event.target.value)}
                    placeholder="creator_name"
                  />
                </label>
                <label>
                  Music
                  <input
                    type="text"
                    value={editReelForm.music}
                    onChange={(event) => handleEditFieldChange('music', event.target.value)}
                    placeholder="Original Sound"
                  />
                </label>
                <label>
                  Likes
                  <input
                    type="text"
                    value={editReelForm.likes}
                    onChange={(event) => handleEditFieldChange('likes', event.target.value)}
                  />
                </label>
                <label>
                  Comments
                  <input
                    type="text"
                    value={editReelForm.comments}
                    onChange={(event) => handleEditFieldChange('comments', event.target.value)}
                  />
                </label>
                <label>
                  Shares
                  <input
                    type="text"
                    value={editReelForm.shares}
                    onChange={(event) => handleEditFieldChange('shares', event.target.value)}
                  />
                </label>
                <label>
                  Media Type
                  <select
                    value={editReelForm.mediaType}
                    onChange={(event) => handleEditFieldChange('mediaType', event.target.value)}
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </label>
              </div>

              <label className="admin-form-textarea">
                Caption
                <textarea
                  rows={3}
                  value={editReelForm.caption}
                  onChange={(event) => handleEditFieldChange('caption', event.target.value)}
                  placeholder="Write reel caption"
                />
              </label>

              {editReelError ? <p className="admin-error">{editReelError}</p> : null}
            </div>

            <div className="admin-modal-footer">
              <button type="button" className="admin-secondary-btn" onClick={closeEditReelModal}>
                Cancel
              </button>
              <button type="button" className="admin-primary-btn" onClick={handleUpdateReel}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminContent;
