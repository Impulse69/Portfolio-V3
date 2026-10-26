import Image from 'next/image';
import { ArrowUpRight, Plus } from 'lucide-react';
import { awsCertification, awsRestart, programmes, courseCertificates, credentialFile } from '@/lib/credentials';
import styles from './Credentials.module.css';

export default function Credentials() {
  return (
    <section id="credentials" className={`section shell ${styles.section}`} aria-labelledby="credentials-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="section-number">04</span> CONTINUING TO LEARN</p>
          <h2 id="credentials-title">Curiosity, backed<br />by <em>practice.</em></h2>
        </div>
        <p className="section-note">Cloud certification and applied AI learning, alongside the hands-on work. Credentials from Amazon Web Services and Google.</p>
      </div>
      <div className={styles.awsGrid}>
      <article className={styles.aws} aria-labelledby="aws-title">
        <div className={styles.awsArtwork}>
          <a href={awsCertification.verification} target="_blank" rel="noopener noreferrer" aria-label="View AWS Certified Cloud Practitioner badge on Credly (opens in a new tab)">
            <Image src="/images/credentials/aws-cloud-practitioner.png" alt="Official AWS Certified Cloud Practitioner foundational badge" width={680} height={680} sizes="(max-width: 760px) 240px, 320px" />
          </a>
          <span className={styles.awsLevel}>FOUNDATIONAL / AWS CERTIFICATION</span>
        </div>
        <div className={styles.awsCopy}>
          <p className={styles.awsEyebrow}>AMAZON WEB SERVICES <span>·</span> CERTIFIED</p>
          <h3 id="aws-title">AWS Certified<br /><em>Cloud Practitioner.</em></h3>
          <p className={styles.awsDescription}>A verified foundation in the AWS Cloud: its core services, cloud concepts, security and business value.</p>
          <dl className={styles.awsDates}>
            <div><dt>Issued</dt><dd><time dateTime={awsCertification.issued}>14 October 2026</time></dd></div>
            <div><dt>Valid until</dt><dd><time dateTime={awsCertification.expires}>14 October 2029</time></dd></div>
          </dl>
          <a className={styles.awsVerify} href={awsCertification.verification} target="_blank" rel="noopener noreferrer" aria-label="Verify AWS Certified Cloud Practitioner certification on Credly (opens in a new tab)">Verify on Credly <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </article>
      <article className={styles.aws} aria-labelledby="aws-restart-title">
        <div className={styles.awsArtwork}>
          <a href={awsRestart.verification} target="_blank" rel="noopener noreferrer" aria-label="View AWS re/Start Graduate badge on Credly (opens in a new tab)">
            <Image src="/images/credentials/aws-restart-graduate.png" alt="Official AWS re/Start Graduate badge" width={680} height={680} sizes="(max-width: 760px) 240px, 280px" />
          </a>
          <span className={styles.awsLevel}>AWS RE/START / PROGRAMME GRADUATE</span>
        </div>
        <div className={styles.awsCopy}>
          <p className={styles.awsEyebrow}>AMAZON WEB SERVICES <span>·</span> GRADUATE</p>
          <h3 id="aws-restart-title">AWS re/Start<br /><em>Graduate.</em></h3>
          <p className={styles.awsDescription}>Completed the AWS re/Start programme: cloud skills development through hands-on labs, real-world scenarios and coursework.</p>
          <dl className={styles.awsDates}>
            <div><dt>Issued</dt><dd><time dateTime={awsRestart.issued}>26 October 2026</time></dd></div>
            <div><dt>Credential</dt><dd>Programme completion</dd></div>
          </dl>
          <a className={styles.awsVerify} href={awsRestart.verification} target="_blank" rel="noopener noreferrer" aria-label="Verify AWS re/Start Graduate badge on Credly (opens in a new tab)">Verify on Credly <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </article>
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
