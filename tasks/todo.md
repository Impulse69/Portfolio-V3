# Founder portfolio rebuild

## Brief
Rebuild the portfolio around Isaac Asamoah, Founder & CEO of IJW Labs. Use an editorial, premium visual identity: ivory paper, deep ink, olive accents, expressive serif typography, authentic portrait photography, and thoughtful two-dimensional motion. Remove the WebGL/3D experience and loading gate. Keep the existing Next.js platform and canonical URL. Production publication approved October 1, 2026, after local review.

## Plan
### Eastern Premier replacement
- [x] Verify Eastern Premier source and replace the Freden card, case study and answer text.
- [x] Verify build, image and route; publish the replacement and confirm production.

Eastern Premier source and live concept verified; replaced shared project data, preview asset/overlay, visible answers and generated route/sitemap. Stack is HTML, CSS, JavaScript and Netlify; booking form identified as a demonstration. Lint, production build/TypeScript and diff checks passed. Production publication follows the existing release authorization.

### Image-led project cards
- [x] Find authentic project preview assets; use clearly identified concepts where needed.
- [x] Replace graphic panels with landscape image cards and restrained hover treatment.
- [x] Verify responsive layout, image loading, case-study interactions and build.

Direction: use large visual previews with softly rounded corners, no live-demo footer strip, and retain the approved project facts and crawlable links.

Validation: generated ODG and Nonna interface concepts plus the existing Freden website concept terrace asset, compressed to WebP. Replaced tall artwork with 16:10 image links, concept labels and subtle hover scaling. Lint, production build/TypeScript and whitespace checks passed. Browser confirms all images load, narrow layout has no overflow, and Nonna dialog opens/closes correctly. Production release follows the user's existing publication authorization.

- [x] Inspect repository, assets, professional references, and the official IJW Labs website.
- [x] Check in with the design direction before implementation.
- [x] Build new responsive navigation, founder introduction, work, studio, approach, and contact sections.
- [x] Write grounded project stories with accessible, working interactions.
- [x] Replace creative-developer metadata, structured data, and social preview artwork with founder positioning.
- [x] Remove obsolete 3D components and dependencies.
- [x] Verify lint, TypeScript, production build, rendered metadata, desktop and mobile behavior.
- [x] Open local preview for user review and document results.

## Review
### SEO, AEO and approved production release
- [x] Audit production site identity, hosting configuration and current official search guidance.
- [x] Add crawlable, server-rendered project case studies with unique metadata and internal links.
- [x] Improve identity metadata, structured data and visible factual answers.
- [x] Verify lint, types, production build, crawlability, routes and browser behavior.
- [x] Commit/push under the user's Git identity and deploy to the existing production site.
- [x] Verify deployed revision, live routes, metadata, sitemap, robots, images and contact.

User explicitly authorized production publication after local design and content review. Earlier no-deploy boundary is superseded by this request.

Release validation: ESLint, production build and TypeScript passed; diff whitespace check passed. All four pages contain one H1, valid JSON-LD and their canonical URLs, without public name suffixes or noindex. Homepage includes server-rendered answers and three case-study links. Sitemap lists four pages; robots permits crawling. Local case-study navigation, verified Nonna stack, layout without overflow, social image and invalid-slug 404 passed. Existing Netlify site is connected to this repository and branch. Previous published deploy: `6a6a8eb5d4354300083ed480`, commit `96199689f8d6e994d6d6c4fbe347914525f8ebcb`.

Production proof: pushed release `af1bde5ffceb557396ccb38dcdfd093fafe110d4`, attributed to Isaac Asamoah through his GitHub noreply identity. Netlify deploy `6abe425f74e8bf0008bd0c7f` reached ready in production and became the site's published deploy at `https://asamoahisaac.netlify.app`. Live HTTP checks passed for all four content pages, sitemap, robots, social image, icon and founder portrait; invalid case study returns 404. Browser confirms founder identity, crawlable links, visible answers, loaded portraits, company email links and no horizontal overflow or console errors. Google guidance confirms normal SEO foundations apply to AI search; recrawling and resulting descriptions remain search-engine controlled.

