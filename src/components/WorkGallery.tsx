'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Plus, X } from 'lucide-react';
import { explorations, flagshipProjects, type PortfolioProject } from '@/lib/projects';
import styles from './WorkGallery.module.css';

const previews: Record<string, { src: string; alt: string; concept?: boolean }> = {
  odg: {
    src: '/images/work/odg-preview.webp',
    alt: 'Illustrative interface concept for ODG ERP business operations software',
    concept: true,
  },
  nonna: {
    src: '/images/work/nonna-preview.webp',
    alt: 'Illustrative interface concept for Nonna Lodge hospitality management software',
    concept: true,
  },
  eastern: {
    src: '/images/work/eastern-preview.webp',
    alt: 'Eastern Premier Hotel website concept with aerial hotel imagery',
  },
};

function ProjectPreview({ project }: { project: PortfolioProject }) {
  const preview = previews[project.id];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={styles.preview}
      aria-label={`Read ${project.title} case study`}
    >
      <Image
        src={preview.src}
        alt={preview.alt}
        fill
        sizes="(max-width: 760px) 100vw, (max-width: 1200px) 30vw, 400px"
        className={styles.previewImage}
        quality={85}
      />
      {!preview.concept && (
        <span className={styles.hotelIdentity} aria-hidden="true">
          <span>Eastern Premier</span>
          <small>Website concept</small>
        </span>
      )}
    </Link>
  );
}

export default function WorkGallery() {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = originalOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function openProject(project: PortfolioProject, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(project);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.projects}>
        {flagshipProjects.map((project) => (
          <article className={styles.card} key={project.id}>
            <ProjectPreview project={project} />
            <div className={styles.cardBody}>
              <p className={styles.category}><span>{project.number}</span>{project.category}</p>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <Link className={styles.caseStudyLink} href={`/work/${project.slug}`} aria-label={`Read ${project.title} case study`}>Read case study <ArrowUpRight size={15} /></Link>
              <button className={styles.explore} onClick={(event) => openProject(project, event.currentTarget)} aria-label={`Explore ${project.title} case study`}>
                <span>Explore project</span><span className={styles.plus}><Plus size={17} strokeWidth={1.5} /></span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.more}>
        <div className={styles.moreHeading}><ArrowDownRight size={23} strokeWidth={1.3} /><h3>More explorations</h3><p>A few other things I&apos;ve built.</p></div>
        <div className={styles.explorations}>
          {explorations.map((project) => (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className={styles.exploration}>
              <div><span>{project.category}</span><h4>{project.title}</h4></div><ArrowUpRight size={20} strokeWidth={1.4} />
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="case-study-title"
        aria-describedby="case-study-summary"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null);
          }
        }}
      >
        {selected && (
          <div className={styles.dialogContent}>
            <button ref={closeRef} className={styles.close} onClick={() => setSelected(null)} aria-label="Close case study"><X size={22} strokeWidth={1.5} /></button>
            <p className={styles.dialogEyebrow}>Selected work / {selected.number} — {selected.category}</p>
            <h2 id="case-study-title">{selected.title}</h2>
            <p id="case-study-summary" className={styles.dialogSummary}>{selected.summary}</p>
            <div className={styles.role}><span>My role</span><p>{selected.role}</p></div>
            <div className={styles.caseSections}>
              <section><h3>The brief</h3><p>{selected.brief}</p></section>
              <section><h3>The solution</h3><p>{selected.solution}</p></section>
              <section><h3>Built with</h3><ul className={styles.technologies}>{selected.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></section>
              <section><h3>What it delivered</h3><ul className={styles.outcomes}>{selected.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>
            </div>
            {selected.context && <p className={styles.context}>{selected.context}</p>}
            {selected.link && <div className={styles.projectLink}><a href={selected.link.href} target="_blank" rel="noopener noreferrer">{selected.link.label}<ArrowUpRight size={17} /><span className={styles.srOnly}> (opens in a new tab)</span></a><p>{selected.link.note}</p></div>}
          </div>
        )}
      </dialog>
    </div>
  );
}
