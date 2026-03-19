import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockVideos, mockFollowingVideos } from '../../../../data/mockData';

const allVideos = [...mockVideos, ...mockFollowingVideos];

const mockUserStats = {
  default: { followers: '673.6K', following: '457' },
  johnny_dance: { followers: '1.5M', following: '124' }
};

const generateUserLists = (username) => {
  // Different lists just to show difference between tabs smoothly
  const followingList = [
    { username: 'johnny_dance', followers: '1.5M' },
    { username: 'tech_guru', followers: '890K' },
    { username: 'music_vibes', followers: '10M' }
  ];
  const followersList = [
    { username: 'nature_lover', followers: '2.5M' },
    { username: 'fire_safety', followers: '50K' },
    { username: 'escape_artist', followers: '120K' },
    { username: 'tech_guru', followers: '890K' }
  ];
  const suggestedList = [
    { username: 'beabadobee', followers: '1.7M' },
    { username: 'layton_williams', followers: '264.9K' },
    { username: 'viral_dancer', followers: '5.2M' },
    ...followingList
  ];
  
  return { following: followingList, followers: followersList, suggested: suggestedList };
};

const UserCard = ({ user }) => {
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate();
  const handleOpenProfile = () => navigate(`/user/${user.username}`);

  return (
    <div
      className="flex items-center px-4 py-3 gap-3 cursor-pointer active:opacity-80"
      onClick={handleOpenProfile}
    >
      <div
        className="w-12 h-12 rounded-full overflow-hidden shrink-0 cursor-pointer active:opacity-70 border border-white/10 p-0.5"
        onClick={handleOpenProfile}
      >
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <p className="text-white font-bold text-[14px] truncate">{user.username}</p>
        <p className="text-white/40 text-[12px] truncate">{user.followers} followers</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFollowing(f => !f);
        }}
        className={`px-5 py-1.5 rounded-md text-[13px] font-bold transition-all active:scale-95 shrink-0 ${
          following
            ? 'border border-white/30 text-white bg-transparent'
            : 'bg-[#FE2C55] text-white'
        }`}
      >
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

const FollowersPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stats = mockUserStats[username] || mockUserStats.default;

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'suggested');
  const [usersObj] = useState(() => generateUserLists(username));
  
  // Use effect to handle back/forward navigation state smoothly
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const tabs = [
    { id: 'following', label: `Following ${stats.following}` },
    { id: 'followers', label: `Followers ${stats.followers}` },
    { id: 'suggested', label: 'Suggested' },
  ];

  const currentUsers = usersObj[activeTab] || [];

  return (
    <div className="page-container theme-surface-page flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
        <button onClick={() => navigate(-1)} className="text-white active:opacity-60 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-[16px] font-bold text-white">{username || 'Profile'}</h2>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 py-3 text-[13px] font-semibold relative transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-white/40'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="theme-tab-indicator absolute bottom-0 left-0 w-full h-[2px] rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {currentUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/40">
            <p className="text-[14px]">No accounts found</p>
          </div>
        ) : (
          <div className="pt-1 pb-10 fade-in-animation">
            {currentUsers.map((user, idx) => (
              <UserCard key={`${user.username}-${idx}`} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
