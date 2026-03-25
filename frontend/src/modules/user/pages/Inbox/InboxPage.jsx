import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useAppContent } from '../../../../hooks/useAppContent';

const InboxPage = () => {
  const navigate = useNavigate();
  const { config } = useAppContent();
  const [suggestedFriends, setSuggestedFriends] = useState(config?.inbox?.suggestedFriends || []);
  const activityGroups = config?.inbox?.activityGroups || [];

  const dismissFriend = (id) => {
    setSuggestedFriends(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="page-container theme-surface-page flex flex-col overflow-hidden text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <div className="w-8" />
        <div className="flex items-center gap-1">
          <h2 className="text-[16px] font-bold text-white">Inbox</h2>
          <div className="w-2 h-2 bg-[#FE2C55] rounded-full" />
        </div>
        <button className="text-white active:opacity-60" onClick={() => navigate('/inbox/new-message')}>
          <BiMessageSquareDetail size={22} />
        </button>
      </div>

      <div className="scrollable flex-1 space-y-6 pt-4">
        {/* Widget Section */}
        <div className="px-4">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer active:bg-white/20">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-white/40 rounded-sm" />
              <div className="w-2.5 h-4 bg-white/40 rounded-sm" />
              <div className="w-2.5 h-4 bg-white/40 rounded-sm" />
              <div className="w-2 h-2 bg-white/40 rounded-sm" />
            </div>
            <span className="text-[11px] font-semibold text-white/60">+ Widget</span>
          </div>
        </div>

        {/* Activities Section */}
        <div className="px-4">
           <div 
            className="flex items-center justify-between mb-2 cursor-pointer active:opacity-70"
            onClick={() => navigate('/inbox/activity')}
           >
              <h3 className="text-[15px] font-bold text-white">Activities</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
           </div>
           
           <div className="space-y-4">
              {activityGroups.slice(0, 1).flatMap((group) => group.items.slice(0, 2)).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden ring-1 ring-white/10">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-white">
                      <span className="font-bold">{item.user}</span> {item.action} <span className="text-white/40">{item.time}</span>
                    </p>
                    {item.type === 'view' && (
                      <div className="flex gap-2 mt-2">
                        <button className="px-4 py-1.5 border border-white/35 text-white text-[12px] font-bold rounded-sm bg-transparent">Ignore</button>
                        <button className="px-4 py-1.5 bg-[#FE2C55] text-white text-[12px] font-bold rounded-sm">Follow back</button>
                      </div>
                    )}
                  </div>
                  <div className={`w-10 h-14 ${item.type === 'view' ? 'bg-white/10' : 'bg-white/5'} rounded shrink-0`} />
                </div>
              ))}
           </div>
        </div>

        {/* Inbox Updates */}
        <div className="px-4">
          <div className="space-y-4">
             {/* New Followers */}
             <div 
              className="flex items-center gap-3 cursor-pointer active:opacity-75"
              onClick={() => navigate('/inbox/new-followers')}
             >
                <div className="w-12 h-12 rounded-full bg-[#00B2FF] flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 8 16 8c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 8 8 8c-1.66 0-3 1.34-3 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-white">New followers</p>
                  <p className="text-[12px] text-white/50 truncate">Jenzp85 started following you</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="white" opacity="0.4" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
             </div>

             {/* System Notifications */}
             <div className="flex items-center gap-3 cursor-pointer active:opacity-75">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#FE2C55] rounded-full border-2 border-black" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-[14px] font-bold text-white">System Notifications</p>
                    <span className="text-[11px] text-white/40">11:24 AM</span>
                  </div>
                  <p className="text-[12px] text-white/50 truncate">Account updates: Your account logged...</p>
                </div>
             </div>
          </div>
        </div>

        {/* Find Friends Section */}
        <div className="px-4 pb-20">
          <div className="flex items-center gap-1 mb-4">
            <h3 className="text-[13px] font-semibold text-white/40">Find friends</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          
          <div className="space-y-4">
            {suggestedFriends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-white truncate">{friend.username}</p>
                  <p className="text-[12px] text-white/40 truncate">{friend.sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-1.5 bg-[#FE2C55] text-white text-[13px] font-bold rounded-sm active:brightness-90">Follow</button>
                  <button 
                    className="text-white/30 active:opacity-60"
                    onClick={() => dismissFriend(friend.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
