import React, { useRef, useState, useEffect } from 'react';
import VideoOverlay from './VideoOverlay';
import AddToFavoritesModal from '../modals/AddToFavoritesModal';
import { useAppContent } from '../../../../hooks/useAppContent';

const VideoCard = ({ videoData, isActive }) => {
  const [playing, setPlaying] = useState(false);
  const {
    isReelLiked,
    isReelSaved,
    toggleLikedReel,
    toggleSavedReel,
  } = useAppContent();
  const [isLiked, setIsLiked] = useState(() => isReelLiked(videoData.id));
  const [likesCount, setLikesCount] = useState(videoData.likes || 0);
  const videoRef = useRef(null);
  const lastTapRef = useRef(0);
  const savedToastTimeoutRef = useRef(null);
  const [showHeart, setShowHeart] = useState(false);

  // --- Favorites State ---
  const [isSaved, setIsSaved] = useState(() => isReelSaved(videoData.id));
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Play/pause logic based on scroll visibility
  useEffect(() => {
    if (isActive) {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setPlaying(true);
        }).catch(err => {
            console.log("Autoplay prevented:", err);
            setPlaying(false);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setPlaying(false);
      }
    }
  }, [isActive]);

  useEffect(() => {
    setIsLiked(isReelLiked(videoData.id));
    setIsSaved(isReelSaved(videoData.id));
  }, [videoData.id, isReelLiked, isReelSaved]);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(prev => {
      const nextLiked = !prev;
      toggleLikedReel(videoData.id);
      let numLikes = parseFloat(likesCount);
      if (!isNaN(numLikes)) {
          setLikesCount(`${(nextLiked ? numLikes + 0.1 : numLikes - 0.1).toFixed(1)}M`);
      }
      return nextLiked;
    });
  };

  const handleDoubleClick = (e) => {
      if (!isLiked) {
         toggleLikedReel(videoData.id);
         setIsLiked(true);
         let numLikes = parseFloat(likesCount);
         if (!isNaN(numLikes)) {
             setLikesCount(`${(numLikes + 0.1).toFixed(1)}M`);
         }
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
      
      // Ensure video plays after double tap if it was paused
      if (!playing && videoRef.current) {
          videoRef.current.play();
          setPlaying(true);
      }
  };

  // Custom tap handler to support both single tap play/pause and fast double tap like
  const handleScreenTap = (e) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      handleDoubleClick(e);
      lastTapRef.current = 0; // reset
    } else {
      // Single tap
      onVideoPress();
      lastTapRef.current = now;
    }
  };

  // --- Save / Favorites Logic ---
  const addToFavorites = () => {
    toggleSavedReel(videoData.id);
    setIsSaved(true);
    setShowSavedToast(true);
    clearTimeout(savedToastTimeoutRef.current);
    savedToastTimeoutRef.current = setTimeout(() => setShowSavedToast(false), 2500);
  };

  const removeFromFavorites = () => {
    toggleSavedReel(videoData.id);
    setIsSaved(false);
    setShowSavedToast(false);
    clearTimeout(savedToastTimeoutRef.current);
  };

  const handleSaveClick = () => {
    if (isSaved) {
      removeFromFavorites();
      return;
    }
    const hasSeen = localStorage.getItem('hasSeenFavoritesPopup');
    if (!hasSeen) {
      setShowFavoritesModal(true);
    } else {
      addToFavorites();
    }
  };

  useEffect(() => {
    return () => clearTimeout(savedToastTimeoutRef.current);
  }, []);

  return (
    <div className="h-full w-full relative snap-start bg-black flex justify-center items-center">
      <video
        ref={videoRef}
        onClick={handleScreenTap}
        className="w-full h-full object-cover bg-black cursor-pointer ink-effect"
        loop
        playsInline
        preload="auto"
        muted={!isActive}
        src={videoData.url}
        poster={videoData.poster}
      ></video>
      
      {/* Overlay controls */}
      <VideoOverlay 
        username={videoData.username}
        caption={videoData.caption}
        musicName={videoData.music}
        likes={likesCount}
        comments={videoData.comments}
        shares={videoData.shares}
        isLiked={isLiked}
        isSaved={isSaved}
        onSaveClick={handleSaveClick}
        onLikeClick={handleLikeClick}
      />

      {/* Play Icon when paused */}
      {!playing && isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] bg-black/30 rounded-full p-4 flex items-center justify-center pointer-events-none transition-opacity duration-200">
           <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" stroke="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="5 3 19 12 5 21 5 3"></polygon>
           </svg>
        </div>
      )}

      {/* Big Heart animation on double tap */}
      {showHeart && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-heart-beat pointer-events-none">
             <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="var(--color-accent-red, #FE2C55)" stroke="transparent">
                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
             </svg>
         </div>
      )}

      {/* Add to Favorites Modal */}
      <AddToFavoritesModal
        isOpen={showFavoritesModal}
        onCancel={() => setShowFavoritesModal(false)}
        onConfirm={() => {
          localStorage.setItem('hasSeenFavoritesPopup', 'true');
          setShowFavoritesModal(false);
          addToFavorites();
        }}
      />

      {/* "Added to Favorites" Toast */}
      {showSavedToast && (
        <div className="absolute bottom-[calc(var(--bottom-nav-height)+16px)] left-0 right-0 mx-4 z-50 flex items-center justify-between bg-black/85 backdrop-blur-sm rounded-lg px-4 py-3 animate-scale-in">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="text-white text-[14px] font-semibold">Added to Favorites</span>
          </div>
          <button className="text-white text-[13px] font-bold opacity-80">Manage &gt;</button>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
