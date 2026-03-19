import React, { useMemo, useState } from 'react';
import { BiSearch, BiQrScan, BiFilterAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { mockVideos, mockFollowingVideos } from '../../../../data/mockData';

const categoryMeta = [
  {
    id: 'trending',
    label: 'Trending',
    bannerTitle: '#JhumrooTrending',
    bannerSubtitle: 'Top videos people are watching right now',
    bannerClass: 'from-[#FE2C55] via-[#D56AA8] to-[#36E6D4]',
  },
  {
    id: 'latest-sounds',
    label: 'Latest Sounds',
    bannerTitle: '#JhumrooBeats',
    bannerSubtitle: 'Fresh audio-led clips and viral sound picks',
    bannerClass: 'from-[#4F46E5] via-[#6D62FF] to-[#8FBCFF]',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    bannerTitle: '#JhumrooFashion',
    bannerSubtitle: 'Show off your style!',
    bannerClass: 'from-[#FE2C55] via-[#E484A7] to-[#36E6D4]',
  },
  {
    id: 'comedy',
    label: 'Comedy',
    bannerTitle: '#JhumrooComedy',
    bannerSubtitle: 'Short laughs, reactions, and funny skits',
    bannerClass: 'from-[#F59E0B] via-[#F97316] to-[#FB7185]',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    bannerTitle: '#JhumrooGaming',
    bannerSubtitle: 'Gameplay highlights and clutch moments',
    bannerClass: 'from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]',
  },
  {
    id: 'food',
    label: 'Food',
    bannerTitle: '#JhumrooFood',
    bannerSubtitle: 'Recipes, plating, and crave-worthy bites',
    bannerClass: 'from-[#F97316] via-[#FB7185] to-[#FACC15]',
  },
  {
    id: 'pets',
    label: 'Pets',
    bannerTitle: '#JhumrooPets',
    bannerSubtitle: 'Cute paws, playful jumps, and pet moments',
    bannerClass: 'from-[#14B8A6] via-[#22C55E] to-[#84CC16]',
  },
];

const searchVideoLibrary = [
  {
    id: 'search-1',
    category: 'fashion',
    url: mockVideos[0].url,
    likes: '942K',
    comments: '19K',
    shares: '8K',
    username: 'style.studio',
    title: 'Streetwear transition challenge',
    caption: 'Streetwear transition challenge #fashion #style #jhumroo',
    music: 'Night Run - Style Studio',
  },
  {
    id: 'search-2',
    category: 'fashion',
    url: mockFollowingVideos[0].url,
    likes: '811K',
    comments: '14K',
    shares: '6K',
    username: 'runway.riya',
    title: 'Minimal outfit ideas for the week',
    caption: 'Minimal outfit ideas for the week #fashion #ootd #style',
    music: 'Soft Runway Edit',
  },
  {
    id: 'search-3',
    category: 'comedy',
    url: mockVideos[2].url,
    likes: '1.4M',
    comments: '32K',
    shares: '11K',
    username: 'laugh.loop',
    title: 'POV: when the plan changes in 2 seconds',
    caption: 'POV: when the plan changes in 2 seconds #comedy #funny #lol',
    music: 'Original Sound - Laugh Loop',
  },
  {
    id: 'search-4',
    category: 'comedy',
    url: mockFollowingVideos[1].url,
    likes: '980K',
    comments: '21K',
    shares: '9K',
    username: 'funny.anshu',
    title: 'Unexpected reaction from the whole room',
    caption: 'Unexpected reaction from the whole room #comedy #reaction',
    music: 'Crowd Laugh Remix',
  },
  {
    id: 'search-5',
    category: 'gaming',
    url: mockVideos[0].url,
    likes: '1.8M',
    comments: '48K',
    shares: '16K',
    username: 'pixel.rush',
    title: 'Last-second clutch for the win',
    caption: 'Last-second clutch for the win #gaming #esports #clutch',
    music: 'Level Up Theme',
  },
  {
    id: 'search-6',
    category: 'gaming',
    url: mockFollowingVideos[1].url,
    likes: '699K',
    comments: '13K',
    shares: '5K',
    username: 'console.king',
    title: 'Best combo setup for ranked mode',
    caption: 'Best combo setup for ranked mode #gaming #ranked #tips',
    music: 'Arena Nights',
  },
  {
    id: 'search-7',
    category: 'food',
    url: 'https://video.wixstatic.com/video/073406_3b1abb1c76c9401b94d195a2bae8fffa/1080p/mp4/file.mp4',
    likes: '1.1M',
    comments: '24K',
    shares: '10K',
    username: 'spice.table',
    title: 'Creamy pasta plated in under 10 minutes',
    caption: 'Creamy pasta plated in under 10 minutes #food #recipe #yum',
    music: 'Kitchen Beat',
  },
  {
    id: 'search-8',
    category: 'food',
    url: mockFollowingVideos[0].url,
    likes: '745K',
    comments: '11K',
    shares: '4K',
    username: 'bites.by.ami',
    title: 'Quick snack board for evening cravings',
    caption: 'Quick snack board for evening cravings #food #snacks #easy',
    music: 'Snack Time Loop',
  },
  {
    id: 'search-9',
    category: 'pets',
    url: mockVideos[1].url,
    likes: '2.3M',
    comments: '61K',
    shares: '20K',
    username: 'pet.party',
    title: 'This puppy understood every single word',
    caption: 'This puppy understood every single word #pets #dogs #cute',
    music: 'Happy Paws',
  },
  {
    id: 'search-10',
    category: 'pets',
    url: mockFollowingVideos[1].url,
    likes: '860K',
    comments: '15K',
    shares: '7K',
    username: 'whisker.club',
    title: 'Cat zoomies at midnight again',
    caption: 'Cat zoomies at midnight again #pets #cat #funny',
    music: 'Midnight Meow Mix',
  },
  {
    id: 'search-11',
    category: 'latest-sounds',
    url: mockVideos[0].url,
    likes: '1.6M',
    comments: '38K',
    shares: '14K',
    username: 'beat.drop',
    title: 'Viral sound mix everyone is using',
    caption: 'Viral sound mix everyone is using #sound #trend #music',
    music: 'Beat Drop Original',
  },
  {
    id: 'search-12',
    category: 'latest-sounds',
    url: mockFollowingVideos[0].url,
    likes: '905K',
    comments: '18K',
    shares: '6K',
    username: 'audio.wave',
    title: 'Fresh sound trend for edits and reels',
    caption: 'Fresh sound trend for edits and reels #sound #edit #viral',
    music: 'Wave Edit Audio',
  },
];

const parseCount = (value = '0') => {
  const normalized = String(value).trim().toUpperCase();
  const numeric = parseFloat(normalized.replace(/[^0-9.]/g, '')) || 0;

  if (normalized.endsWith('M')) {
    return numeric * 1000000;
  }

  if (normalized.endsWith('K')) {
    return numeric * 1000;
  }

  return numeric;
};

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('trending');

  const activeCategoryMeta =
    categoryMeta.find((category) => category.id === activeCategory) || categoryMeta[0];

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const categoryLabelMap = Object.fromEntries(categoryMeta.map((item) => [item.id, item.label]));

    const categoryVideos =
      activeCategory === 'trending'
        ? searchVideoLibrary
        : searchVideoLibrary.filter((item) => item.category === activeCategory);

    const searchedVideos = normalizedQuery
      ? categoryVideos.filter((item) =>
          [item.title, item.username, categoryLabelMap[item.category]]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : categoryVideos;

    return [...searchedVideos].sort((left, right) => {
      const likesDifference = parseCount(right.likes) - parseCount(left.likes);

      if (likesDifference !== 0) {
        return likesDifference;
      }

      return left.title.localeCompare(right.title);
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="page-container theme-surface-page flex flex-col">
      <div className="flex items-center gap-4 px-4 py-4 border-b border-divider">
        <div className="flex-1 flex items-center bg-divider/30 rounded-lg px-3 py-2 gap-2">
          <BiSearch size={20} className="text-white/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search accounts, effects, and more..."
            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/50"
          />
        </div>
        <BiQrScan size={24} className="text-white cursor-pointer active:opacity-70" />
      </div>

      <div className="scrollable flex-1">
        <div
          className={`relative h-40 bg-gradient-to-r ${activeCategoryMeta.bannerClass} mx-4 my-4 rounded-xl overflow-hidden flex items-center px-6`}
        >
          <div className="z-10 text-white theme-on-media">
            <h2 className="text-2xl font-bold">{activeCategoryMeta.bannerTitle}</h2>
            <p className="text-sm opacity-90">{activeCategoryMeta.bannerSubtitle}</p>
          </div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
        </div>

        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          {categoryMeta.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 tap-effect transition-all ${
                  isActive
                    ? 'bg-tiktok-red text-white shadow-lg shadow-tiktok-red/20'
                    : 'bg-divider/50 text-white/90'
                }`}
              >
                {category.id === 'trending' && <BiFilterAlt size={16} />}
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 px-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-bold text-white">{activeCategoryMeta.label}</p>
            <p className="text-[12px] text-white/45">
              {filteredVideos.length} videos sorted by popularity
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
            Top picks
          </div>
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 px-2 pb-20 mt-4">
            {filteredVideos.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate('/', {
                    state: {
                      searchVideos: filteredVideos,
                      activeVideoId: item.id,
                    },
                  })
                }
                className="relative aspect-[3/4] rounded-[18px] bg-divider/20 group cursor-pointer overflow-hidden border border-white/5"
              >
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm text-[10px] font-semibold text-white theme-on-media">
                  {categoryMeta.find((category) => category.id === item.category)?.label}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent theme-on-media">
                  <p className="text-[12px] font-semibold text-white truncate">{item.title}</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-[11px] text-white/60 truncate">@{item.username}</span>
                    <div className="flex items-center gap-1 text-white text-[10px] font-bold drop-shadow-md shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
                        <path d="M5 3l14 9-14 9z" />
                      </svg>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-16 text-center">
            <p className="text-[15px] font-semibold text-white">No videos found</p>
            <p className="text-[12px] text-white/45 mt-2">
              Try another category or search keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
