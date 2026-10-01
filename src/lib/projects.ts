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
    id: 'eastern',
    slug: 'eastern-premier',
    number: '03',
    title: 'Eastern Premier Hotel',
    category: 'Hospitality website concept',
    summary: 'A considered digital welcome for a hotel in Koforidua.',
    brief: 'Explore a premium hotel website that brings accommodation, amenities, dining and events into a clear, inviting experience.',
    role: 'Website design & development',
    solution: 'Created a responsive hotel website concept with a photographic hero, room and amenity sections, event information, an image gallery and a booking enquiry interface. Built with HTML, CSS and JavaScript and published as a Netlify preview.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    outcomes: [
      'Designed a cohesive visual experience around hotel photography and expressive typography.',
      'Brought rooms, dining, amenities and events together in a responsive layout.',
      'Added gallery interactions and a demonstration booking enquiry form.',
    ],
    context: 'This is a hotel website design concept. Its booking form is a demonstration, rather than a connected reservation system.',
    link: {
      label: 'Explore the Eastern Premier website concept',
      href: 'https://eastern-premier-hotel-koforidua.netlify.app/',
      note: 'Public design preview · demonstration booking form',
    },
  },
];

export const explorations = [
  { title: 'ScoutingReport Africa', category: 'Football scouting platform', href: 'https://scoutingreportafrica.com' },
  { title: 'Portfolio Builder', category: 'Web application', href: 'https://v0-custom-portfolio-builder-ivory.vercel.app/' },
  { title: 'ExpenseTracker', category: 'Android · source code', href: 'https://github.com/Impulse69/ExpenseTracker' },
  { title: 'RentFlow', category: 'Desktop rental software · source code', href: 'https://github.com/Impulse69/Rentflow-app' },
];
