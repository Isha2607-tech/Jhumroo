import { useMemo } from 'react';
import { useAdminConfig } from '../context/AdminConfigContext';

const ensureArray = (value) => (Array.isArray(value) ? value : []);

export const useAppContent = () => {
  const { config, setConfig } = useAdminConfig();

  const currentUserId = config?.users?.defaultUserId || 'johnny_dance';
  const profiles = config?.users?.profiles || {};
  const reelLibrary = ensureArray(config?.reels?.library);

  const reelMap = useMemo(() => {
    const map = new Map();
    reelLibrary.forEach((reel) => {
      if (reel?.id !== undefined) {
        map.set(reel.id, reel);
      }
    });
    return map;
  }, [reelLibrary]);

  const getProfile = (username) =>
    profiles[username] || profiles[currentUserId] || Object.values(profiles)[0];

  const getReelsByIds = (ids = []) =>
    ensureArray(ids)
      .map((id) => reelMap.get(id))
      .filter(Boolean);

  const getSectionReels = (sectionId) => {
    const sections = ensureArray(config?.reels?.sections);
    const section = sections.find((item) => item.id === sectionId) || sections[0];
    if (!section) {
      return [];
    }
    return getReelsByIds(section.reelIds);
  };

  const isReelSaved = (reelId, username = currentUserId) => {
    const profile = getProfile(username);
    return ensureArray(profile?.savedReelIds).includes(reelId);
  };

  const isReelLiked = (reelId, username = currentUserId) => {
    const profile = getProfile(username);
    return ensureArray(profile?.likedReelIds).includes(reelId);
  };

  const updateProfile = (username, updater) => {
    setConfig((currentConfig) => {
      const nextProfiles = { ...(currentConfig?.users?.profiles || {}) };
      const currentProfile = nextProfiles[username] || {};
      nextProfiles[username] =
        typeof updater === 'function' ? updater(currentProfile) : { ...currentProfile, ...updater };

      return {
        ...currentConfig,
        users: {
          ...currentConfig.users,
          profiles: nextProfiles,
        },
      };
    });
  };

  const toggleSavedReel = (reelId, username = currentUserId) => {
    updateProfile(username, (profile) => {
      const saved = ensureArray(profile?.savedReelIds);
      const has = saved.includes(reelId);
      return {
        ...profile,
        savedReelIds: has ? saved.filter((id) => id !== reelId) : [...saved, reelId],
      };
    });
  };

  const toggleLikedReel = (reelId, username = currentUserId) => {
    updateProfile(username, (profile) => {
      const liked = ensureArray(profile?.likedReelIds);
      const has = liked.includes(reelId);
      return {
        ...profile,
        likedReelIds: has ? liked.filter((id) => id !== reelId) : [...liked, reelId],
      };
    });
  };

  return {
    config,
    currentUserId,
    reelLibrary,
    reelSections: ensureArray(config?.reels?.sections),
    getProfile,
    getReelsByIds,
    getSectionReels,
    isReelSaved,
    isReelLiked,
    toggleSavedReel,
    toggleLikedReel,
  };
};
