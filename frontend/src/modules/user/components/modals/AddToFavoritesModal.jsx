import React from 'react';

const AddToFavoritesModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ pointerEvents: 'auto' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal Card */}
      <div className="relative w-full bg-white rounded-t-2xl overflow-hidden animate-scale-in shadow-2xl">
        {/* Close X */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-black/40 text-xl font-light leading-none"
          style={{ pointerEvents: 'auto' }}
        >
          ×
        </button>

        {/* Inbox Preview Illustration */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="w-[200px] h-[110px] bg-gray-100 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            {/* Faux inbox card */}
            <div className="w-[160px] h-[70px] bg-white rounded-lg shadow-md flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded w-20 mb-1.5" />
                <div className="h-2 bg-gray-200 rounded w-14" />
              </div>
              {/* Yellow notification dot */}
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            </div>
            {/* Faint second card behind */}
            <div className="absolute -bottom-2 w-[140px] h-[50px] bg-white/60 rounded-lg shadow-sm" />
          </div>
        </div>

        {/* Text */}
        <div className="px-6 pb-4 text-center">
          <h3 className="text-[16px] font-bold text-black leading-snug mb-1">
            Creators will be notified that you added their post to Favourites
          </h3>
          <p className="text-[13px] text-black/50">
            Your support means a lot to creators.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mx-0" />

        {/* Buttons */}
        <div className="flex">
          <button
            onClick={onCancel}
            className="flex-1 py-4 text-[15px] font-semibold text-black/60 border-r border-gray-200 active:bg-gray-50 transition-colors"
            style={{ pointerEvents: 'auto' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 text-[15px] font-bold text-white active:brightness-90 transition-all"
            style={{ background: 'var(--color-accent-red, #FE2C55)', pointerEvents: 'auto' }}
          >
            OK
          </button>
        </div>

        {/* Safe-area bottom padding */}
        <div className="h-[env(safe-area-inset-bottom,16px)]" />
      </div>
    </div>
  );
};

export default AddToFavoritesModal;