### Replace highlighted explorations
- [x] Verify two replacement projects and public links.
- [x] Replace Presscraft & Logistics and UniHostel Booking.
- [x] Verify build and rendered exploration links locally; no deployment.

Validation: lint and production build (including TypeScript) passed. Browser-rendered exploration labels and hrefs match both replacements, and the two middle projects remain. Local preview refreshed. Nothing pushed or deployed.

Replacements: ScoutingReport Africa (football scouting platform), verified through its source canonical and live `https://scoutingreportafrica.com` homepage; RentFlow (desktop rental software, source code), verified through the local README and accessible public `https://github.com/Impulse69/Rentflow-app` repository. Portfolio Builder and ExpenseTracker retained.

### Nonna Lodge correction
- [x] Verify the application stack and hospitality workflows from implementation evidence.
- [x] Correct the project story and artwork labels.
- [x] Rebuild and verify the local case study without deployment.

Validation: lint, production build (including TypeScript) and diff checks passed. The local browser's Nonna Lodge dialog shows hospitality management, the verified stack and actual hotel modules; rental, cashbook, Prisma and SMS provider references are absent from the portfolio source. Local preview remains open on the corrected dialog. Nothing pushed or deployed.

Implementation evidence: `C:/Users/User/Hotel-gig/docs/superpowers/specs/2026-07-12-electron-rebuild-design.md` identifies the Nonna Lodge PMS rebuild. `app/package.json`, `app/src/main/index.ts`, `app/src/main/server/index.ts`, `app/src/main/server/db/index.ts`, `app/src/main/server/db/schema.ts` and `app/src/main/print.ts` verify Electron, React, TypeScript, Tailwind CSS, Fastify, Drizzle ORM, SQLite, LAN workstations, hospitality workflows and print/PDF output. Removed unsupported Prisma, SMS provider, cashbook and Python/Flet replacement claims. Root Python files are the earlier implementation; Rentflow is a separate event-rental product.

Completed October 1, 2026. Local production preview: http://localhost:3000.

- New founder-first editorial page: portrait hero, selected client projects with native dialogs, IJW Labs feature, biography, approach accordion, and email/contact links.
- Founder role verified against IJW Labs' live company and founder pages. Project details come from previously supplied professional references; they were not independently reconfirmed with clients during this rebuild.
- Founder title, descriptions, canonical URL, generated social image, Google verification, and linked Person/Organization/ProfilePage schema verified in server-rendered HTML.
- Social image, SVG icon, sitemap and robots routes return HTTP 200. No missing images or canvas elements found in rendered browser checks.
- `npm.cmd run lint`, `npx.cmd tsc --noEmit`, `npm.cmd run build` and `git diff --check` passed.
- Browser verified: desktop visual layout; narrow mobile layout with no horizontal overflow; mobile menu click, keyboard Tab order, Escape and focus restoration; ODG case-study dialog opening, initial focus, Escape close, scroll unlock and focus restoration; exclusive approach accordion; copy-email success feedback. No browser error/warning logs found in inspected preview.
- Replaced old 3D components and removed 62 obsolete dependency packages. Unused legacy public frame assets remain on disk but are not referenced or requested by the rebuilt site. Automatic approval review blocked recursive removal of that unused directory; no further removal was attempted.
- Review found a critical advisory in the pre-existing Next.js 16.1.4 dependency. Upgraded Next.js and matching eslint-config-next to pinned 16.3.8 and revalidated. npm audit now reports no critical issue and no flagged Next.js dependency. Nine other dependency advisories remain (one low, two moderate, six high); broad dependency remediation was outside this redesign.
- No commit, push, deployment, external contact message, or form submission. Search and AI Overview changes require a later approved deployment and recrawl; local edits do not change the live site or guarantee search wording.
