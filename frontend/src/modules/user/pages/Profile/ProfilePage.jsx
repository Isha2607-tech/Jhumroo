import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiMenu, BiUserPlus, BiBookmark, BiLockAlt, BiHeart, BiArrowBack, BiBell } from 'react-icons/bi';
import { BsGrid3X3 } from 'react-icons/bs';
import { mockVideos, mockFollowingVideos } from '../../../../data/mockData';
import { getLikedVideoIds } from '../../../../utils/likedVideos';

const allVideos = [...mockVideos, ...mockFollowingVideos];

const mockProfileData = {
  johnny_dance: {
    fullName: 'Johnny Dance',
    followers: '1.5M',
    following: '124',
    likes: '12.8M',
    bio: 'Dancing through life! 🕺✨\nFor business inquiries: DM',
    playlists: ['Dance Moves', 'Vlogs', 'Tutorials'],
  },
  default: {
    fullName: 'Jhumroo User',
    followers: '673.6K',
    following: '457',
    likes: '17.5M',
    bio: 'welcome!\n22\ncollab: isyottlanxse@gmail.com\n🔗 hoo.be/isabellaluaren\n🤍 Supporting: Be The Match  🍵 Tips',
    playlists: ['fall outfits', 'PODCAST', 'amazon storefro'],
  },
};

const generateRandomSuggestions = () => {
  const suggestions = [
    { id: 1, type: 'user', username: 'layton_wi', name: 'Layton Williams', verified: true, subtitle: '264.9K followers' },
    { id: 2, type: 'platform', platform: 'Facebook', name: 'Facebook friends', subtitle: 'Find friends', actionText: 'Find', color: 'bg-[#1877F2]' },
    { id: 3, type: 'user', username: 'charlidame', name: "charli d'amelio", verified: true, subtitle: '150.2M followers' },
    { id: 4, type: 'platform', platform: 'Contacts', name: 'Contacts', subtitle: 'Find friends', actionText: 'Find', color: 'bg-[#FE2C55]' },
    { id: 5, type: 'user', username: 'khaby.lem', name: 'Khabane lame', verified: true, subtitle: '161.4M followers' },
    { id: 6, type: 'user', username: 'bellapoar', name: 'Bella Poarch', verified: true, subtitle: '93M followers' },
    { id: 7, type: 'user', username: 'willsmith', name: 'Will Smith', verified: true, subtitle: '74.2M followers' },
  ];
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 6); 
};

