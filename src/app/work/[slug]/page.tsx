import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { flagshipProjects } from '@/lib/projects';
import { person, profile } from '@/lib/profile';
import styles from './case-study.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return flagshipProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = flagshipProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  const title = `${project.title} — ${project.category} case study`;
  const url = `${profile.url}/work/${project.slug}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${profile.name}`, description: project.summary, url, type: 'article', images: [{ url: `${profile.url}/opengraph-image`, width: 1200, height: 630, alt: `${profile.name}, Founder & CEO of IJW Labs` }] },
    twitter: { card: 'summary_large_image', title: `${title} | ${profile.name}`, description: project.summary, images: [`${profile.url}/opengraph-image`] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = flagshipProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  const url = `${profile.url}/work/${project.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CreativeWork', '@id': `${url}#case-study`, url, name: `${project.title} case study`, description: project.summary, author: { '@id': person['@id'] }, inLanguage: 'en', keywords: [project.category, ...project.technologies] },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: profile.name, item: profile.url },
        { '@type': 'ListItem', position: 2, name: project.title, item: url },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <header className={styles.header}>
        <Link href="/" className={styles.identity}>{profile.name}<span>Founder & CEO · IJW Labs</span></Link>
        <Link href="/#work">Back to selected work ↗</Link>
      </header>
      <main id="main" className={styles.main}>
        <article>
          <p className={styles.eyebrow}>Selected work / {project.number} — {project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <dl className={styles.role}><dt>My role</dt><dd>{project.role}</dd></dl>
          <div className={styles.sections}>
            <section aria-labelledby="brief"><h2 id="brief">The brief</h2><p>{project.brief}</p></section>
            <section aria-labelledby="solution"><h2 id="solution">The solution</h2><p>{project.solution}</p></section>
            <section aria-labelledby="stack"><h2 id="stack">Built with</h2><ul className={styles.stack}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></section>
            <section aria-labelledby="outcomes"><h2 id="outcomes">What it delivered</h2><ul className={styles.outcomes}>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>
          </div>
          {project.context && <p className={styles.context}>{project.context}</p>}
          {project.link && <div className={styles.external}><a href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.label}<ArrowUpRight size={17} /><span className={styles.srOnly}> (opens in a new tab)</span></a><p>{project.link.note}</p></div>}
        </article>
        <aside className={styles.more} aria-label="Other case studies">
          <h2>More selected work</h2>
          {flagshipProjects.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/work/${item.slug}`}>{item.title}<ArrowUpRight size={18} /></Link>)}
        </aside>
      </main>
      <footer className={styles.footer}><p>Have a business challenge to solve?</p><Link href="/#contact">Let’s talk <ArrowUpRight size={18} /></Link></footer>
    </>
  );
}
