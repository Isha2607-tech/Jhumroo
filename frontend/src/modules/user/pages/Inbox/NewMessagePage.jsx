import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatThreads, getChatUsers } from '../../../../utils/chatThreads';

const NewMessagePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const chatUsers = getChatUsers();
  const chatThreads = getChatThreads();
  const threadMap = new Map(chatThreads.map((thread) => [thread.username, thread]));

  const prioritizedUsers = [...chatUsers].sort((left, right) => {
    const leftThread = threadMap.get(left.username);
    const rightThread = threadMap.get(right.username);
    const leftUnread = leftThread?.unreadCount || 0;
    const rightUnread = rightThread?.unreadCount || 0;
    const leftHasThread = leftThread ? 1 : 0;
    const rightHasThread = rightThread ? 1 : 0;
    const leftUpdatedAt = leftThread ? new Date(leftThread.updatedAt).getTime() : 0;
    const rightUpdatedAt = rightThread ? new Date(rightThread.updatedAt).getTime() : 0;

    if ((rightUnread > 0 ? 1 : 0) !== (leftUnread > 0 ? 1 : 0)) {
      return (rightUnread > 0 ? 1 : 0) - (leftUnread > 0 ? 1 : 0);
    }

    if (rightUnread !== leftUnread) {
      return rightUnread - leftUnread;
    }

    if (rightHasThread !== leftHasThread) {
      return rightHasThread - leftHasThread;
    }

    if (rightUpdatedAt !== leftUpdatedAt) {
      return rightUpdatedAt - leftUpdatedAt;
    }

    return left.displayName.localeCompare(right.displayName);
  });

  const filteredUsers = prioritizedUsers.filter((user) => {
    const thread = threadMap.get(user.username);
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return (
      user.username.toLowerCase().includes(query) ||
      user.displayName.toLowerCase().includes(query) ||
      thread?.preview?.toLowerCase().includes(query)
    );
  });

  const highlightedUsers = filteredUsers.slice(0, 6);

  return (
    <div className="page-container pb-0 theme-chat-page text-white flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="text-white active:opacity-60 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="text-[20px] font-bold tracking-wide">Messages</h2>
            <p className="text-[11px] text-white/35 uppercase tracking-[0.28em] mt-1">Start New Chat</p>
          </div>
          <div className="w-8" />
        </div>

        <div className="rounded-[18px] bg-white/6 border border-white/10 px-4 py-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search people"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none"
          />
        </div>
      </div>

      <div className="scrollable flex-1 pb-[max(1rem,var(--safe-area-bottom))]">
        <div className="px-4 pt-5">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase text-white/35 mb-3">Quick Chat</p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
            {highlightedUsers.map((user) => (
              (() => {
                const thread = threadMap.get(user.username);
                const unreadCount = thread?.unreadCount || 0;

                return (
                  <button
                    key={user.username}
                    onClick={() => navigate(`/inbox/chat/${user.username}`)}
                    className="flex-none w-[70px] text-center active:opacity-70"
                  >
                    <div className="relative w-[62px] h-[62px] mx-auto rounded-full p-[2px] bg-[linear-gradient(145deg,#ff5578,#4f6bff)]">
                      <div className="w-full h-full rounded-full bg-[#22263B] p-[3px]">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                          alt={user.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>

                      {unreadCount > 0 && (
                        <div
                          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#1F2338] bg-[#FE2C55] text-white"
                        >
                          {unreadCount}
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-white mt-2 truncate">{user.displayName}</p>
                  </button>
                );
              })()
            ))}
          </div>
        </div>

        <div className="px-4 pt-3">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase text-white/35 mb-3">All People</p>
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              (() => {
                const thread = threadMap.get(user.username);
                const unreadCount = thread?.unreadCount || 0;

                return (
                  <button
                    key={user.username}
                    onClick={() => navigate(`/inbox/chat/${user.username}`)}
                    className="w-full rounded-[20px] bg-white/5 border border-white/8 px-3 py-3 flex items-center gap-3 text-left active:bg-white/10 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />

                      {unreadCount > 0 && (
                        <div
                          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#1F2338] bg-[#FE2C55] text-white"
                        >
                          {unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-white truncate">{user.displayName}</p>
                      <p className="text-[12px] text-white/45 truncate">@{user.username}</p>
                      <p className="text-[12px] text-white/35 truncate mt-0.5">
                        {thread?.preview || user.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {unreadCount > 0 && (
                        <div className="min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center bg-[#FE2C55] text-white">
                          {unreadCount}
                        </div>
                      )}

                      <div className="w-8 h-8 rounded-full bg-[#2B314E] border border-white/10 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M22 2 11 13" />
                          <path d="m22 2-7 20-4-9-9-4Z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessagePage;
