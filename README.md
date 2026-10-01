# Isaac Asamoah — Founder portfolio

An editorial portfolio for the founder and CEO of IJW Labs. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, using ivory, olive and rust, DM Sans and Cormorant Garamond, portrait photography and two-dimensional CSS motion. No WebGL runtime or loading gate.

## Local review

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. For a local production preview:

```powershell
npm.cmd run build
npm.cmd run start -- --port 3000
```

## Validation

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
```

## Content and interactions

- `src/app/page.tsx`: founder introduction, company, biography, approach and contact.
- `src/lib/profile.ts`: identity and linked Person/Organization structured data.
- `src/lib/projects.ts`: commercial project stories and other explorations.
- `src/components/WorkGallery.tsx`: native case-study dialogs with keyboard focus management.
- `src/components/Navigation.tsx`: section navigation and responsive mobile menu.
- `src/components/ContactActions.tsx`: direct email, copy-email interaction and company enquiry link.
- `src/app/opengraph-image.tsx`: generated social preview artwork.

Contact uses email links and the existing IJW Labs contact page. No new third-party form service or test message submission.

## Sources

Founder title and company description were checked against https://ijwlabs.com/ and https://ijwlabs.com/founders/isaac-asamoah/. The hero portrait is a local copy of IJW Labs' public founder portrait (`/images/founder-isaac-20260930.jpg`), retrieved October 1, 2026. The secondary portrait is the existing portfolio image.

ODG uses previously supplied professional project facts. Eastern Premier's website concept was verified against its existing HTML source: responsive room, amenity, dining, event and gallery sections, JavaScript interactions and a mock booking form. Nonna Lodge's hospitality management case study was corrected against the current application under `C:/Users/User/Hotel-gig/app`: package manifest, Electron entry point, registered server routes, database initialization/schema, and printing implementation. Its stack is Electron, React, TypeScript, Tailwind CSS, Node.js, Fastify, SQLite and Drizzle ORM. The source app is internally branded IJW Stay. Older Python files and rental-product notes do not describe this implementation.

Project card images live in `public/images/work/`. ODG and Nonna are generated interface concepts, identified in image alt text, rather than screenshots of deployed products. Eastern Premier uses the existing website concept's aerial hero image. Nonna's public website is separate from its hospitality management application. Eastern Premier is a design concept, not a claim of a commissioned production website.

Image generation used the built-in tool. Prompts requested landscape, straight-on interface concepts with no device or live-demo footer: an ivory/charcoal/rust ODG ERP overview with inventory, quotations and invoices; and an ivory/olive Nonna Lodge front desk with reservations, rooms, guest folios, restaurant and night audit. All UI records are fictional illustrative data. The generated PNGs were optimized to 1400-pixel WebP assets for the cards.

## Release boundary

Isaac approved production publication on October 1, 2026. The production site is https://asamoahisaac.netlify.app, connected through Netlify to the `Portfolio-V3` branch. Run lint and the production build before pushing. Verify the published deploy matches the pushed commit and check the live homepage, case studies, sitemap, robots and social image.

Search metadata and linked Person, Organization, WebSite and ProfilePage structured data describe Isaac Asamoah as Founder & CEO of IJW Labs. Three server-rendered case studies provide crawlable project evidence; visible questions and answers clarify identity, services and contact. Search results and AI Overviews depend on subsequent recrawling; their wording or timing cannot be guaranteed.
