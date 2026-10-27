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
  {
    id: 'casa', slug: 'casa-moderna', number: '04',
    title: 'Casa Moderna', category: 'Design studio website',
    summary: 'An expressive digital home for an interior and exterior design studio.',
    brief: 'Create a website that communicates Casa Moderna’s design approach and gives visitors a clear way to explore its visual collection and enquire about a space.',
    role: 'Website development & deployment',
    solution: 'Built and deployed a responsive studio website with a photographic hero, design gallery, film walkthroughs, service information and an enquiry form. Responsive media, keyboard-accessible galleries and reduced-motion support keep the visual experience usable across devices.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers'],
    outcomes: ['Published the studio website on its own domain.', 'Connected the design collection, studio services and enquiry flow.', 'Delivered responsive image and film presentation with accessible gallery controls.'],
    link: { label: 'Visit Casa Moderna', href: 'https://casamodernagroup.com/', note: 'Live design studio website' },
  },
  {
    id: 'nonna-website', slug: 'nonna-lodge-website', number: '05',
    title: 'Nonna Lodge Website', category: 'Hospitality website',
    summary: 'A welcoming online experience for rooms, dining and life at the lodge.',
    brief: 'Give prospective guests a clear, inviting view of Nonna Lodge and an easy route to plan their stay.',
    role: 'Website design & development',
    solution: 'Created a responsive hospitality website with room information, dining and experience pages, a photographic gallery and booking enquiry links. The site brings the lodge’s spaces and guest information together in a cohesive public experience.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    outcomes: ['Published a public website for prospective guests.', 'Brought rooms, dining, experiences and contact details into a consistent experience.', 'Built responsive image galleries and clear paths to booking enquiries.'],
    context: 'This project is Nonna Lodge’s public website, separate from the hospitality management software showcased above.',
    link: { label: 'Visit Nonna Lodge', href: 'https://nonna-lodge-site.vercel.app/', note: 'Live hospitality website' },
  },
  {
    id: 'dalimachi', slug: 'd-alimachi', number: '06',
    title: 'D Alimachi', category: 'Parcel delivery website & platform',
    summary: 'From home to school: delivery booking, public tracking and careful handovers.',
    brief: 'Give D Alimachi Parcel Delivery a public website that explains its service and connects customers to online delivery booking and parcel tracking.',
    role: 'Website & platform development',
    solution: 'Built a responsive customer-facing website for D Alimachi, powered by the Skuldrop delivery platform. Visitors can explore published services and coverage, book a delivery and track a parcel, while recipient details and proof of delivery remain private.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    outcomes: ['Deployed the customer-facing service at dalimachi.com.', 'Connected service information and coverage to delivery booking and tracking.', 'Kept recipient names, signatures and delivery photographs off public tracking pages.'],
    link: { label: 'Visit D Alimachi', href: 'https://dalimachi.com/', note: 'Live delivery website · powered by Skuldrop' },
  },
];

export const explorations = [
  { title: 'ScoutingReport Africa', category: 'Football scouting platform', href: 'https://scoutingreportafrica.com' },
  { title: 'Portfolio Builder', category: 'Web application', href: 'https://v0-custom-portfolio-builder-ivory.vercel.app/' },
  { title: 'ExpenseTracker', category: 'Android · source code', href: 'https://github.com/Impulse69/ExpenseTracker' },
  { title: 'RentFlow', category: 'Desktop rental software · source code', href: 'https://github.com/Impulse69/Rentflow-app' },
];