const VideoGrid = ({ videos }) => {
  if (!videos.length) {
    return (
      <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-3 text-center px-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0 0 10 10v4a1 1 0 0 0 1.555.832l3.197-2.132a1 1 0 0 0 0-1.664z"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
        <p className="text-white/30 text-sm">No videos yet</p>
      </div>
    );
  }
  return (
    <>
      {videos.map((video, idx) => (
        <div key={idx} className="relative aspect-[3/4] bg-divider/20 overflow-hidden group">
          <video src={video.url} poster={video.poster} loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white text-[9px] font-bold drop-shadow-md theme-on-media">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
              <path d="M5 3l14 9-14 9z" />
            </svg>
            <span>{video.likes}</span>
          </div>
        </div>
      ))}
    </>
  );
};

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const isOwnProfile = !username || username === 'johnny_dance';
  const displayUsername = isOwnProfile ? 'johnny_dance' : username;
  
  const [activeTab, setActiveTab] = useState('videos');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Suggested accounts logic
  const [showSuggested, setShowSuggested] = useState(false);
  const [randomSuggestions, setRandomSuggestions] = useState([]);

  const handleToggleSuggested = () => {
    if (!showSuggested && randomSuggestions.length === 0) {
      setRandomSuggestions(generateRandomSuggestions());
    }
    setShowSuggested(!showSuggested);
  };

  const handleSuggestedAccountClick = (account) => {
    if (account.type === 'user') {
      navigate(`/user/${account.username}`);
    }
  };

  const profile = mockProfileData[displayUsername] || mockProfileData.default;
  const userVideos = allVideos.filter(v => v.username === displayUsername);
  const visibleSuggestions = randomSuggestions.filter(
    (account) => account.type !== 'user' || account.username !== displayUsername
  );
  
  const savedIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  const savedVideos = mockVideos.filter(v => savedIds.includes(v.id));
  const likedIds = getLikedVideoIds(allVideos);
  const likedVideos = allVideos.filter(v => likedIds.includes(v.id));
  const handleOpenChat = () => navigate(`/inbox/chat/${displayUsername}`);

  return (
    <div className="page-container theme-surface-page flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 shrink-0">
        {isOwnProfile ? (
          <>
            <BiUserPlus size={24} className="text-white cursor-pointer active:opacity-70" />
            <h2 className="text-[16px] font-bold text-white tracking-wide flex items-center gap-1">@{displayUsername} <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></h2>
            <BiMenu size={28} className="text-white cursor-pointer active:opacity-70" onClick={() => navigate('/settings')} />
          </>
        ) : (
          <>
            <button onClick={() => navigate(-1)} className="text-white active:opacity-60">
              <BiArrowBack size={24} />
            </button>
            <h2 className="text-[16px] font-bold text-white">{displayUsername}</h2>
            <div className="flex items-center gap-3">
              <BiBell size={24} className="text-white cursor-pointer active:opacity-70" />
              <BiMenu size={24} className="text-white cursor-pointer active:opacity-70" />
            </div>
          </>
        )}
      </div>

      <div className="scrollable flex-1 pb-4">
        {/* User Info Section */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
          <div className="relative w-[100px] h-[100px] rounded-full p-1 mb-3">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayUsername}`} alt="avatar" className="w-full h-full rounded-full object-cover bg-white/10" />
            {isOwnProfile && (
                <div className="absolute right-0 bottom-0 w-6 h-6 bg-[#20D5EC] rounded-full border-2 border-black flex items-center justify-center text-white cursor-pointer shadow-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"/></svg>
                </div>
            )}
          </div>
          <p className="text-[15px] font-bold text-white mb-4">@{displayUsername}</p>
          
          {/* Stats */}
          <div className="flex gap-10 mb-5">
            {[
              { label: 'Following', value: profile.following, tabId: 'following' },
              { label: 'Followers', value: profile.followers, tabId: 'followers' },
              { label: 'Likes', value: profile.likes },
            ].map(stat => (
              <div 
                key={stat.label} 
                className="flex flex-col items-center cursor-pointer active:opacity-70"
                onClick={() => {
                  if (stat.tabId) {
                    navigate(`/user/${displayUsername}/followers`, { state: { activeTab: stat.tabId } });
                  }
                }}
              >
                <strong className="text-[17px] font-bold text-white">{stat.value}</strong>
                <span className="text-[12px] text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 w-full max-w-[320px] mb-4">
            {isOwnProfile ? (
              <>
                <button 
                  onClick={() => navigate('/settings/edit-profile')}
                  className="flex-1 py-3 h-[42px] bg-white/10 text-white text-[14px] font-semibold flex items-center justify-center rounded-[4px] active:bg-white/20 transition-colors border border-white/5"
                >
                   Edit profile
                </button>
                <button 
                  onClick={handleToggleSuggested}
                  className="w-11 h-[42px] bg-white/10 rounded-[4px] flex items-center justify-center text-white active:bg-white/20 transition-colors border border-white/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    className={`transition-transform duration-200 ${showSuggested ? 'rotate-180' : ''}`}
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex-1 h-[42px] rounded-[4px] text-[15px] font-bold transition-all active:scale-95 ${
                    isFollowing ? 'border border-white/20 text-white bg-transparent' : 'bg-[#FE2C55] text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  onClick={handleOpenChat}
                  className="w-11 h-[42px] border border-white/30 rounded-[4px] flex items-center justify-center text-white active:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4Z" />
                  </svg>
                </button>
                <button
                  onClick={handleToggleSuggested}
                  className="w-11 h-[42px] border border-white/30 rounded-[4px] flex items-center justify-center text-white active:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    className={`transition-transform duration-200 ${showSuggested ? 'rotate-180' : ''}`}
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Bio */}
          <p className="text-[13px] text-white/80 text-center leading-relaxed whitespace-pre-line px-4">
            {profile.bio}
          </p>
        </div>

        {/* Random Suggested Accounts Section */}
        {showSuggested && visibleSuggestions.length > 0 && (
          <div className="px-4 pb-4 animate-fade-in-down">
            <div className="flex items-center justify-between mb-3 text-white">
              <div className="flex items-center gap-1.5 opacity-60">
                 <span className="text-[13px] font-semibold">Suggested accounts</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <span className="text-[13px] font-semibold opacity-60 active:opacity-100 cursor-pointer" onClick={() => navigate(`/user/${displayUsername}/followers`, { state: { activeTab: 'suggested' } })}>View all <span className="text-[10px]">&gt;</span></span>
            </div>
            
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x pb-2">
              {visibleSuggestions.map(account => (
                <div
                  key={account.id}
                  className={`snap-start flex-none w-[130px] bg-white/5 rounded-md p-3 pb-4 flex flex-col items-center relative border border-white/5 shadow-sm h-[190px] justify-between ${account.type === 'user' ? 'cursor-pointer active:opacity-90' : ''}`}
                  onClick={() => handleSuggestedAccountClick(account)}
                >
                  <button className="absolute top-2.5 right-2.5 text-white/30 active:opacity-100 z-10 p-1" onClick={(e) => { e.stopPropagation(); setRandomSuggestions(prev => prev.filter(c => c.id !== account.id)) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                  
                  {account.type === 'platform' ? (
                     <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-1 mt-1 shrink-0 ${account.color}`}>
                        {account.platform === 'Facebook' ? (
                           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/></svg>
                        )}
                     </div>
                  ) : (
                     <div className="w-[72px] h-[72px] rounded-full overflow-hidden mb-1 mt-1 shrink-0 bg-white/10">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account.username}`} alt="" className="w-full h-full object-cover" />
                     </div>
                  )}
                  
                  <div className="w-full flex flex-col items-center mt-1 flex-1">
                      <div className="flex items-center justify-center w-full">
                         <p className="text-white text-[13px] font-bold text-center truncate pr-[2px]">{account.name}</p>
                         {account.verified && (
                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#20D5EC"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                         )}
                      </div>
                      <p className="text-white/50 text-[11px] font-medium truncate w-full text-center mt-0.5">{account.subtitle}</p>
                  </div>
                  
                  <button 
                    className="w-full py-[7px] mt-2 bg-[#FE2C55] text-white text-[13px] font-bold rounded-[4px] active:brightness-90 shadow-sm shrink-0"
                    onClick={() => handleSuggestedAccountClick(account)}
                  >
                    {account.actionText || 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playlist chips */}
        {profile.playlists && (
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
            {profile.playlists.map((p, i) => (
              <div key={i} className="flex-none flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 text-white text-[12px] font-medium whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.6"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/></svg>
                {p}
              </div>
            ))}
          </div>
        )}

        {/* Profile Tabs */}
        <div className="flex border-t border-white/5 pt-1">
          {[
            { id: 'videos', icon: <BsGrid3X3 size={20} /> },
            { id: 'private', icon: <BiLockAlt size={20} /> },
            ...(isOwnProfile ? [{ id: 'saves', icon: <BiBookmark size={20} /> }] : []),
            { id: 'likes', icon: <BiHeart size={20} /> }
          ].map(tab => (
            <div 
              key={tab.id}
              className={`flex-1 flex justify-center py-3 relative cursor-pointer ${
                activeTab === tab.id ? 'text-white' : 'text-white/30'
              }`} 
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {activeTab === tab.id && (
                <div className="theme-tab-indicator absolute bottom-0 left-0 w-full h-[2px]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-3 gap-[1px]">
          {activeTab === 'videos' && <VideoGrid videos={[...userVideos, ...userVideos]} />}
          
          {activeTab === 'saves' && isOwnProfile && (
            savedVideos.length > 0 ? (
              <VideoGrid videos={savedVideos} />
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-3 text-white/30">
                <BiBookmark size={48} opacity={0.5} />
                <p className="text-sm">No saved videos yet</p>
              </div>
            )
          )}

          {activeTab === 'likes' && isOwnProfile && (
            likedVideos.length > 0 ? (
              <VideoGrid videos={likedVideos} />
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-3 text-white/30">
                <BiHeart size={48} opacity={0.5} />
                <p className="text-sm">No liked videos yet</p>
              </div>
            )
          )}

          {/* Locked / Empty states */}
          {(activeTab === 'private' || (!isOwnProfile && (activeTab === 'likes' || activeTab === 'saves'))) && (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-2 text-white/30">
              <BiLockAlt size={40} opacity={0.5} />
              <p className="text-sm">{isOwnProfile ? 'This section is empty' : `This user's content is private`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
