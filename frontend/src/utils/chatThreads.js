const CHAT_THREADS_KEY = 'chatThreads';
export const CURRENT_CHAT_USERNAME = 'johnny_dance';

const DEFAULT_USERS = [
  { username: 'nature_lover', displayName: 'Nature Lover', subtitle: 'Sharing peaceful moments', followers: '673.6K' },
  { username: 'cute_pets', displayName: 'Cute Pets', subtitle: 'Pet clips and daily smiles', followers: '890K' },
  { username: 'tech_guru', displayName: 'Tech Guru', subtitle: 'Editing tips and gadget talk', followers: '890K' },
  { username: 'music_vibes', displayName: 'Music Vibes', subtitle: 'Always online for collabs', followers: '10M' },
  { username: 'fire_safety', displayName: 'Fire Safety', subtitle: 'Community updates and support', followers: '50K' },
  { username: 'Chloe_joy', displayName: 'Chloe Joy', subtitle: 'People you may know', followers: '264.9K' },
  { username: 'Jenna_85', displayName: 'Jenna 85', subtitle: 'People you may know', followers: '120K' },
  { username: 'layton_wi', displayName: 'Layton Williams', subtitle: 'Creative chats welcome', followers: '264.9K' },
  { username: 'charlidame', displayName: "Charli D'Amelio", subtitle: 'Open for quick replies', followers: '150.2M' },
  { username: 'khaby.lem', displayName: 'Khabane Lame', subtitle: 'Seen today', followers: '161.4M' },
  { username: 'bellapoar', displayName: 'Bella Poarch', subtitle: 'Music and lifestyle', followers: '93M' },
  { username: 'willsmith', displayName: 'Will Smith', subtitle: 'Stories and updates', followers: '74.2M' },
  { username: 'ocean_vibes', displayName: 'Ocean Vibes', subtitle: 'Blue moods only', followers: '50K' },
  { username: 'safari_explorer', displayName: 'Safari Explorer', subtitle: 'Travel and wildlife', followers: '120K' },
  { username: 'OurBootprints', displayName: 'OurBootprints', subtitle: 'From your contacts', followers: '1.5M' },
  { username: 'Jenzp85', displayName: 'Jenzp85', subtitle: 'Recently active', followers: '89K' },
  { username: 'user884998785164', displayName: 'user884998785164', subtitle: 'From your contacts', followers: '11K' },
];

const DEFAULT_THREADS = [
  {
    username: 'nature_lover',
    unreadCount: 2,
    updatedAt: '2026-03-19T10:40:00.000Z',
    messages: [
      { id: 1, sender: 'them', text: 'Sunrise clips are ready, want them?', createdAt: '2026-03-19T10:28:00.000Z' },
      { id: 2, sender: 'me', text: 'Yes, send me the best ones.', createdAt: '2026-03-19T10:31:00.000Z' },
      { id: 3, sender: 'them', text: 'Uploading now, check in a minute.', createdAt: '2026-03-19T10:40:00.000Z' },
    ],
  },
  {
    username: 'tech_guru',
    unreadCount: 1,
    updatedAt: '2026-03-18T18:12:00.000Z',
    messages: [
      { id: 4, sender: 'them', text: 'That transition looked clean. Need the settings?', createdAt: '2026-03-18T18:12:00.000Z' },
    ],
  },
  {
    username: 'cute_pets',
    unreadCount: 0,
    updatedAt: '2026-03-17T14:05:00.000Z',
    messages: [
      { id: 5, sender: 'them', text: 'We just posted a new puppy clip.', createdAt: '2026-03-17T13:40:00.000Z' },
      { id: 6, sender: 'me', text: 'Looks adorable, I will watch it.', createdAt: '2026-03-17T14:05:00.000Z' },
    ],
  },
  {
    username: 'Chloe_joy',
    unreadCount: 3,
    updatedAt: '2026-03-16T09:15:00.000Z',
    messages: [
      { id: 7, sender: 'them', text: 'Hey, are you free for a quick chat later?', createdAt: '2026-03-16T09:15:00.000Z' },
    ],
  },
];

