export const programmes = [
  {
    slug: 'google-ai',
    title: 'Google AI',
    category: 'Professional Certificate',
    date: '2026-06-24',
    dateLabel: 'June 2026',
    scope: '7 courses',
    description: 'Applied AI across research, planning, communication, content creation, data analysis and app building.',
    verification: 'https://coursera.org/verify/professional-cert/9T3SH4VIM10Q',
  },
  {
    slug: 'google-prompting-essentials',
    title: 'Google Prompting Essentials',
    category: 'Specialization',
    date: '2026-05-25',
    dateLabel: 'May 2026',
    scope: '4 courses',
    description: 'Effective prompting for everyday work, complex tasks, data analysis and creative collaboration.',
    verification: 'https://coursera.org/verify/specialization/4IQTFLK0ME7S',
  },
] as const;

export const courseCertificates = [
  { slug: 'ai-fundamentals', title: 'AI Fundamentals', date: '2026-06-24' },
  { slug: 'ai-for-brainstorming-and-planning', title: 'AI for Brainstorming and Planning', date: '2026-06-24' },
  { slug: 'ai-for-research-and-insights', title: 'AI for Research and Insights', date: '2026-06-18' },
  { slug: 'ai-for-writing-and-communicating', title: 'AI for Writing and Communicating', date: '2026-06-24' },
  { slug: 'ai-for-content-creation', title: 'AI for Content Creation', date: '2026-06-24' },
  { slug: 'ai-for-app-building', title: 'AI for App Building', date: '2026-06-24' },
] as const;

export const credentialFile = (slug: string) => `/credentials/${slug}.pdf`;
