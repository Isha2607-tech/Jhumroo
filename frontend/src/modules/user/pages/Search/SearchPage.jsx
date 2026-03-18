import React from 'react';
import { BiSearch, BiQrScan, BiFilterAlt } from 'react-icons/bi';
import { mockVideos } from '../../../../data/mockData';

const SearchPage = () => {
  return (
    <div className="page-container bg-black flex flex-col">
      {/* Header with Search */ }
      <div className="flex items-center gap-4 px-4 py-4 border-b border-divider">
         <div className="flex-1 flex items-center bg-divider/30 rounded-lg px-3 py-2 gap-2">
            <BiSearch size={20} className="text-white/70" />
            <input 
                type="text" 
                placeholder="Search accounts, effects, and more..." 
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/50" 
            />
         </div>
         <BiQrScan size={24} className="text-white cursor-pointer active:opacity-70" />
      </div>

      <div className="scrollable flex-1">
        {/* Ad Banners/Carousels usually go here, using a placeholder banner */}
        <div className="relative h-40 bg-gradient-to-r from-tiktok-red to-tiktok-cyan mx-4 my-4 rounded-xl overflow-hidden flex items-center px-6">
            <div className="z-10 text-white">
               <h2 className="text-2xl font-bold">#JhumrooFashion</h2>
               <p className="text-sm opacity-90">Show off your style!</p>
            </div>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
        </div>

        {/* Categories / Trending tags */}
        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar whitespace-nowrap">
           <div className="px-4 py-2 bg-tiktok-red text-white rounded-full text-sm font-semibold flex items-center gap-1.5 cursor-pointer tap-effect shadow-lg shadow-tiktok-red/20">
             <BiFilterAlt size={16}/> Trending
           </div>
           {['🎵 Latest Sounds', '👗 Fashion', '🤣 Comedy', '🎮 Gaming', '🍔 Food', '🐱 Pets'].map((tag, idx) => (
               <div key={idx} className="px-4 py-2 bg-divider/50 text-white/90 rounded-full text-sm font-medium cursor-pointer tap-effect">
                 {tag}
               </div>
           ))}
        </div>

        {/* Grid of videos */}
        <div className="grid grid-cols-2 gap-0.5 p-0.5 mt-4">
           {[...mockVideos, ...mockVideos].map((item, index) => (
             <div key={index} className="relative aspect-[3/4] bg-divider/20 group cursor-pointer overflow-hidden">
                 <video src={item.url} poster={item.poster} loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                 <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-bold drop-shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
                      <path d="M5 3l14 9-14 9z" />
                    </svg>
                    <span>{item.likes}</span>
                 </div>
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-active:opacity-100 transition-opacity" />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
