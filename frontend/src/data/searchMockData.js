import { mockFollowingVideos, mockVideos } from './mockData';

const FOOD_VIDEO_SOURCES = [
  mockVideos[0].url,
  mockVideos[1].url,
  mockVideos[2].url,
  mockFollowingVideos[0].url,
  mockFollowingVideos[1].url,
  'https://video.wixstatic.com/video/073406_3b1abb1c76c9401b94d195a2bae8fffa/1080p/mp4/file.mp4',
];

const createSearchVideo = ({
  id,
  title,
  caption,
  username,
  thumbnail,
  date,
  views,
  likes,
  comments,
  shares,
  music,
  watchState,
  uploadState,
  tags,
  urlIndex = 0,
}) => ({
  id,
  title,
  caption,
  username,
  thumbnail,
  date,
  views,
  likes,
  comments,
  shares,
  music,
  watchState,
  uploadState,
  tags,
  url: FOOD_VIDEO_SOURCES[urlIndex % FOOD_VIDEO_SOURCES.length],
  isLiked: false,
});

export const SEARCH_TABS = [
  { id: 'top', label: 'Top' },
  { id: 'videos', label: 'Videos' },
  { id: 'users', label: 'Users' },
  { id: 'sounds', label: 'Sounds' },
  { id: 'shop', label: 'Shop' },
  { id: 'live', label: 'LIVE' },
  { id: 'hashtags', label: 'Hashtags' },
];

export const SEARCH_TOP_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unwatched', label: 'Unwatched' },
  { id: 'watched', label: 'Watched' },
  { id: 'recent', label: 'Recently uploaded' },
];

export const SEARCH_DISCOVERY_SUGGESTIONS = [
  { id: 'discover-1', label: 'isabella.lauren', accent: '#ff2c55', meta: 'Just watched' },
  { id: 'discover-2', label: 'first born daughter', accent: '#ff2c55', meta: 'Just watched' },
  { id: 'discover-3', label: 'top 10 most viewed videos on tiktok', accent: '#f4b740' },
  { id: 'discover-4', label: 'She Wears Short Skirts I Wear T-Shirts', accent: '#c7ceda' },
  { id: 'discover-5', label: "Jenna Ortega's Sister", accent: '#c7ceda', badge: 'hot' },
  { id: 'discover-6', label: 'Dance Video', accent: '#c7ceda' },
  { id: 'discover-7', label: 'Lisa Marie Presley', accent: '#c7ceda', badge: 'hot' },
  { id: 'discover-8', label: 'Ginger Woman In Green Dress', accent: '#c7ceda', badge: 'hot' },
  { id: 'discover-9', label: 'Hope - Live Moments', accent: '#c7ceda' },
  { id: 'discover-10', label: 'IKEA Hacks', accent: '#c7ceda' },
];

const SEARCH_TYPEAHEAD_POOL = [
  { label: 'food tiktok', kind: 'search' },
  { label: 'funny', kind: 'search' },
  { label: 'fortnite', kind: 'search', verified: true, accessory: 'cherries' },
  { label: 'food making', kind: 'search' },
  { label: 'food eating videos', kind: 'search' },
  { label: 'food mukbang', kind: 'search' },
  { label: 'fifa 23', kind: 'search' },
  { label: 'funny video tiktok', kind: 'search' },
  { label: 'food asmr', kind: 'search' },
  { label: 'food plating', kind: 'search' },
  { label: 'food reels', kind: 'search' },
  { label: 'food challenges', kind: 'search' },
  { label: 'foodie accounts', kind: 'search' },
  { label: 'free wheelspin', kind: 'search' },
  { label: 'fashion tiktok', kind: 'search' },
];