const getFallbackDisplayName = (username) =>
  username
    .split(/[._]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ') || username;

const getStoredThreads = () => {
  try {
    const storedValue = localStorage.getItem(CHAT_THREADS_KEY);
    if (!storedValue) {
      return DEFAULT_THREADS;
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : DEFAULT_THREADS;
  } catch {
    return DEFAULT_THREADS;
  }
};

const persistThreads = (threads) => {
  localStorage.setItem(CHAT_THREADS_KEY, JSON.stringify(threads));
};

const sortThreads = (threads) =>
  [...threads].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());

const getUserMap = () => {
  const map = new Map();
  DEFAULT_USERS.forEach((user) => {
    map.set(user.username, user);
  });
  return map;
};

const enrichUser = (username) => {
  const userMap = getUserMap();
  const knownUser = userMap.get(username);

  if (knownUser) {
    return knownUser;
  }

  return {
    username,
    displayName: getFallbackDisplayName(username),
    subtitle: 'Start a conversation',
    followers: '0',
  };
};

const buildStarterThread = (username) => {
  const user = enrichUser(username);
  const timestamp = new Date().toISOString();

  return {
    username,
    unreadCount: 0,
    updatedAt: timestamp,
    messages: [
      {
        id: Date.now(),
        sender: 'them',
        text: `Hi! This is @${user.username}.`,
        createdAt: timestamp,
      },
    ],
  };
};

const getLastMessage = (thread) => thread.messages[thread.messages.length - 1];

export const formatThreadTimestamp = (isoString) => {
  const timestamp = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffMs < 60 * 1000) {
    return 'Now';
  }

  if (diffHours < 24) {
    return timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  if (diffDays < 7) {
    return timestamp.toLocaleDateString([], { weekday: 'short' });
  }

  return timestamp.toLocaleDateString([], { day: 'numeric', month: 'short' });
};

export const formatBubbleTimestamp = (isoString) =>
  new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

export const getChatUsers = () =>
  DEFAULT_USERS.filter((user) => user.username !== CURRENT_CHAT_USERNAME).sort((left, right) =>
    left.displayName.localeCompare(right.displayName)
  );

export const getChatThreads = () =>
  sortThreads(getStoredThreads()).map((thread) => {
    const user = enrichUser(thread.username);
    const lastMessage = getLastMessage(thread);

    return {
      ...thread,
      ...user,
      preview: lastMessage?.text || 'Start chatting',
      previewTime: formatThreadTimestamp(thread.updatedAt),
    };
  });

export const ensureChatThread = (username) => {
  const threads = getStoredThreads();
  const existingThread = threads.find((thread) => thread.username === username);

  if (existingThread) {
    return {
      ...existingThread,
      ...enrichUser(username),
    };
  }

  const newThread = buildStarterThread(username);
  persistThreads([...threads, newThread]);

  return {
    ...newThread,
    ...enrichUser(username),
  };
};

export const getChatThread = (username) => {
  const thread = ensureChatThread(username);
  return {
    ...thread,
    ...enrichUser(username),
  };
};

export const markChatThreadRead = (username) => {
  const threads = getStoredThreads();
  const updatedThreads = threads.map((thread) =>
    thread.username === username
      ? {
          ...thread,
          unreadCount: 0,
        }
      : thread
  );

  persistThreads(updatedThreads);
  return getChatThread(username);
};

export const sendChatMessage = (username, text) => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return getChatThread(username);
  }

  const thread = ensureChatThread(username);
  const now = new Date().toISOString();
  const nextMessage = {
    id: Date.now(),
    sender: 'me',
    text: trimmedText,
    createdAt: now,
  };

  const threads = getStoredThreads();
  const nextThreads = threads.map((item) =>
    item.username === username
      ? {
          ...item,
          unreadCount: 0,
          updatedAt: now,
          messages: [...thread.messages, nextMessage],
        }
      : item
  );

  persistThreads(nextThreads);
  return getChatThread(username);
};
