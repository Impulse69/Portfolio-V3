export type PortfolioProject = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  brief: string;
  role: string;
  solution: string;
  technologies: string[];
  outcomes: string[];
  context?: string;
  link?: { label: string; href: string; note: string };
};

export const flagshipProjects: PortfolioProject[] = [
  {
    id: 'odg',
    slug: 'odg-erp',
    number: '01',
    title: 'ODG ERP',
    category: 'Business operations',
    summary: 'Connecting stock, quotations and invoices in one business system.',
    brief: 'Office Data Ghana needed business software that brought its inventory and customer billing workflows together.',
    role: 'Sole freelance / contract developer',
    solution: 'Built a custom ERP from the ground up, connecting inventory, quotations and invoicing through a shared business application.',
    technologies: ['Laravel', 'Livewire', 'Filament', 'MySQL', 'Spatie RBAC'],
    outcomes: [
      'Delivered production software for a paying business client in Ghana.',
      'Brought stock records, quotations and invoices into a connected workflow.',
      'Owned development from the initial build through production delivery.',
    ],
  },
  {
    id: 'nonna',
    slug: 'nonna-lodge',
    number: '02',
    title: 'Nonna Lodge',
    category: 'Hospitality management software',
    summary: 'Hotel operations in one desktop system, from reservations to restaurant sales.',
    brief: 'Bring room bookings, guest accounts, billing and restaurant operations into a connected hospitality management system that can run locally without internet access.',
    role: 'Sole developer',
    solution: 'Built an Electron desktop application with a React and TypeScript interface, an embedded Fastify server, and a local SQLite database managed through Drizzle ORM. The system connects rooms, guests, reservations, guest folios, restaurant point of sale, night audit and reporting. Additional workstations connect to the host over the local network.',
    technologies: ['Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Fastify', 'SQLite', 'Drizzle ORM'],
    outcomes: [
      'Connected accommodation, guest billing and restaurant sales in a shared hotel workflow.',
      'Enabled local operation without internet access, with additional workstations using the host over LAN.',
      'Added receipt and invoice PDF output, printing, night audit, reporting and database backups.',
    ],
    context: 'This case study covers Nonna Lodge’s hospitality management software. The link below opens its separate public website.',
    link: {
      label: 'Visit the separate Nonna Lodge website',
      href: 'https://nonna-lodge-site.vercel.app/',
      note: 'Public website · separate from the desktop software',
    },
  },
  {
    id: 'freden',
    slug: 'freden-hotel',
    number: '03',
    title: 'Freden Hotel',
    category: 'Hospitality & business development',
    summary: 'A hotel website backed by an ongoing IJW Labs service relationship.',
    brief: 'A hotel website engagement combined hands-on software delivery with the development of an ongoing client relationship.',
    role: 'Developer & business lead',
    solution: 'Built the production website with Laravel and Livewire, integrated Paystack recurring billing, and established a subscription retainer through IJW Labs.',
    technologies: ['Laravel', 'Livewire', 'Paystack'],
    outcomes: [
      'Delivered the production hotel website.',
      'Integrated recurring billing using Paystack.',
      'Turned a one-off build into an ongoing subscription service for IJW Labs.',
    ],
    context: 'IJW Labs also publishes a Freden Hotel design concept. That concept is separate from the production engagement described here.',
  },
];

export const explorations = [
  { title: 'ScoutingReport Africa', category: 'Football scouting platform', href: 'https://scoutingreportafrica.com' },
  { title: 'Portfolio Builder', category: 'Web application', href: 'https://v0-custom-portfolio-builder-ivory.vercel.app/' },
  { title: 'ExpenseTracker', category: 'Android · source code', href: 'https://github.com/Impulse69/ExpenseTracker' },
  { title: 'RentFlow', category: 'Desktop rental software · source code', href: 'https://github.com/Impulse69/Rentflow-app' },
];
