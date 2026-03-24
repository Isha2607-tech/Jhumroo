import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  BiCameraMovie,
  BiCheckCircle,
  BiChevronLeft,
  BiHash,
  BiMicrophone,
  BiPlay,
  BiSearch,
  BiSliderAlt,
  BiX,
} from 'react-icons/bi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getDefaultSearchSuggestions,
  getSearchResults,
  getTypingSuggestions,
  normalizeSearchQuery,
  SEARCH_TABS,
  SEARCH_TOP_FILTERS,
} from '../../../../data/searchMockData';
import { useTheme } from '../../../../context/ThemeContext';

const SEARCH_HISTORY_KEY = 'searchHistory';

const readSearchHistory = () => {
  try {
    const storedValue = localStorage.getItem(SEARCH_HISTORY_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const persistSearchHistory = (query) => {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) {
    return;
  }

  const nextHistory = [
    normalizedQuery,
    ...readSearchHistory().filter((item) => item.toLowerCase() !== normalizedQuery.toLowerCase()),
  ].slice(0, 8);

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
};

const removeSearchHistoryEntry = (query) => {
  const loweredQuery = query.toLowerCase();
  const nextHistory = readSearchHistory().filter((item) => item.toLowerCase() !== loweredQuery);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
};

const buildSearchParams = ({ query = '', tab = '', view = '' }) => {
  const nextParams = new URLSearchParams();
  const normalizedQuery = normalizeSearchQuery(query);

  if (normalizedQuery) {
    nextParams.set('q', normalizedQuery);
  }

  if (tab) {
    nextParams.set('tab', tab);
  }

  if (view && tab === 'top') {
    nextParams.set('view', view);
  }

  return nextParams;
};

const filterTopVideos = (videos, activeView) => {
  if (activeView === 'unwatched') {
    return videos.filter((video) => video.watchState === 'unwatched');
  }

  if (activeView === 'watched') {
    return videos.filter((video) => video.watchState === 'watched');
  }

  if (activeView === 'recent') {
    return videos.filter((video) => video.uploadState === 'recent');
  }

  return videos;
};

const SearchSuggestionIcon = ({ kind }) => {
  if (kind === 'recent') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return <BiSearch size={18} />;
};

const SearchTrailingIcon = ({ kind }) => {
  if (kind === 'recent') {
    return <BiX size={16} />;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M17 7 7 17" />
    </svg>
  );
};

const ResultsEmptyState = ({ title, subtitle }) => (
  <div className="px-5 py-16 text-center">
    <p className="theme-text-primary text-[15px] font-semibold">{title}</p>
    <p className="theme-text-muted text-[12px] mt-2">{subtitle}</p>
  </div>
);

const VideoGrid = ({ videos, onOpenVideo }) => {
  if (videos.length === 0) {
    return (
      <ResultsEmptyState
        title="No videos found"
        subtitle="Try another category or search keyword."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3 px-2 pb-24 pt-3">
      {videos.map((video) => (
        <button
          key={video.id}
          type="button"
          onClick={() => onOpenVideo(video.id)}
          className="text-left active:opacity-85"
        >
          <div className="relative overflow-hidden rounded-[4px] bg-white/5">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-[0.78] object-cover"
            />
            <span className="absolute bottom-1 left-1 text-[10px] font-medium text-white drop-shadow-md">
              {video.date}
            </span>
          </div>
          <div className="px-0.5 pt-1.5">
            <p
              className="theme-text-primary text-[12px] font-semibold leading-[1.2]"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
              }}
            >
              {video.title}
            </p>
            <div className="mt-1 flex items-center gap-1.5 theme-text-muted text-[11px]">
              <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 bg-white/5">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`}
                  alt={video.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate">{video.username}</span>
              <span className="shrink-0">{video.views}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const UsersResultList = ({ users, followedUsers, onToggleFollow, onOpenUser, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fe2c55] animate-bounce [animation-delay:-0.12s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#25f4ee] animate-bounce [animation-delay:0s]" />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <ResultsEmptyState
        title="No users found"
        subtitle="Try a different search term."
      />
    );
  }

  return (
    <div className="pb-24">
      {users.map((user) => {
        const isFollowing = Boolean(followedUsers[user.username]);

        return (
          <div
            key={user.id}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-white/5 transition-colors"
            onClick={() => onOpenUser(user.username)}
          >
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="theme-text-primary text-[14px] font-semibold truncate">{user.username}</p>
              <p className="theme-text-muted text-[12px] truncate">
                {user.displayName}
              </p>
              <p className="theme-text-muted text-[12px] truncate">
                {user.followers} followers · {user.videos} videos
              </p>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleFollow(user.username);
              }}
              className={`min-w-[76px] rounded-[3px] px-4 py-2 text-[13px] font-semibold transition-colors ${
                isFollowing
                  ? 'bg-white/5 text-white/70 border border-white/10'
                  : 'bg-[#fe2c55] text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

const SoundsResultList = ({ sounds, onOpenSound }) => {
  if (sounds.length === 0) {
    return (
      <ResultsEmptyState
        title="No sounds found"
        subtitle="Try another sound name or creator."
      />
    );
  }

  return (
    <div className="pb-24 px-4 pt-3 space-y-4">
      {sounds.map((sound) => (
        <button
          key={sound.id}
          type="button"
          onClick={() => onOpenSound(sound.musicName)}
          className="w-full flex items-center gap-3 text-left active:opacity-85"
        >
          <div className="relative w-[58px] h-[58px] rounded-[4px] overflow-hidden shrink-0">
            <img src={sound.cover} alt={sound.musicName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white/85 flex items-center justify-center">
                <BiPlay size={14} className="text-black ml-0.5" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="theme-text-primary text-[15px] font-semibold truncate">{sound.musicName}</p>
            <p className="theme-text-muted text-[13px] truncate">{sound.creator}</p>
            <p className="theme-text-muted text-[13px] truncate">
              {sound.duration} · {sound.videoCount}
            </p>
            {sound.badge && (
              <p className="text-[12px] text-white/55 mt-1">
                {sound.badge}
                {sound.badge === 'Popular' && <span className="ml-1 text-[#fe2c55]">Popular</span>}
              </p>
            )}
          </div>
          <div className="w-12 h-8 rounded-[4px] bg-[#fe2c55] text-white flex items-center justify-center shrink-0">
            <BiCameraMovie size={18} />
          </div>
        </button>
      ))}
    </div>
  );
};

const ShopResultGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <ResultsEmptyState
        title="No products found"
        subtitle="Shop results are mocked only for this frontend flow."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-3 pb-24 pt-3">
      {items.map((item) => (
        <div key={item.id} className="theme-panel-card rounded-[12px] overflow-hidden shadow-sm border border-white/10">
          <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
          <div className="p-3">
            <p className="theme-text-primary text-[13px] font-semibold leading-[1.2] min-h-[32px]">
              {item.title}
            </p>
            <p className="theme-text-primary text-[15px] font-bold mt-2">{item.price}</p>
            <p className="theme-text-muted text-[11px] mt-1">{item.shopName}</p>
            <div className="mt-2 inline-flex rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/55">
              {item.meta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LiveResultGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <ResultsEmptyState
        title="No live matches found"
        subtitle="Try another keyword to browse more live results."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 px-2 pb-24 pt-3">
      {items.map((item) => (
        <div key={item.id} className="active:opacity-90">
          <div className="relative overflow-hidden rounded-[4px]">
            <img src={item.image} alt={item.title} className="w-full aspect-[0.78] object-cover" />
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="bg-[#fe2c55] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                LIVE
              </span>
              <span className="bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-sm">
                {item.viewers}
              </span>
            </div>
          </div>
          <p className="theme-text-primary text-[12px] font-semibold leading-[1.2] mt-2">
            {item.title}
          </p>
          <div className="mt-1 flex items-center gap-1.5 theme-text-muted text-[11px]">
            <div className="w-4 h-4 rounded-full overflow-hidden bg-white/5">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.host}`}
                alt={item.host}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="truncate">{item.host}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const HashtagResultList = ({ hashtags, onOpenHashtag }) => {
  if (hashtags.length === 0) {
    return (
      <ResultsEmptyState
        title="No hashtags found"
        subtitle="Try another hashtag or keyword."
      />
    );
  }

  return (
    <div className="pb-24 pt-2">
      {hashtags.map((hashtag) => (
        <button
          key={hashtag.id}
          type="button"
          onClick={() => onOpenHashtag(hashtag.slug)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-white/5 transition-colors"
        >
          <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/80 bg-white/5 shrink-0">
            <BiHash size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="theme-text-primary text-[15px] font-semibold truncate">{hashtag.label}</p>
          </div>
          <span className="theme-text-muted text-[14px] shrink-0">{hashtag.views}</span>
        </button>
      ))}
    </div>
  );
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchHistory, setSearchHistory] = useState(() => readSearchHistory());
  const [followedUsers, setFollowedUsers] = useState({});
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const usersLoaderTimeoutRef = useRef(null);
  const searchQuery = searchParams.get('q') || '';
  const activeTab = searchParams.get('tab') || '';
  const activeView = searchParams.get('view') || 'all';
  const deferredQuery = useDeferredValue(searchQuery);
  const normalizedQuery = normalizeSearchQuery(searchQuery);
  const isResultsState = normalizedQuery.length > 0 && Boolean(activeTab);
  const isTypingState = normalizedQuery.length > 0 && !activeTab;
  const defaultSuggestions = useMemo(() => getDefaultSearchSuggestions(), []);
  const typingSuggestions = useMemo(
    () => getTypingSuggestions(deferredQuery, searchHistory),
    [deferredQuery, searchHistory],
  );
  const searchResults = useMemo(() => getSearchResults(deferredQuery), [deferredQuery]);
  const topVideos = useMemo(
    () => filterTopVideos(searchResults.videos, activeView),
    [searchResults.videos, activeView],
  );

  const clearUsersLoader = () => {
    if (usersLoaderTimeoutRef.current) {
      window.clearTimeout(usersLoaderTimeoutRef.current);
      usersLoaderTimeoutRef.current = null;
    }
  };

  useEffect(() => () => clearUsersLoader(), []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  const handleDraftChange = (nextValue) => {
    clearUsersLoader();
    setIsUsersLoading(false);

    const trimmedValue = nextValue.trim();
    if (!trimmedValue) {
      setSearchParams(new URLSearchParams(), { replace: true });
      return;
    }

    setSearchParams(buildSearchParams({ query: nextValue }), { replace: true });
  };

  const handleSubmitSearch = (nextValue = searchQuery, nextTab = activeTab || 'top') => {
    const normalizedValue = normalizeSearchQuery(nextValue);
    if (!normalizedValue) {
      return;
    }

    persistSearchHistory(normalizedValue);
    setSearchHistory(readSearchHistory());
    clearUsersLoader();
    setIsUsersLoading(false);
    setSearchParams(
      buildSearchParams({
        query: normalizedValue,
        tab: nextTab,
        view: nextTab === 'top' ? activeView || 'all' : '',
      }),
    );
  };

  const handleClearSearch = () => {
    clearUsersLoader();
    setIsUsersLoading(false);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleTabChange = (tabId) => {
    const normalizedValue = normalizeSearchQuery(searchQuery);
    if (!normalizedValue) {
      return;
    }

    clearUsersLoader();
    if (tabId === 'users') {
      setIsUsersLoading(true);
      usersLoaderTimeoutRef.current = window.setTimeout(() => {
        setIsUsersLoading(false);
        usersLoaderTimeoutRef.current = null;
      }, 650);
    } else {
      setIsUsersLoading(false);
    }

    setSearchParams(
      buildSearchParams({
        query: normalizedValue,
        tab: tabId,
        view: tabId === 'top' ? activeView || 'all' : '',
      }),
      { replace: true },
    );
  };

  const handleViewFilterChange = (viewId) => {
    const normalizedValue = normalizeSearchQuery(searchQuery);
    if (!normalizedValue) {
      return;
    }

    setSearchParams(
      buildSearchParams({
        query: normalizedValue,
        tab: 'top',
        view: viewId,
      }),
      { replace: true },
    );
  };

  const handleRemoveHistorySuggestion = (label) => {
    removeSearchHistoryEntry(label);
    setSearchHistory(readSearchHistory());
  };

  const handleOpenVideo = (selectedVideoId) => {
    const currentVideos = activeTab === 'top' ? topVideos : searchResults.videos;

    navigate('/', {
      state: {
        searchVideos: currentVideos,
        activeVideoId: selectedVideoId,
      },
    });
  };

  const handleToggleFollow = (username) => {
    setFollowedUsers((currentUsers) => ({
      ...currentUsers,
      [username]: !currentUsers[username],
    }));
  };

  const handleOpenHashtag = (slug) => {
    const currentQuery = searchParams.toString();
    navigate(`/search/hashtag/${slug}${currentQuery ? `?${currentQuery}` : ''}`);
  };

  return (
    <div className="page-container theme-surface-page flex flex-col overflow-hidden">
      <div className="theme-page-header flex items-center gap-3 px-4 pt-[max(0.75rem,var(--safe-area-top))] pb-3 shrink-0">
        <button
          type="button"
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center theme-text-primary active:opacity-60 shrink-0"
        >
          <BiChevronLeft size={22} />
        </button>

        <div className="theme-input-shell flex-1 min-w-0 rounded-[6px] flex items-center gap-2 px-3 py-2">
          <BiSearch size={18} className="theme-text-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => handleDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmitSearch(event.currentTarget.value);
              }
            }}
            placeholder="Search"
            className="flex-1 min-w-0 bg-transparent text-[15px] outline-none"
          />
          {normalizedQuery ? (
            <button
              type="button"
              onClick={handleClearSearch}
              className="theme-text-muted shrink-0 active:opacity-60"
              aria-label="Clear search"
            >
              <BiX size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="theme-text-muted shrink-0 active:opacity-60"
              aria-label="Microphone"
            >
              <BiMicrophone size={18} />
            </button>
          )}
        </div>

        {isResultsState ? (
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center theme-text-primary active:opacity-60 shrink-0"
            aria-label="Filter search"
          >
            <BiSliderAlt size={21} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSubmitSearch(searchQuery)}
            disabled={!normalizedQuery}
            className={`text-[15px] font-semibold shrink-0 ${
              normalizedQuery ? 'text-[#fe2c55]' : 'text-[#fe2c55]/40'
            }`}
          >
            Search
          </button>
        )}
      </div>

      <div className="scrollable flex-1">
        {!isResultsState && (
          <div className="px-4 pt-3 pb-24">
            {!isTypingState ? (
              <>
                <h2 className="theme-text-primary text-[15px] font-bold mb-4">You may like</h2>
                <div className="space-y-4">
                  {defaultSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSubmitSearch(suggestion.label)}
                      className="w-full flex items-center gap-3 text-left active:opacity-75"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: suggestion.accent }}
                      />
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <span className="theme-text-primary text-[15px] leading-tight">
                          {suggestion.label}
                        </span>
                        {suggestion.meta && (
                          <span className="text-[#fe2c55] text-[14px]">· {suggestion.meta}</span>
                        )}
                        {suggestion.badge === 'hot' && <span className="text-[#fe2c55]">🔥</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-1">
                {typingSuggestions.map((suggestion) => (
                  <div
                    key={`${suggestion.kind}-${suggestion.label}`}
                    className="w-full flex items-center gap-3 px-1 py-3 text-left active:bg-white/5 rounded-[8px] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => handleSubmitSearch(suggestion.label)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left active:opacity-75"
                    >
                      <span className="theme-text-muted shrink-0">
                        <SearchSuggestionIcon kind={suggestion.kind} />
                      </span>
                      <span className="theme-text-primary text-[15px] min-w-0 truncate">
                        {suggestion.label}
                      </span>
                      {suggestion.verified && <BiCheckCircle size={15} className="text-[#20a4ff] shrink-0" />}
                      {suggestion.accessory === 'cherries' && <span className="text-[18px]">🍒</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (suggestion.kind === 'recent') {
                          handleRemoveHistorySuggestion(suggestion.label);
                          return;
                        }

                        handleSubmitSearch(suggestion.label);
                      }}
                      className="theme-text-muted shrink-0 active:opacity-60"
                    >
                      <SearchTrailingIcon kind={suggestion.kind} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isResultsState && (
          <>
            <div className="sticky top-0 z-10 theme-surface-page">
              <div className="flex items-center gap-5 px-4 pt-1 overflow-x-auto no-scrollbar border-b border-white/10">
                {SEARCH_TABS.map((tab) => {
                  const isActive = tab.id === activeTab;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={`relative py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                        isActive ? 'theme-text-primary' : 'text-white/35'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <span className="absolute left-0 right-0 bottom-0 h-[2px] theme-tab-indicator rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'top' && (
                <div className="flex items-center gap-2 px-3 py-3 overflow-x-auto no-scrollbar border-b border-white/10">
                  {SEARCH_TOP_FILTERS.map((filterItem) => {
                    const isActive = filterItem.id === activeView;

                    return (
                      <button
                        key={filterItem.id}
                        type="button"
                        onClick={() => handleViewFilterChange(filterItem.id)}
                        className={`px-3 py-1.5 rounded-[4px] text-[11px] font-medium whitespace-nowrap border transition-colors ${
                          isActive
                            ? isDarkMode
                              ? 'bg-black text-white border-black'
                              : 'shadow-sm'
                            : 'bg-white/5 text-white/45 border-white/10'
                        }`}
                        style={
                          isActive && !isDarkMode
                            ? {
                                backgroundColor: '#111827',
                                borderColor: '#111827',
                                color: '#ffffff',
                              }
                            : undefined
                        }
                      >
                        {filterItem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {activeTab === 'top' && (
              <VideoGrid videos={topVideos} onOpenVideo={handleOpenVideo} />
            )}

            {activeTab === 'videos' && (
              <VideoGrid videos={searchResults.videos} onOpenVideo={handleOpenVideo} />
            )}

            {activeTab === 'users' && (
              <UsersResultList
                users={searchResults.users}
                followedUsers={followedUsers}
                onToggleFollow={handleToggleFollow}
                onOpenUser={(username) => navigate(`/user/${username}`)}
                isLoading={isUsersLoading}
              />
            )}

            {activeTab === 'sounds' && (
              <SoundsResultList
                sounds={searchResults.sounds}
                onOpenSound={(musicName) => navigate(`/sound/${encodeURIComponent(musicName)}`)}
              />
            )}

            {activeTab === 'shop' && <ShopResultGrid items={searchResults.shop} />}

            {activeTab === 'live' && <LiveResultGrid items={searchResults.live} />}

            {activeTab === 'hashtags' && (
              <HashtagResultList hashtags={searchResults.hashtags} onOpenHashtag={handleOpenHashtag} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
