import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Code2,
  Globe2,
  Layers3,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import WorkGallery from "@/components/WorkGallery";
import ContactActions from "@/components/ContactActions";
import Answers from "@/components/Answers";
import { profile, structuredData } from "@/lib/profile";

const approach = [
  {
    number: "01",
    title: "Understand the business.",
    text: "Before a line of code, we talk about the people, the everyday work, and the problem worth solving. The result is a clear scope and a shared direction.",
  },
  {
    number: "02",
    title: "Make the complex feel simple.",
    text: "I translate the requirements into a considered interface and a practical system. We review the design together, refine the details, and build around the way your team actually works.",
  },
  {
    number: "03",
    title: "Build for the real world.",
    text: "Good software has to work beyond the demo. I account for mobile screens, unreliable connections, real business records, and the small details that make everyday use easier.",
  },
  {
    number: "04",
    title: "Stay involved after launch.",
    text: "Handover is a beginning. Through IJW Labs, we help keep your website or system useful with maintenance, improvements, and a direct line to the people who built it.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section id="intro" className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-intro">
              <span className="status-dot" /> {profile.name.toUpperCase()}{" "}
              <span className="intro-divider">/</span> ACCRA, GHANA
            </div>
            <h1 id="hero-title">
              Building what
              <br />
              comes <em>next.</em>
              <Asterisk
                className="hero-asterisk"
                aria-hidden="true"
                strokeWidth={1.1}
              />
            </h1>
            <div className="hero-description">
              <p className="hero-role">
                Founder &amp; CEO of{" "}
                <a
                  href="https://ijwlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IJW Labs
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                .
              </p>
              <p>
                I turn business challenges into thoughtful websites and
                software. From the first conversation to the final detail, I
                build with purpose.
              </p>
            </div>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore my work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#contact">
                Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="mini-rule" /> FOUNDER’S MINDSET. ENGINEER’S
              PRECISION.
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-topline">
              <span>THE PERSON BEHIND THE WORK</span>
              <span>01 / IA</span>
            </div>
            <div className="portrait-image">
              <Image
                src="/images/isaac-founder.jpg"
                alt={`${profile.name}, founder and CEO of IJW Labs, in Accra`}
                fill
                priority
                sizes="(max-width: 760px) 90vw, (max-width: 1100px) 43vw, 500px"
                quality={90}
              />
              <div className="portrait-caption">
                <span>{profile.name}</span>
                <span>Founder &amp; software engineer</span>
              </div>
              <div className="portrait-index" aria-hidden="true">
                IA.
              </div>
            </div>
            <div className="portrait-bottomline">
              <span>BASED IN GHANA</span>
              <span>
                BUILDING BEYOND BORDERS{" "}
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </div>
          </div>
        </section>
        <div className="discipline-strip shell" aria-label="Areas of work">
          <span>
            BUSINESS FIRST.
            <br />
            <strong>TECHNOLOGY WITH PURPOSE.</strong>
          </span>
          <div>
            <span>Web experiences</span>
            <Asterisk aria-hidden="true" />
            <span>Business systems</span>
            <Asterisk aria-hidden="true" />
            <span>Product development</span>
          </div>
        </div>
        <section
          id="work"
          className="work-section section shell"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">01</span> SELECTED WORK
              </p>
              <h2 id="work-title">
                Real businesses.
                <br />
                <em>Considered solutions.</em>
              </h2>
            </div>
            <p className="section-note">
              A selection of websites and systems I’ve built for the people
              running the business.
            </p>
          </div>
          <WorkGallery />
        </section>
        <section
          id="studio"
          className="studio-section"
          aria-labelledby="studio-title"
        >
          <div className="shell studio-inner">
            <div className="studio-copy">
              <p className="eyebrow">
                <span className="section-number">02</span> THE COMPANY I’M
                BUILDING
              </p>
              <h2 id="studio-title">
                A bigger vision.
                <br />A shared <em>standard.</em>
              </h2>
              <p>
                I founded IJW Labs to help businesses look professional
                online and run better behind the scenes.
              </p>
              <p>
                Based in Accra, we bring web development, business systems, and
                creative production together. I lead our technical direction and
                development, alongside co-founders Judah Amanor Tetteh and
                Wisdom Dzanado.
              </p>
              <a
                className="button button-light"
                href="https://ijwlabs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meet IJW Labs <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <a
              className="studio-identity"
              href="https://ijwlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit IJW Labs, web and systems development in Accra"
            >
              <div className="studio-card-top">
                <span>
                  INDEPENDENT THINKING.
                  <br />
                  SHARED AMBITION.
                </span>
                <ArrowUpRight size={25} aria-hidden="true" />
              </div>
              <div className="studio-wordmark">
                ijw<span>labs</span>
                <Asterisk strokeWidth={1} aria-hidden="true" />
              </div>
              <div className="studio-card-bottom">
                <span>
                  WEB &amp; SYSTEMS
                  <br />
                  DEVELOPMENT
                </span>
                <span>
                  ACCRA, GHANA
                  <br />
                  EST. WITH PURPOSE
                </span>
              </div>
            </a>
          </div>
          <div className="shell studio-services">
            <span>
              <Globe2 size={18} aria-hidden="true" /> Websites that earn their
              place.
            </span>
            <span>
              <Layers3 size={18} aria-hidden="true" /> Systems that simplify the
              day.
            </span>
            <span>
              <Asterisk size={18} aria-hidden="true" /> Creative work with
              intention.
            </span>
          </div>
        </section>
        <section
          id="about"
          className="about-section section shell"
          aria-labelledby="about-title"
        >
          <div className="about-left">
            <p className="eyebrow">
              <span className="section-number">03</span> A LITTLE ABOUT ME
            </p>
            <div className="about-photo">
              <Image
                src="/Isaac Asamoah.png"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 760px) 90vw, 380px"
                quality={85}
              />
              <span className="photo-note">THE HUMAN SIDE OF THE BUILD.</span>
            </div>
          </div>
          <div className="about-copy">
            <h2 id="about-title">
              I care about the why.
              <br />
              Then I build <em>the how.</em>
            </h2>
            <p className="about-lead">
              I’m Isaac. A founder, a hands-on engineer, and someone who
              believes good technology should make life less complicated.
            </p>
            <p>
              My work spans business websites, full-stack applications, and
              software for everyday operations. I’ve worked directly with
              clients in Ghana, taking projects from an early idea to the
              systems they use in their businesses.
            </p>
            <p>
              Running a company shapes how I build. I think about the budget,
              the people using the product, and what happens after launch. The
              interface matters. So does the business behind it.
            </p>
            <div className="about-signature">Isaac.</div>
            <div className="about-facts">
              <div>
                <span>MY BASE</span>
                <strong>Accra, Ghana</strong>
              </div>
              <div>
                <span>MY ROLE</span>
                <strong>Founder &amp; CEO</strong>
              </div>
              <div>
                <span>MY COMPANY</span>
                <a
                  href="https://ijwlabs.com/founders/isaac-asamoah/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IJW Labs <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="approach"
          className="approach-section section shell"
          aria-labelledby="approach-title"
        >
          <div className="approach-intro">
            <p className="eyebrow">
              <span className="section-number">04</span> HOW I WORK
            </p>
            <h2 id="approach-title">
              Good work starts
              <br />
              with <em>good questions.</em>
            </h2>
            <p>A clear process. Open conversations. Care at every stage.</p>
            <div className="approach-symbol" aria-hidden="true">
              <Asterisk strokeWidth={0.6} />
            </div>
          </div>
          <div className="approach-steps">
            {approach.map((step, i) => (
              <details key={step.number} name="approach" open={i === 0}>
                <summary>
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <span className="step-toggle" aria-hidden="true" />
                </summary>
                <p>{step.text}</p>
              </details>
            ))}
          </div>
        </section>
        <Answers />

        <section className="toolkit shell" aria-labelledby="toolkit-title">
          <div>
            <Code2 size={20} aria-hidden="true" />
            <h2 id="toolkit-title">The tools follow the problem.</h2>
          </div>
          <p>
            Laravel <span>/</span> React &amp; Next.js <span>/</span> TypeScript{" "}
            <span>/</span> Electron <span>/</span> MySQL &amp; SQLite
          </p>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="shell">
            <div className="contact-top">
              <p className="eyebrow">
                <span className="section-number">05</span> LET’S BUILD SOMETHING
                WORTHWHILE
              </p>
              <span className="contact-location">
                ACCRA, GHANA <span className="status-dot" />
              </span>
            </div>
            <div className="contact-main">
              <h2 id="contact-title">
                Your next chapter
                <br />
                starts with <em>a hello.</em>
              </h2>
              <a
                className="contact-arrow"
                href={`mailto:${profile.email}`}
                aria-label="Email Isaac about your project"
              >
                <ArrowUpRight strokeWidth={1} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-bottom">
              <p>
                A business to grow. A system to simplify.
                <br />
                An idea you can’t stop thinking about. Let’s talk.
              </p>
              <ContactActions />
            </div>
            <footer className="footer">
              <a className="brand footer-brand" href="#main">
                ia<span>.</span>
              </a>
              <span>© {new Date().getUTCFullYear()} {profile.name}</span>
              <div>
                <a
                  href="https://github.com/Impulse69"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a
                  href="https://ijwlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IJW Labs <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
              <a className="back-top" href="#main">
                BACK TO TOP <ArrowRight size={14} aria-hidden="true" />
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
