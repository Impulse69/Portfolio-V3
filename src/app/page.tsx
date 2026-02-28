'use client';

import { useState, useEffect } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lock scroll when loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoaded]);

  const handleProgress = (progress: number) => {
    setLoadingProgress(progress);
    if (progress >= 100) {
      // Small delay for smooth exit of loader
      setTimeout(() => setIsLoaded(true), 1000);
    }
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://asamoahisaac.netlify.app/#person',
    name: 'Isaac Asamoah Junior',
    alternateName: ['Isaac Asamoah Jr', 'IKE', 'Impulse69'],
    url: 'https://asamoahisaac.netlify.app',
    jobTitle: 'Creative Developer',
    image: 'https://asamoahisaac.netlify.app/og-image.jpg',
    nationality: {
      '@type': 'Country',
      name: 'Ghana',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GH',
      addressRegion: 'Ghana, West Africa',
    },
    email: 'juniorike69@gmail.com',
    sameAs: [
      'https://github.com/Impulse69',
      'https://twitter.com/isaac_asamoah_jr',
      'https://linkedin.com/in/isaacasamoahjunior',
    ],
    knowsAbout: [
      'Web Development', 'Next.js', 'React', 'TypeScript', 'JavaScript',
      'Tailwind CSS', 'Kotlin', 'Android Development', 'UI/UX Design',
      'Creative Development', 'Full-Stack Development',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Creative Developer',
      occupationLocation: { '@type': 'Country', name: 'Ghana' },
      skills: 'Next.js, React, TypeScript, Tailwind CSS, Kotlin, Android, UI/UX Design',
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Web Development & Creative Development Services',
        description: 'Building immersive, high-performance web applications and creative digital experiences.',
      },
    },
    description: 'Isaac Asamoah Junior is a Creative Developer from Ghana who bridges design and engineering to build immersive digital experiences. Specializing in Next.js, React, TypeScript, and modern web technologies.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Isaac Asamoah Junior — Creative Developer',
    url: 'https://asamoahisaac.netlify.app',
    author: { '@id': 'https://asamoahisaac.netlify.app/#person' },
    description: 'Portfolio of Isaac Asamoah Junior — a Creative Developer from Ghana building immersive digital experiences.',
  }

  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': 'https://asamoahisaac.netlify.app/#person' },
    dateCreated: '2026-01-20',
    dateModified: '2026-02-11',
  }

  return (
    <main className={`relative bg-[#0a0a0f] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Loader progress={loadingProgress} isLoaded={isLoaded} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <Navigation />

      <div className="relative">
        <Overlay />
        <ScrollyCanvas onProgress={handleProgress} />
      </div>

      <div id="work">
        <Projects />
      </div>

      <About />

      <Footer />
    </main>
  );
}
