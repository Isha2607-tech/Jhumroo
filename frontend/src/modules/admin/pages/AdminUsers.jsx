import React, { useMemo, useState } from 'react';
import { BiCheckCircle, BiEdit } from 'react-icons/bi';
import { useAdminConfig } from '../../../context/AdminConfigContext';

const AdminUsers = () => {
  const { config, setConfig } = useAdminConfig();
  const profiles = useMemo(() => Object.values(config?.users?.profiles || {}), [config]);
  const [activeUser, setActiveUser] = useState(null);
  const [draft, setDraft] = useState(null);

  const openEditor = (profile) => {
    setActiveUser(profile);
    setDraft({ ...profile });
  };

  const closeEditor = () => {
    setActiveUser(null);
    setDraft(null);
  };

  const handleSave = () => {
    if (!draft?.username) {
      return;
    }

    setConfig((currentConfig) => {
      const nextProfiles = { ...(currentConfig?.users?.profiles || {}) };
      nextProfiles[draft.username] = {
        ...nextProfiles[draft.username],
        ...draft,
      };

      return {
        ...currentConfig,
        users: {
          ...currentConfig.users,
          profiles: nextProfiles,
        },
      };
    });

    closeEditor();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage creator profiles, saved reels, and profile stats.</p>
        </div>
        <button type="button" className="admin-secondary-btn">
          Export user list
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table">
          <div className="admin-table-head admin-table-head--users">
            <span>User</span>
            <span>Followers</span>
            <span>Following</span>
            <span>Likes</span>
            <span>Status</span>
            <span></span>
          </div>
          {profiles.map((profile) => (
            <div key={profile.username} className="admin-table-row admin-table-row--users">
              <div className="admin-user-cell">
                <div className="admin-avatar">{profile.fullName?.charAt(0) || 'U'}</div>
                <div>
                  <p className="admin-user-name">{profile.fullName || profile.username}</p>
                  <p className="admin-user-handle">@{profile.username}</p>
                </div>
              </div>
              <span>{profile.followers}</span>
              <span>{profile.following}</span>
              <span>{profile.likes}</span>
              <span className="admin-status">
                <BiCheckCircle size={14} />
                Active
              </span>
              <button type="button" onClick={() => openEditor(profile)} className="admin-icon-btn">
                <BiEdit size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeUser && draft && (
        <div className="admin-modal-overlay" onClick={closeEditor}>
          <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2>Edit user</h2>
                <p>Update profile details and reel preferences.</p>
              </div>
              <button type="button" className="admin-text-btn" onClick={closeEditor}>
                Close
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <label>
                  Full name
                  <input
                    value={draft.fullName || ''}
                    onChange={(event) => setDraft((prev) => ({ ...prev, fullName: event.target.value }))}
                  />
                </label>
                <label>
                  Username
                  <input
                    value={draft.username || ''}
                    onChange={(event) => setDraft((prev) => ({ ...prev, username: event.target.value }))}
                  />
                </label>
                <label>
                  Followers
                  <input
                    value={draft.followers || ''}
                    onChange={(event) => setDraft((prev) => ({ ...prev, followers: event.target.value }))}
                  />
                </label>
                <label>
                  Following
                  <input
                    value={draft.following || ''}
                    onChange={(event) => setDraft((prev) => ({ ...prev, following: event.target.value }))}
                  />
                </label>
                <label>
                  Likes
                  <input
                    value={draft.likes || ''}
                    onChange={(event) => setDraft((prev) => ({ ...prev, likes: event.target.value }))}
                  />
                </label>
              </div>
              <label className="admin-form-textarea">
                Bio
                <textarea
                  rows={3}
                  value={draft.bio || ''}
                  onChange={(event) => setDraft((prev) => ({ ...prev, bio: event.target.value }))}
                />
              </label>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-secondary-btn" onClick={closeEditor}>
                Cancel
              </button>
              <button type="button" className="admin-primary-btn" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
