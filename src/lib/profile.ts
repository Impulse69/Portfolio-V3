export const profile = {
  name: "Isaac Asamoah",
  title: "Founder & CEO, IJW Labs",
  email: "ijwlabs2026@gmail.com",
  url: "https://asamoahisaac.netlify.app",
  companyUrl: "https://ijwlabs.com",
  description: "Isaac Asamoah, Founder & CEO of IJW Labs in Accra, Ghana. Explore websites, business software and hospitality systems built for real client operations.",
  socials: {
    github: "https://github.com/Impulse69",
  },
} as const;

export const profileTitle = `${profile.name} | ${profile.title}`;
export const siteUrl = (path: string = "/") => new URL(path, `${profile.url}/`).toString();
export const companyUrl = (path: string = "/") => new URL(path, `${profile.companyUrl}/`).toString();

export const person = {
  "@type": "Person",
  "@id": siteUrl('/#person'),
  name: profile.name,
  url: profile.url,
  jobTitle: "Founder & CEO",
  description: profile.description,
  email: profile.email,
  worksFor: { "@id": companyUrl('/#organization') },
  knowsAbout: ["Business software", "Web development", "Hospitality management software", "Software entrepreneurship"],
  image: siteUrl('/images/isaac-founder.jpg'),
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  sameAs: [...Object.values(profile.socials), companyUrl('/founders/isaac-asamoah/')],
};

export const organization = {
  "@type": "Organization",
  "@id": companyUrl('/#organization'),
  name: "IJW Labs",
  url: profile.companyUrl,
  description: "Web and business software development company based in Accra, Ghana.",
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  founder: [
    { "@id": person["@id"] },
    { "@type": "Person", name: "Judah Amanor Tetteh", jobTitle: "Co-founder & COO", url: `${profile.companyUrl}/founders/judah-b-amanor/` },
    { "@type": "Person", name: "Wisdom Dzanado", jobTitle: "Co-founder & Creative Director", url: `${profile.companyUrl}/founders/wisdom-dzanado/` },
  ],
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    organization,
    {
      "@type": "WebSite",
      "@id": siteUrl('/#website'),
      url: profile.url,
      name: profile.name,
      description: profile.description,
      author: { "@id": person["@id"] },
      inLanguage: "en-GH",
    },
    {
      "@type": "ProfilePage",
      "@id": siteUrl('/#profile'),
      url: profile.url,
      name: profileTitle,
      description: profile.description,
      inLanguage: "en-GH",
      mainEntity: { "@id": person["@id"] },
      isPartOf: { "@id": siteUrl('/#website') },
      dateModified: "2026-10-01",
    },
  ],
};
