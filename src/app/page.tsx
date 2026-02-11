import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Isaac Asamoah Junior',
    url: 'https://isaacasamoahjunior.com',
    jobTitle: 'Creative Developer',
    image: 'https://isaacasamoahjunior.com/og-image.jpg',
    sameAs: [
      'https://github.com/isaacasamoahjunior',
      'https://twitter.com/isaac_asamoah_jr',
      'https://linkedin.com/in/isaacasamoahjunior',
    ],
    knowsAbout: ['Web Design', 'Next.js', 'React', 'Three.js', 'WebGL', 'Creative Development'],
    description: "Isaac Asamoah Junior is a Creative Developer bridging design and engineering to build immersive digital experiences."
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

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </main>
  );
}
