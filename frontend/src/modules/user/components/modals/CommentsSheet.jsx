import React, { useState } from 'react';
import { BiX, BiSend, BiHeart } from 'react-icons/bi';

const CommentsSheet = ({ isOpen, onClose, commentCount = 450 }) => {
  const [newComment, setNewComment] = useState('');
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

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[2000] flex flex-col justify-end bg-black/50 touch-none" onClick={onClose}>
      <div 
        className="w-full h-[70%] bg-surface rounded-t-[12px] flex flex-col animate-slide-up touch-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 border-b border-white/5 flex flex-col items-center">
           <div className="w-10 h-1 bg-white/20 rounded-full mb-3 shrink-0"></div>
           <h3 className="text-sm font-bold text-white">{(commentCount + (commentsList.length - 5))} comments</h3>
           <button className="absolute right-4 top-4 text-white hover:opacity-70 transition-opacity" onClick={onClose}>
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
                       <span className="text-xs font-bold text-white/50 block mb-1">@{comment.user}</span>
                       <p className="text-sm text-white/90 leading-relaxed mb-1">{comment.text}</p>
                       <div className="flex gap-4 text-xs font-semibold text-white/40 uppercase">
                           <span>{comment.time}</span>
                           <span>Reply</span>
                       </div>
                   </div>
                   <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                       <BiHeart size={16} className="text-white/30 cursor-pointer active:scale-125 transition-transform" />
                       <span className="text-[10px] font-bold text-white/30">{comment.likes}</span>
                   </div>
               </div>
           ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-surface pb-[max(1rem,var(--safe-area-bottom))]">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johnny_dance" alt="my avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 relative">
                   <input 
                      type="text" 
                      placeholder="Add comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-white/5 border border-transparent focus:border-white/20 rounded-full py-2.5 px-4 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                   />
                   <BiSend 
                      size={20} 
                      onClick={handleSend}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                        newComment ? "text-tiktok-red" : "text-white/20"
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