export const SEARCH_VIDEO_RESULTS = [
  createSearchVideo({
    id: 'food-video-1',
    title: '...food #food #italianfood',
    caption: 'CHICKEN PARMESAN #Chicken #chickenparm #chickenparmesan #food #italianfood',
    username: 'god_of_food',
    thumbnail:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    date: '11/1/2023',
    views: '636.0K',
    likes: '636.0K',
    comments: '12.1K',
    shares: '4.5K',
    music: 's hissback original sound',
    watchState: 'unwatched',
    uploadState: 'recent',
    tags: ['food', 'italianfood', 'foodporn', 'chicken parm'],
    urlIndex: 0,
  }),
  createSearchVideo({
    id: 'food-video-2',
    title: '...food #takeaway #yum',
    caption: 'fresh takeaway #yum #pizza #fresh #fyp #viral #food',
    username: 'romero_ori',
    thumbnail:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    date: '12/1/2022',
    views: '381.9K',
    likes: '381.9K',
    comments: '8.4K',
    shares: '3.1K',
    music: 'Kitchen Table Edit',
    watchState: 'watched',
    uploadState: 'old',
    tags: ['food', 'takeaway', 'yum', 'fresh'],
    urlIndex: 1,
  }),
  createSearchVideo({
    id: 'food-video-3',
    title: '...food #burger #streetfood',
    caption: 'juicy burger stack #food #streetfood #burger #foodtok',
    username: 'stacked_bites',
    thumbnail:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    date: '5/16/2022',
    views: '520.4K',
    likes: '520.4K',
    comments: '10.8K',
    shares: '2.4K',
    music: 'Late Night Grill',
    watchState: 'unwatched',
    uploadState: 'old',
    tags: ['food', 'burger', 'streetfood'],
    urlIndex: 2,
  }),
  createSearchVideo({
    id: 'food-video-4',
    title: '...food #noodles #italianfood',
    caption: 'midnight noodles with an egg yolk finish #food #noodles #italianfood',
    username: 'midnight_bowl',
    thumbnail:
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
    date: '9/1/2022',
    views: '292.7K',
    likes: '292.7K',
    comments: '6.4K',
    shares: '1.3K',
    music: 'After Hours Noodles',
    watchState: 'watched',
    uploadState: 'old',
    tags: ['food', 'noodles', 'foodie'],
    urlIndex: 3,
  }),
  createSearchVideo({
    id: 'food-video-5',
    title: '...food #brunch #healthy',
    caption: 'healthy brunch bowl for busy mornings #food #healthy #breakfast',
    username: 'brunch.daily',
    thumbnail:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80',
    date: '3/14/2024',
    views: '774.8K',
    likes: '774.8K',
    comments: '14.6K',
    shares: '5.2K',
    music: 'Sunny Side Up',
    watchState: 'unwatched',
    uploadState: 'recent',
    tags: ['food', 'healthy', 'brunch'],
    urlIndex: 4,
  }),
  createSearchVideo({
    id: 'food-video-6',
    title: '...food #dessert #stack',
    caption: 'breakfast stack with syrup drizzle #food #dessert #pancakes',
    username: 'sweet_layers',
    thumbnail:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    date: '8/10/2023',
    views: '418.2K',
    likes: '418.2K',
    comments: '7.1K',
    shares: '1.8K',
    music: 'Golden Morning',
    watchState: 'watched',
    uploadState: 'recent',
    tags: ['food', 'dessert', 'pancakes'],
    urlIndex: 5,
  }),
  createSearchVideo({
    id: 'food-video-7',
    title: '...food #salad #mealprep',
    caption: 'fresh citrus salad for meal prep #food #salad #mealprep',
    username: 'freshandfolded',
    thumbnail:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    date: '2/2/2024',
    views: '283.4K',
    likes: '283.4K',
    comments: '4.1K',
    shares: '1.1K',
    music: 'Prep and Plate',
    watchState: 'unwatched',
    uploadState: 'recent',
    tags: ['food', 'salad', 'mealprep'],
    urlIndex: 0,
  }),
  createSearchVideo({
    id: 'food-video-8',
    title: '...food #salmon #foodporn',
    caption: 'crispy salmon and herbs #food #foodporn #dinner',
    username: 'flame.and.sea',
    thumbnail:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    date: '1/8/2024',
    views: '512.6K',
    likes: '512.6K',
    comments: '9.2K',
    shares: '2.7K',
    music: 'Pan Sear Loop',
    watchState: 'watched',
    uploadState: 'recent',
    tags: ['food', 'salmon', 'dinner'],
    urlIndex: 1,
  }),
];

