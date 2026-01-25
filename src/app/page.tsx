import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Isaac',
    url: 'https://isaac.dev',
    jobTitle: 'Creative Developer',
    image: 'https://isaac.dev/og-image.jpg',
    sameAs: [
      'https://github.com',
      'https://twitter.com',
      'https://linkedin.com',
    ],
    knowsAbout: ['Web Design', 'Next.js', 'React', 'Three.js', 'WebGL', 'Creative Development'],
    description: "Creative developer bridging design and engineering to build immersive digital experiences."
  }

  return (
    <main className="relative bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Hero Scroll Container */}
      <div className="relative">
        <Overlay />
        <ScrollyCanvas />
      </div>

      {/* Projects Section */}
      <div id="work">
        <Projects />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
