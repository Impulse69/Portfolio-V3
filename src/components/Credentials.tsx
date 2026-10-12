import Image from 'next/image';
import { ArrowUpRight, Plus } from 'lucide-react';
import { programmes, courseCertificates, credentialFile } from '@/lib/credentials';
import styles from './Credentials.module.css';

export default function Credentials() {
  return (
    <section id="credentials" className={`section shell ${styles.section}`} aria-labelledby="credentials-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="section-number">04</span> CONTINUING TO LEARN</p>
          <h2 id="credentials-title">Curiosity, backed<br />by <em>practice.</em></h2>
        </div>
        <p className="section-note">Structured learning to complement the hands-on work. AI and prompting programmes developed by Google, completed through Coursera.</p>
      </div>
      <div className={styles.programmes}>
        {programmes.map((programme) => (
          <article key={programme.slug} className={styles.programme}>
            <div className={styles.copy}>
              <p className={styles.provider}>Google <span>/ Coursera</span></p>
              <p className={styles.category}>{programme.category}</p>
              <h3>{programme.title}</h3>
              <p className={styles.description}>{programme.description}</p>
              <div className={styles.meta}><span>{programme.scope}</span><time dateTime={programme.date}>Completed {programme.dateLabel}</time></div>
            </div>
            <a className={styles.preview} href={credentialFile(programme.slug)} target="_blank" rel="noopener noreferrer" aria-label={`View ${programme.title} certificate PDF (opens in a new tab)`}>
              <Image src={`/images/credentials/${programme.slug}.webp`} alt={`${programme.title} completion certificate awarded to Isaac Asamoah`} width={1000} height={773} sizes="(max-width: 760px) 85vw, 42vw" />
            </a>
            <div className={styles.actions}>
              <a href={programme.verification} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${programme.title} on Coursera (opens in a new tab)`}>Verify credential <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a href={credentialFile(programme.slug)} target="_blank" rel="noopener noreferrer" aria-label={`Open ${programme.title} certificate PDF (opens in a new tab)`}>Certificate PDF <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <details className={styles.courses}>
        <summary><span>Inside the learning<span className={styles.count}>6 course certificates</span></span><Plus size={20} aria-hidden="true" /></summary>
        <p className={styles.courseNote}>Individual course completions from the Google AI programme.</p>
        <ul>
          {courseCertificates.map((course) => (
            <li key={course.slug}>
              <a href={credentialFile(course.slug)} target="_blank" rel="noopener noreferrer" aria-label={`View ${course.title} certificate PDF (opens in a new tab)`}>
                <span><span className={styles.courseProvider}>GOOGLE / COURSERA</span><span className={styles.courseTitle}>{course.title}</span></span>
                <span className={styles.courseLink}>PDF <ArrowUpRight size={16} aria-hidden="true" /></span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