export const SEARCH_USER_RESULTS = [
  {
    id: 'user-1',
    username: 'foodies',
    displayName: 'Foodies',
    avatar:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80',
    followers: '21.9M',
    videos: '1473',
    subtitle: 'Foodies',
    tags: ['food', 'recipes', 'viral'],
  },
  {
    id: 'user-2',
    username: 'foodgod',
    displayName: 'foodgod',
    avatar:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80',
    followers: '8.7M',
    videos: '584',
    subtitle: 'foodgod',
    tags: ['food', 'celeb food', 'reviews'],
  },
  {
    id: 'user-3',
    username: 'foodnetwork',
    displayName: 'Food Network',
    avatar:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=240&q=80',
    followers: '3.4M',
    videos: '418',
    subtitle: 'Food Network',
    tags: ['food', 'network', 'recipes'],
  },
  {
    id: 'user-4',
    username: 'tasty_sharefood',
    displayName: 'tasty_sharefood',
    avatar:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=240&q=80',
    followers: '100',
    videos: '1220',
    subtitle: 'food',
    tags: ['food', 'tasty'],
  },
  {
    id: 'user-5',
    username: 'margo.food',
    displayName: 'MARGO FOOD',
    avatar:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80',
    followers: '4.5M',
    videos: '241',
    subtitle: 'MARGO FOOD',
    tags: ['food', 'chef'],
  },
  {
    id: 'user-6',
    username: 'foodfallcountries',
    displayName: 'foodfallcountries',
    avatar:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=80',
    followers: '205.2K',
    videos: '190',
    subtitle: 'food',
    tags: ['food', 'travel'],
  },
  {
    id: 'user-7',
    username: 'foods',
    displayName: 'Foods',
    avatar:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=240&q=80',
    followers: '1.5M',
    videos: '542',
    subtitle: 'Foods',
    tags: ['food'],
  },
  {
    id: 'user-8',
    username: 'food.usssss',
    displayName: 'food.usssss',
    avatar:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=240&q=80',
    followers: '135.4K',
    videos: '129',
    subtitle: 'food',
    tags: ['food', 'dessert'],
  },
  {
    id: 'user-9',
    username: 'foodvirals',
    displayName: 'Foodies',
    avatar:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=240&q=80',
    followers: '530.3K',
    videos: '94',
    subtitle: 'Foodies',
    tags: ['food', 'viral'],
  },
];

export const SEARCH_SOUND_RESULTS = [
  {
    id: 'sound-1',
    musicName: 'Food',
    creator: 'eas Ratta',
    duration: '01:59',
    videoCount: '31.5K videos',
    cover:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80',
    badge: '1 matched sound',
    tags: ['food', 'sound', 'recipes'],
  },
  {
    id: 'sound-2',
    musicName: 'Food',
    creator: 'Densky9',
    duration: '01:00',
    videoCount: '420.4K videos',
    cover:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80',
    tags: ['food', 'popular'],
  },
  {
    id: 'sound-3',
    musicName: 'Food!',
    creator: 'Rucka Rucka Ali & "Wierd Ali"Ru...',
    duration: '01:00',
    videoCount: '44.8K videos',
    cover:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=240&q=80',
    tags: ['food', 'meme'],
  },
  {
    id: 'sound-4',
    musicName: 'Delicious Food',
    creator: 'Mdstocksound',
    duration: '01:00',
    videoCount: '338K videos',
    cover:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=240&q=80',
    badge: 'Popular',
    tags: ['food', 'delicious'],
  },
  {
    id: 'sound-5',
    musicName: 'Food',
    creator: 'Aira',
    duration: '01:00',
    videoCount: '64.9K videos',
    cover:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=240&q=80',
    tags: ['food', 'aira'],
  },
  {
    id: 'sound-6',
    musicName: 'Food - Yum Yum Yum Eat F...',
    creator: 'Food Music by Hahaas Comedy',
    duration: '00:29',
    videoCount: '13K videos',
    cover:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=240&q=80',
    tags: ['food', 'yum'],
  },
  {
    id: 'sound-7',
    musicName: 'Food - Double Stuff Yummy...',
    creator: 'Food Music by Hahaas Comedy',
    duration: '01:00',
    videoCount: '14.1K videos',
    cover:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=240&q=80',
    tags: ['food', 'comedy'],
  },
];

