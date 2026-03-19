import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formatBubbleTimestamp,
  getChatThread,
  markChatThreadRead,
  sendChatMessage,
} from '../../../../utils/chatThreads';

const ChatPage = () => {
  const navigate = useNavigate();
  const { username = '' } = useParams();
  const [thread, setThread] = useState(() => getChatThread(username));
  const [draft, setDraft] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const bottomRef = useRef(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/inbox');
  };

  useEffect(() => {
    setThread(markChatThreadRead(username));
    setDraft('');
    setIsAttachmentMenuOpen(false);
  }, [username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread.messages.length]);

  const handleSend = () => {
    if (!draft.trim()) {
      return;
    }

    const updatedThread = sendChatMessage(username, draft);
    setThread(updatedThread);
    setDraft('');
  };

  const attachmentOptions = [
    {
      key: 'gallery',
      label: 'Gallery',
      hint: 'Open photos',
      onClick: () => {
        setIsAttachmentMenuOpen(false);
        navigate(`/inbox/chat/${username}/gallery`);
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="9" cy="9" r="1.6" />
          <path d="m21 15-4.5-4.5L7 20" />
        </svg>
      ),
    },
    {
      key: 'camera',
      label: 'Camera',
      hint: 'Open camera',
      onClick: () => {
        setIsAttachmentMenuOpen(false);
        navigate(`/inbox/chat/${username}/camera`);
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14.5 4h-5L7.5 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5L14.5 4Z" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-container relative pb-0 theme-chat-page text-white flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={handleBack} className="text-white active:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 shrink-0">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.username}`}
                alt={thread.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold truncate">{thread.displayName}</p>
              <p className="text-[12px] text-white/40 truncate">@{thread.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/80 active:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2.09a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L7.1 8.91a16 16 0 0 0 8 8l1.47-1.27a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
            <button className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/80 active:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="m22 8-6 4 6 4V8Z" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="scrollable flex-1 px-4 py-4 space-y-4">
        {thread.messages.map((message) => (
          <div key={message.id}>
            <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {message.sender === 'them' && (
                <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10 shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.username}`}
                    alt={thread.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-[78%] rounded-[20px] px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                  message.sender === 'me'
                    ? 'bg-[#5A5FD6] text-white rounded-br-[6px]'
                    : 'bg-[#303550] text-white/90 rounded-bl-[6px]'
                }`}
              >
                {message.text}
              </div>
            </div>
            <p className={`text-[11px] text-white/30 mt-2 ${message.sender === 'me' ? 'text-right pr-1' : 'pl-10'}`}>
              {formatBubbleTimestamp(message.createdAt)}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {isAttachmentMenuOpen && (
        <button
          type="button"
          aria-label="Close attachment menu"
          onClick={() => setIsAttachmentMenuOpen(false)}
          className="absolute inset-0 z-10 bg-black/0"
        />
      )}

      <div className="absolute left-4 bottom-[calc(max(1rem,var(--safe-area-bottom))+4.9rem)] z-30 flex flex-col gap-2.5">
        {attachmentOptions.map((option, index) => (
          <button
            key={option.key}
            type="button"
            onClick={option.onClick}
            className={`flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(59,64,98,0.98),rgba(33,37,62,0.98))] pl-2 pr-4 py-2 shadow-[0_18px_44px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-all duration-300 ${
              isAttachmentMenuOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-90 opacity-0 pointer-events-none'
            }`}
            style={{
              transitionDelay: isAttachmentMenuOpen ? `${index * 45}ms` : '0ms',
            }}
          >
            <span className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
              {option.icon}
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-semibold text-white">{option.label}</span>
              <span className="block text-[11px] text-white/45">{option.hint}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-20 px-4 pb-[max(1rem,var(--safe-area-bottom))] pt-3 border-t border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAttachmentMenuOpen((prev) => !prev)}
            className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${
              isAttachmentMenuOpen
                ? 'bg-[#5A5FD6] text-white shadow-[0_10px_24px_rgba(90,95,214,0.35)]'
                : 'bg-white/6 text-white/70 active:bg-white/10'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                className={`origin-center transition-transform duration-300 ${isAttachmentMenuOpen ? 'rotate-45' : ''}`}
              />
            </svg>
          </button>

          <div className="flex-1 rounded-full bg-white/6 border border-white/10 px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="Message"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
            />
            <button className="text-white/35">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleSend}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              draft.trim()
                ? 'bg-[#FE2C55] text-white shadow-[0_8px_20px_rgba(254,44,85,0.35)]'
                : 'bg-white/8 text-white/25 border border-white/10'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
