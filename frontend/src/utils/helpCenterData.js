const helpCenterData = {
  safetyTopics: [
    {
      id: 'safety-1',
      title: 'Avoid scam messages',
      description: 'Learn how to spot suspicious links, fake brand outreach, and phishing attempts.',
      badge: 'Popular',
    },
    {
      id: 'safety-2',
      title: 'Protect your account',
      description: 'Use strong passwords, secure login methods, and review active sessions often.',
      badge: 'Recommended',
    },
    {
      id: 'safety-3',
      title: 'Create a safer space',
      description: 'Manage comments, blocks, filters, and report harmful behavior quickly.',
      badge: 'Safety',
    },
  ],
  privacySecurityFaqs: [
    {
      id: 'faq-1',
      question: 'How do I control who can contact me?',
      answer:
        'Open Privacy settings and update direct messages, comments, mentions, duet, and stitch permissions.',
    },
    {
      id: 'faq-2',
      question: 'What happens when I block someone?',
      answer:
        'Blocked accounts cannot message you, view your profile updates normally, or interact with your content.',
    },
    {
      id: 'faq-3',
      question: 'How do I make my account private?',
      answer:
        'Go to Privacy and use the Private account toggle. This limits who can follow and see your content.',
    },
    {
      id: 'faq-4',
      question: 'How do I secure my login?',
      answer:
        'Use a strong password, review your logged-in devices, and turn on 2-step verification from Security settings.',
    },
  ],
  reportProblemCategories: [
    'Login issue',
    'App crash',
    'Video playback',
    'Chat and messages',
    'Privacy concern',
    'Account warning',
  ],
  helpArticles: [
    {
      slug: 'manage-your-privacy-settings',
      title: 'Manage your privacy settings',
      category: 'Privacy',
      readTime: '3 min read',
      excerpt: 'Learn how to control comments, messages, tags, and downloads on your account.',
      content: [
        'Privacy settings help you decide who can interact with your content and contact you.',
        'You can update comments, mentions and tags, direct messages, duet, stitch, and downloads from the Privacy screen.',
        'If you want tighter control, turn on Private account so new followers must be approved.',
      ],
    },
    {
      slug: 'review-active-devices',
      title: 'Review active devices on your account',
      category: 'Security',
      readTime: '2 min read',
      excerpt: 'Check where your account is signed in and remove devices you do not recognize.',
      content: [
        'Open Security and tap Your devices to see all active sessions.',
        'If you notice an unfamiliar device, remove it and change your password immediately.',
        'For stronger protection, enable 2-step verification after reviewing your sessions.',
      ],
    },
    {
      slug: 'report-a-problem-fast',
      title: 'Report a problem quickly',
      category: 'Support',
      readTime: '4 min read',
      excerpt: 'Use the in-app support flow to share issue details and get the right help faster.',
      content: [
        'Choose the category that best matches your issue before submitting.',
        'Add clear details, what you expected, and what actually happened.',
        'Attaching a screenshot or recording makes troubleshooting much easier.',
      ],
    },
    {
      slug: 'stay-safe-from-scams',
      title: 'Stay safe from scams and impersonation',
      category: 'Safety',
      readTime: '3 min read',
      excerpt: 'Recognize suspicious behavior and protect your account from fake outreach.',
      content: [
        'Never share login codes, passwords, or recovery information with anyone.',
        'Be careful with links that ask you to log in outside official app flows.',
        'Report impersonation and suspicious messages so the safety team can review them.',
      ],
    },
  ],
};

export const getSafetyTopics = () => helpCenterData.safetyTopics;
export const getPrivacySecurityFaqs = () => helpCenterData.privacySecurityFaqs;
export const getReportProblemCategories = () => helpCenterData.reportProblemCategories;
export const getHelpArticles = () => helpCenterData.helpArticles;
export const getHelpArticleBySlug = (articleSlug) =>
  helpCenterData.helpArticles.find((article) => article.slug === articleSlug) || null;
