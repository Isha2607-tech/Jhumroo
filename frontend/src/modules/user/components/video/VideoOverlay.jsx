import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import CommentsSheet from '../modals/CommentsSheet';
import ShareSheet from '../modals/ShareSheet';

const VideoOverlay = ({ username, caption, musicName, isLiked, likes, comments, shares, isSaved, onSaveClick, onLikeClick, isMuted, onMuteToggle }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
        {/* Top-right: Mute/Unmute Button */}
        <div className="absolute top-[calc(var(--safe-area-top)+16px)] right-4 pointer-events-auto z-20">
          <button
            onClick={onMuteToggle}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
          >
            {isMuted ? (
              // Muted icon
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              // Unmuted icon
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        </div>
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