export const SEARCH_SHOP_RESULTS = [
  {
    id: 'shop-1',
    title: 'Chef Knife Set',
    price: '$39.99',
    shopName: 'Kitchen Select',
    image:
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=700&q=80',
    meta: 'Fast delivery',
    tags: ['food', 'kitchen', 'chef'],
  },
  {
    id: 'shop-2',
    title: 'Mini Waffle Maker',
    price: '$24.00',
    shopName: 'Home Bakes',
    image:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=80',
    meta: 'Top pick',
    tags: ['food', 'breakfast'],
  },
  {
    id: 'shop-3',
    title: 'Glass Spice Jars',
    price: '$18.50',
    shopName: 'Pantry Co.',
    image:
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=80',
    meta: 'Bundle',
    tags: ['food', 'spice', 'kitchen'],
  },
  {
    id: 'shop-4',
    title: 'Ceramic Ramen Bowl',
    price: '$28.00',
    shopName: 'Nori House',
    image:
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=700&q=80',
    meta: 'New',
    tags: ['food', 'ramen'],
  },
  {
    id: 'shop-5',
    title: 'Cake Turntable',
    price: '$31.20',
    shopName: 'Bake Better',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    meta: 'Popular',
    tags: ['food', 'dessert', 'baking'],
  },
  {
    id: 'shop-6',
    title: 'Meal Prep Containers',
    price: '$16.99',
    shopName: 'Prep Daily',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
    meta: 'BPA free',
    tags: ['food', 'meal prep'],
  },
];

export const SEARCH_LIVE_RESULTS = [
  {
    id: 'live-1',
    title: 'FREAKY FRIDAY- FREE WHEELSPIN',
    host: 'spudarmy',
    viewers: '402',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'live', 'host'],
  },
  {
    id: 'live-2',
    title: 'FREE WHEELSPIN',
    host: 'sugarlipscandyfic',
    viewers: '402',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'live', 'treats'],
  },
  {
    id: 'live-3',
    title: 'PACKING ORDERS',
    host: 'candy.craft',
    viewers: '402',
    image:
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'live', 'orders'],
  },
  {
    id: 'live-4',
    title: 'NEW STOCK',
    host: 'sugar.splash',
    viewers: '402',
    image:
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'live', 'stock'],
  },
];

export const SEARCH_HASHTAG_RESULTS = [
  { id: 'hash-1', slug: 'food', label: 'Food', views: '445.5B views', tags: ['food'] },
  { id: 'hash-2', slug: 'foodporn', label: 'FoodPorn', views: '23.6B views', tags: ['food'] },
  { id: 'hash-3', slug: 'foodasmr', label: 'foodasmr', views: '10.0B views', tags: ['food', 'asmr'] },
  { id: 'hash-4', slug: 'foodtiktok', label: 'FoodTikTok', views: '122.1B views', tags: ['food', 'tiktok'] },
  { id: 'hash-5', slug: 'foods', label: 'foods', views: '2.7B views', tags: ['food'] },
  { id: 'hash-6', slug: 'foodchallenge', label: 'foodchallenge', views: '11.3B views', tags: ['food'] },
  { id: 'hash-7', slug: 'foodlover', label: 'FoodLover', views: '41.7B views', tags: ['food'] },
  { id: 'hash-8', slug: 'foodfood', label: 'foodfood', views: '2.0B views', tags: ['food'] },
  { id: 'hash-9', slug: 'foodtok', label: 'FoodTok', views: '42.1B views', tags: ['food', 'tok'] },
  { id: 'hash-10', slug: 'foodreview', label: 'FoodReview', views: '20.7B views', tags: ['food', 'review'] },
  { id: 'hash-11', slug: 'foodies', label: 'Foodies', views: '33.4B views', tags: ['food', 'foodies'] },
  { id: 'hash-12', slug: 'foodblogger', label: 'foodblogger', views: '5.7B views', tags: ['food', 'blogger'] },
  { id: 'hash-13', slug: 'foodloverdaily', label: 'foodlover', views: '3.8B views', tags: ['food', 'lover'] },
  { id: 'hash-14', slug: 'foodhacks', label: 'FoodHacks', views: '6.2B views', tags: ['food', 'hacks'] },
];

const SEARCH_HASHTAG_DETAIL_MAP = {
  food: {
    slug: 'food',
    label: '#Food',
    views: '445.5B views',
    coverImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    galleryVideoIds: [
      'food-video-1',
      'food-video-2',
      'food-video-5',
      'food-video-7',
      'food-video-8',
      'food-video-4',
      'food-video-3',
      'food-video-6',
      'food-video-2',
      'food-video-7',
      'food-video-8',
      'food-video-5',
    ],
  },
};

export const normalizeSearchQuery = (value = '') =>
  String(value).replace(/\s+/g, ' ').trim();

