import React, { useState } from 'react';
import { BiX, BiSend, BiHeart } from 'react-icons/bi';
import { useTheme } from '../../../../context/ThemeContext';

const QUICK_EMOJIS = ['😁', '🥰', '😂', '😳', '😉', '😅', '🥺'];

const CommentsSheet = ({ isOpen, onClose, commentCount = 450 }) => {
  const { isDarkMode } = useTheme();
  const [newComment, setNewComment] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'dancing_queen', text: 'This is absolutely amazing! 🔥', time: '2h', likes: 124 },
    { id: 2, user: 'user123_cool', text: 'First! And this is so true 😂', time: '3h', likes: 89 },
    { id: 3, user: 'tech_guru', text: 'How did you edit this?', time: '5h', likes: 45 },
    { id: 4, user: 'travel_lover', text: 'Wow, added to my bucket list 🌎', time: '1d', likes: 432 },
    { id: 5, user: 'music_fanatic', text: 'Song name please?!', time: '2d', likes: 12 }
  ]);

  const handleSend = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: 'johnny_dance', // Hardcoded for demo
      text: newComment,
      time: 'Just now',
      likes: 0
    };

    setCommentsList([...commentsList, newCommentObj]);
    setNewComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewComment((prev) => `${prev}${emoji}`);
  };

  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      setKeyboardOffset(0);
      return;
    }

    const body = document.body;
    const root = document.getElementById('root');
    const appShell = root?.firstElementChild;
    const viewport = window.visualViewport;
    const lockedHeight = Math.round(
      appShell instanceof HTMLElement
        ? appShell.getBoundingClientRect().height
        : window.innerHeight
    );

    const previousBodyHeight = body.style.height;
    const previousRootHeight = root?.style.height ?? '';
    const previousAppShellHeight = appShell instanceof HTMLElement ? appShell.style.height : '';

    body.style.overflow = 'hidden';
    body.style.height = `${lockedHeight}px`;

    if (root) {
      root.style.height = `${lockedHeight}px`;
    }

    if (appShell instanceof HTMLElement) {
      appShell.style.height = `${lockedHeight}px`;
    }

    const syncKeyboardOffset = () => {
      if (!viewport) {
        setKeyboardOffset(0);
        return;
      }

      const nextOffset = Math.max(0, lockedHeight - viewport.height - viewport.offsetTop);
      setKeyboardOffset(nextOffset);
    };

    syncKeyboardOffset();
    viewport?.addEventListener('resize', syncKeyboardOffset);
    viewport?.addEventListener('scroll', syncKeyboardOffset);

    return () => {
      viewport?.removeEventListener('resize', syncKeyboardOffset);
      viewport?.removeEventListener('scroll', syncKeyboardOffset);
      body.style.overflow = '';
      body.style.height = previousBodyHeight;

      if (root) {
        root.style.height = previousRootHeight;
      }

      if (appShell instanceof HTMLElement) {
        appShell.style.height = previousAppShellHeight;
      }

      setKeyboardOffset(0);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 z-[2000] flex flex-col justify-end touch-none ${
        isDarkMode ? 'bg-black/50' : 'bg-black/30 backdrop-blur-[2px]'
      }`}
      onClick={onClose}
    >
      <div 
        className={`w-full h-[70%] rounded-t-[12px] flex flex-col animate-slide-up touch-auto ${
          isDarkMode
            ? 'bg-[#161823] text-white'
            : 'bg-white text-black shadow-[0_-12px_36px_rgba(15,23,42,0.16)] border-t border-black/10'
        }`} 
        style={{ paddingBottom: keyboardOffset ? `${keyboardOffset}px` : undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative p-4 border-b flex flex-col items-center ${isDarkMode ? 'border-white/5' : 'border-black/[0.08]'}`}>
           <div className={`w-10 h-1 rounded-full mb-3 shrink-0 ${isDarkMode ? 'bg-white/20' : 'bg-black/15'}`}></div>
           <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{(commentCount + (commentsList.length - 5))} comments</h3>
           <button
             className={`absolute right-4 top-4 hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-black/70'}`}
             onClick={onClose}
           >
              <BiX size={24} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollable no-scrollbar overscroll-contain">
           {commentsList.map(comment => (
               <div key={comment.id} className="flex gap-3">
                   <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt="avatar" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                       <span className={`text-xs font-bold block mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/45'}`}>@{comment.user}</span>
                       <p className={`text-sm leading-relaxed mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{comment.text}</p>
                       <div className={`flex gap-4 text-xs font-semibold uppercase ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                           <span>{comment.time}</span>
                           <span>Reply</span>
                       </div>
                   </div>
                   <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                       <BiHeart size={16} className={`cursor-pointer active:scale-125 transition-transform ${isDarkMode ? 'text-white/30' : 'text-black/30'}`} />
                       <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>{comment.likes}</span>
                   </div>
               </div>
           ))}
        </div>

        <div
          className={`p-4 border-t pb-[max(1rem,var(--safe-area-bottom))] ${
            isDarkMode ? 'border-white/5 bg-[#161823]' : 'border-black/[0.08] bg-white'
          }`}
        >
            <div className="mb-3 -mx-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiSelect(emoji)}
                    className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-[22px] active:scale-95 transition-all ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-black/[0.04] border-black/[0.08] hover:bg-black/[0.06]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 border ${isDarkMode ? 'border-white/10' : 'border-black/[0.08]'}`}>
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johnny_dance" alt="my avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 relative">
                   <input 
                      type="text" 
                      placeholder="Add comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full border rounded-full py-2.5 px-4 pr-10 text-sm outline-none transition-all ${
                        isDarkMode
                          ? 'bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30'
                          : 'bg-black/[0.04] border-transparent focus:border-black/15 text-black placeholder:text-black/35'
                      }`}
                   />
                   <BiSend 
                      size={20} 
                      onClick={handleSend}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                        newComment ? "text-tiktok-red" : isDarkMode ? "text-white/20" : "text-black/20"
                      }`}
                   />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSheet;
