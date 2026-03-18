import React from 'react';
import { BiX, BiLinkAlt, BiFlag, BiMessageRoundedX, BiDownload, BiMessageSquareDetail } from 'react-icons/bi';
import { FaWhatsapp, FaInstagram, FaFacebookMessenger } from 'react-icons/fa';

const ShareSheet = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[2000] flex flex-col justify-end bg-black/50" onClick={onClose}>
      <div 
        className="w-full bg-surface rounded-t-[12px] p-4 pb-navbar animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-4">
           <div className="w-10 h-1 bg-white/20 rounded-full mb-3 shrink-0"></div>
           <button className="absolute right-4 text-white hover:opacity-70 transition-opacity" onClick={onClose}>
              <BiX size={24} />
           </button>
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold text-white/50 px-2 mb-4">Send to</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={`friend-${i}`} className="flex flex-col items-center shrink-0 w-16 gap-1 group">
                           <div className="w-12 h-12 rounded-full overflow-hidden border border-white/5 group-active:scale-95 transition-transform">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=friend${i}`} alt="friend" className="w-full h-full object-cover" />
                           </div>
                           <span className="text-[10px] font-bold text-white/60 truncate w-full text-center">friend_{i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/5 mx-2" />

            <div>
                <h3 className="text-sm font-bold text-white/50 px-2 mb-4">Share to</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2">
                    <div className="flex flex-col items-center shrink-0 w-16 gap-1 tap-effect">
                       <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                           <FaWhatsapp size={24} color="white" />
                       </div>
                       <span className="text-[10px] font-bold text-white/60">WhatsApp</span>
                    </div>
                    <div className="flex flex-col items-center shrink-0 w-16 gap-1 tap-effect">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-lg shadow-pink-500/20">
                           <FaInstagram size={24} color="white" />
                       </div>
                       <span className="text-[10px] font-bold text-white/60">Instagram</span>
                    </div>
                    <div className="flex flex-col items-center shrink-0 w-16 gap-1 tap-effect">
                       <div className="w-12 h-12 rounded-full bg-[#00B2FF] flex items-center justify-center shadow-lg shadow-[#00B2FF]/20">
                           <FaFacebookMessenger size={24} color="white" />
                       </div>
                       <span className="text-[10px] font-bold text-white/60">Messenger</span>
                    </div>
                    <div className="flex flex-col items-center shrink-0 w-16 gap-1 tap-effect">
                       <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                           <BiLinkAlt size={24} color="white" />
                       </div>
                       <span className="text-[10px] font-bold text-white/60">Copy Link</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 py-4 px-2 bg-white/5 rounded-xl">
                <div className="flex-1 flex flex-col items-center gap-2 tap-effect cursor-pointer group text-white">
                   <BiFlag size={20} className="group-hover:text-tiktok-red transition-colors" />
                   <span className="text-[10px] font-bold">Report</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 tap-effect cursor-pointer group text-white">
                   <BiMessageSquareDetail size={20} className="group-hover:text-tiktok-cyan transition-colors" />
                   <span className="text-[10px] font-bold">Not interested</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 tap-effect cursor-pointer group text-white">
                   <BiDownload size={20} className="group-hover:text-success transition-colors" />
                   <span className="text-[10px] font-bold">Save video</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSheet;