export const getDefaultSearchSuggestions = () => SEARCH_DISCOVERY_SUGGESTIONS;

const matchesQuery = (query, values) => {
  if (!query) {
    return true;
  }

  return values
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(query);
};

const dedupeByLabel = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.label.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const createDynamicTypeaheadSuggestions = (query) => [
  { label: query, kind: 'recent' },
  { label: `${query} tiktok`, kind: 'search' },
  { label: `${query} videos`, kind: 'search' },
  { label: `${query} live`, kind: 'search' },
];

export const getTypingSuggestions = (query, history = []) => {
  const normalized = normalizeSearchQuery(query);

  if (!normalized) {
    return [];
  }

  const loweredQuery = normalized.toLowerCase();
  const historySuggestions = history
    .filter((item) => item.toLowerCase().includes(loweredQuery))
    .map((item) => ({ label: item, kind: 'recent' }));
  const matchingPool = SEARCH_TYPEAHEAD_POOL.filter((item) =>
    item.label.toLowerCase().includes(loweredQuery),
  );

  return dedupeByLabel([
    ...historySuggestions,
    ...createDynamicTypeaheadSuggestions(normalized),
    ...matchingPool,
  ]).slice(0, 8);
};

const filterItems = (query, items, fields) =>
  items.filter((item) =>
    matchesQuery(
      query,
      fields.map((field) => {
        const value = item[field];
        return Array.isArray(value) ? value.join(' ') : value;
      }),
    ),
  );

export const getSearchResults = (query) => {
  const normalized = normalizeSearchQuery(query).toLowerCase();
  const fallbackVideos = SEARCH_VIDEO_RESULTS.slice(0, 6);
  const fallbackUsers = SEARCH_USER_RESULTS.slice(0, 8);
  const fallbackSounds = SEARCH_SOUND_RESULTS.slice(0, 7);
  const fallbackShop = SEARCH_SHOP_RESULTS.slice(0, 6);
  const fallbackLive = SEARCH_LIVE_RESULTS.slice(0, 4);
  const fallbackHashtags = SEARCH_HASHTAG_RESULTS.slice(0, 12);

  const videos = normalized
    ? filterItems(normalized, SEARCH_VIDEO_RESULTS, ['title', 'caption', 'username', 'music', 'tags'])
    : fallbackVideos;
  const users = normalized
    ? filterItems(normalized, SEARCH_USER_RESULTS, ['username', 'displayName', 'subtitle', 'tags'])
    : fallbackUsers;
  const sounds = normalized
    ? filterItems(normalized, SEARCH_SOUND_RESULTS, ['musicName', 'creator', 'badge', 'tags'])
    : fallbackSounds;
  const shop = normalized
    ? filterItems(normalized, SEARCH_SHOP_RESULTS, ['title', 'shopName', 'meta', 'tags'])
    : fallbackShop;
  const live = normalized
    ? filterItems(normalized, SEARCH_LIVE_RESULTS, ['title', 'host', 'tags'])
    : fallbackLive;
  const hashtags = normalized
    ? filterItems(normalized, SEARCH_HASHTAG_RESULTS, ['label', 'tags'])
    : fallbackHashtags;

  return {
    videos: videos.length > 0 ? videos : fallbackVideos,
    users: users.length > 0 ? users : fallbackUsers,
    sounds: sounds.length > 0 ? sounds : fallbackSounds,
    shop: shop.length > 0 ? shop : fallbackShop,
    live: live.length > 0 ? live : fallbackLive,
    hashtags: hashtags.length > 0 ? hashtags : fallbackHashtags,
  };
};

export const getHashtagDetail = (slug = 'food') => {
  const selectedHashtag =
    SEARCH_HASHTAG_RESULTS.find((item) => item.slug === slug) || SEARCH_HASHTAG_RESULTS[0];
  const detail = SEARCH_HASHTAG_DETAIL_MAP[slug] || SEARCH_HASHTAG_DETAIL_MAP.food;
  const galleryVideos = detail.galleryVideoIds
    .map((videoId) => SEARCH_VIDEO_RESULTS.find((video) => video.id === videoId))
    .filter(Boolean);

  return {
    ...detail,
    slug: selectedHashtag.slug,
    label: `#${selectedHashtag.label}`,
    views: selectedHashtag.views,
    galleryVideos,
  };
};
