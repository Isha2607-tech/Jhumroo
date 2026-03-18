import React from 'react';
import { BiX, BiMusic } from 'react-icons/bi';
import { IoCameraReverseOutline, IoFlashOutline, IoTimerOutline, IoColorWandOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden">
      {/* Simulation of camera view (Darker grey with subtle gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#111] to-black flex items-center justify-center">
         <div className="text-white/5 opacity-50 scale-[6]">📷</div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full pt-[max(env(safe-area-inset-top),16px)] pb-4 px-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
         <button className="w-10 h-10 flex flex-col items-center justify-center active:opacity-60 transition-opacity" onClick={() => navigate(-1)}>
            <BiX size={32} color="white" className="drop-shadow-md" />
         </button>
         
         <button className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white text-[13px] font-bold shadow-sm border border-white/10 active:scale-95 transition-transform">
            <BiMusic size={16} />
            <span className="leading-none pt-0.5">Add Sound</span>
         </button>
         
         <div className="w-10 h-10"></div> {/* Spacer for perfect centering */}
      </div>

      {/* Side Controls */}
      <div className="absolute top-[15%] right-3 flex flex-col gap-5 z-20 items-center">
          {[
              { icon: <IoCameraReverseOutline size={26} />, label: "Flip" },
              { icon: <IoFlashOutline size={26} />, label: "Flash" },
              { icon: <IoTimerOutline size={26} />, label: "Timer" },
              { icon: <IoColorWandOutline size={26} />, label: "Filters" }
          ].map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 text-white cursor-pointer active:opacity-60 transition-opacity drop-shadow-lg">
                 <div className="w-10 h-10 flex items-center justify-center">{tool.icon}</div>
                 <span className="text-[10px] font-bold shadow-black drop-shadow-md">{tool.label}</span>
              </div>
          ))}
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-16 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 z-20">
         {/* Camera Modes */}
         <div className="flex justify-center gap-7 mb-7 text-[15px] font-semibold drop-shadow-md">
            <span className="text-white/60 cursor-pointer active:text-white transition-colors">Camera</span>
            <span className="text-white relative">Story
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_white]"></div>
            </span>
            <span className="text-white/60 cursor-pointer active:text-white transition-colors">Templates</span>
         </div>
         
         {/* Record Button UI */}
         <div className="flex justify-around items-center px-6">
            <div className="flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-transform w-[60px]">
               <div className="w-9 h-9 mb-1.5 rounded-lg overflow-hidden border border-white/30 drop-shadow-md">
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=effects" alt="effects" className="w-full h-full object-cover" />
               </div>
               <span className="text-[11px] font-bold text-white drop-shadow-md">Effects</span>
            </div>
            
            <div className="relative w-20 h-20 flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-200">
               {/* Outer ring */}
               <div className="absolute inset-0 rounded-full border-[5px] border-white/80 drop-shadow-lg backdrop-blur-sm"></div>
               {/* Inner red button */}
               <div className="w-[66px] h-[66px] bg-[#FE2C55] rounded-full drop-shadow-xl shadow-[0_0_15px_rgba(254,44,85,0.4)]"></div>
            </div>

            <div className="flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-transform w-[60px]">
               <div className="w-9 h-9 mb-1.5 rounded-lg overflow-hidden border border-white/30 drop-shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-[#E2E2E2] to-[#B3B3B3]" />
               </div>
               <span className="text-[11px] font-bold text-white drop-shadow-md">Upload</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CreatePage;
