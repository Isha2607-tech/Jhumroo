import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IoIosMusicalNote } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CommentsSheet from '../modals/CommentsSheet';
import ShareSheet from '../modals/ShareSheet';

const VideoOverlay = ({ username, caption, musicName, isLiked, likes, comments, shares, isSaved, onSaveClick, onLikeClick }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
        <div className="flex justify-between items-end p-4 pb-[calc(var(--bottom-nav-height)+20px)] pointer-events-auto">
          {/* Left: User info */}
          <div className="flex-1 pr-12 text-left text-white">
            {/* Username — clickable → user profile */}
            <h3
              className="text-lg font-bold mb-2 cursor-pointer active:opacity-70"
              onClick={() => navigate(`/user/${username}`)}
              style={{ pointerEvents: 'auto' }}
            >
              @{username}
            </h3>
            <p className="text-base mb-2 leading-tight">{caption}</p>
            {/* Music — clickable → sound page */}
            <div
              className="flex items-center cursor-pointer active:opacity-70"
              onClick={() => navigate(`/sound/${encodeURIComponent(musicName)}`)}
              style={{ pointerEvents: 'auto' }}
            >
               <IoIosMusicalNote size={14} className="mr-2" />
               <div className="w-[150px] overflow-hidden whitespace-nowrap">
                 <span className="inline-block animate-marquee select-none">{musicName} - Original Audio</span>
               </div>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex flex-col items-center gap-4">
             {/* Avatar + Follow button */}
             <div className="relative mb-2 tap-effect">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-surface overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/user/${username}`)}
                  style={{ pointerEvents: 'auto' }}
                >
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 left-[14px] w-5 h-5 bg-tiktok-red rounded-full border-2 border-tiktok-black flex items-center justify-center cursor-pointer active:scale-90">
                   <BiPlus size={14} color="white" />
                </div>
             </div>

             {/* Like */}
             <div className="flex flex-col items-center text-white tap-effect cursor-pointer" onClick={onLikeClick} style={{ pointerEvents: 'auto' }}>
                  <svg 
                     xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" 
                     fill={isLiked ? "var(--color-accent-red, #FE2C55)" : "transparent"} 
                     stroke={isLiked ? "var(--color-accent-red, #FE2C55)" : "white"} 
                     strokeWidth={isLiked ? "0" : "1.5"} 
                     strokeLinecap="round" strokeLinejoin="round"
                     className={`transition-all duration-300 ease-spring ${isLiked ? 'scale-[1.15] drop-shadow-[0_0_8px_rgba(254,44,85,0.6)]' : 'scale-100 hover:scale-[1.05]'}`}
                  >
                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span className="text-sm font-semibold mt-0.5">{likes}</span>
             </div>

             {/* Comment */}
             <div className="flex flex-col items-center text-white tap-effect" onClick={() => setIsCommentsOpen(true)} style={{ pointerEvents: 'auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span className="text-sm font-semibold mt-0.5">{comments}</span>
             </div>
             
             {/* Save / Bookmark */}
             <div
               className="flex flex-col items-center text-white tap-effect"
               style={{ pointerEvents: 'auto' }}
               onClick={onSaveClick}
             >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                    fill={isSaved ? "var(--color-accent-red)" : "white"}
                    stroke={isSaved ? "var(--color-accent-red)" : "white"}
                    strokeWidth="0"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                  <span className="text-sm font-semibold mt-0.5">{isSaved ? 'Saved' : 'Save'}</span>
             </div>

             {/* Share */}
             <div className="flex flex-col items-center text-white tap-effect" onClick={() => setIsShareOpen(true)} style={{ pointerEvents: 'auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                </svg>
                <span className="text-sm font-semibold mt-0.5">{shares}</span>
             </div>
             
             {/* Music Disc — clickable → sound page */}
             <div
               className="mt-4 relative tap-effect cursor-pointer"
               onClick={() => navigate(`/sound/${encodeURIComponent(musicName)}`)}
               style={{ pointerEvents: 'auto' }}
             >
                <div className="w-12 h-12 rounded-full border-[8px] border-[#2F2F2F] flex justify-center items-center overflow-hidden animate-spin-slow">
                   <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${musicName}`} alt="music thumbnail" className="w-5 h-5 rounded-full object-cover" />
                   <IoIosMusicalNote size={12} className="absolute -top-2.5 -right-2.5 text-white/80 animate-note-float" />
                </div>
             </div>

          </div>
        </div>
      </div>
      
      {/* Comments Sheet Modal */}
      <CommentsSheet 
         isOpen={isCommentsOpen} 
         onClose={() => setIsCommentsOpen(false)} 
         commentCount={comments}
      />

      {/* Share Sheet Modal */}
      <ShareSheet 
         isOpen={isShareOpen} 
         onClose={() => setIsShareOpen(false)} 
      />
    </>
  );
};

export default VideoOverlay;
