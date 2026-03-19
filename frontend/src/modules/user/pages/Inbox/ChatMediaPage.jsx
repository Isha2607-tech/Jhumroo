import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatThread } from '../../../../utils/chatThreads';

const galleryItems = [
  'https://picsum.photos/seed/chat-gallery-1/260/360',
  'https://picsum.photos/seed/chat-gallery-2/260/360',
  'https://picsum.photos/seed/chat-gallery-3/260/360',
  'https://picsum.photos/seed/chat-gallery-4/260/360',
  'https://picsum.photos/seed/chat-gallery-5/260/360',
  'https://picsum.photos/seed/chat-gallery-6/260/360',
];

const ChatMediaPage = ({ mode = 'gallery' }) => {
  const navigate = useNavigate();
  const { username = '' } = useParams();
  const thread = getChatThread(username);
  const isCamera = mode === 'camera';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(`/inbox/chat/${username}`);
  };

  return (
    <div className="page-container pb-0 theme-chat-page text-white flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={handleBack} className="text-white active:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-[16px] font-bold truncate">{isCamera ? 'Camera' : 'Gallery'}</p>
              <p className="text-[12px] text-white/40 truncate">Send to {thread.displayName}</p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {isCamera ? 'Live View' : 'Recent'}
          </div>
        </div>
      </div>

      {isCamera ? (
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,125,255,0.24),_transparent_30%),linear-gradient(180deg,#1b2034_0%,#0d101a_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[74%] h-[62%] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_28%),linear-gradient(180deg,#2D3352_0%,#1E2238_100%)]" />
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-black/25 border border-white/10 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60">
                Preview
              </div>
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[20px] font-bold">{thread.displayName}</p>
                <p className="text-[12px] text-white/45 mt-1">Camera page mock for chat attachments</p>
              </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex flex-col items-center gap-3">
            {['Flash', 'Flip', 'Timer'].map((label) => (
              <button key={label} className="w-12 h-12 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/80 active:bg-white/12">
                <span className="text-[11px] font-semibold">{label[0]}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="scrollable flex-1 px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {galleryItems.map((item, index) => (
              <button
                key={item}
                className="relative aspect-[3/4] rounded-[22px] overflow-hidden border border-white/10 bg-white/5 active:scale-[0.98] transition-transform"
              >
                <img src={item} alt={`gallery-${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-[12px] font-semibold text-white">Recent {index + 1}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 pb-[max(1rem,var(--safe-area-bottom))] pt-3 border-t border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white">{isCamera ? 'Camera ready' : 'Choose a photo'}</p>
            <p className="text-[11px] text-white/35 mt-1">
              {isCamera ? 'Tap capture to continue.' : 'Select media to continue in chat.'}
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-full bg-[#FE2C55] text-white text-[13px] font-bold shadow-[0_10px_24px_rgba(254,44,85,0.35)] active:brightness-95">
            {isCamera ? 'Capture' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMediaPage;
