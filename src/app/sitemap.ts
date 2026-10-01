import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";
import { flagshipProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: profile.url,
    lastModified: "2026-10-01",
    changeFrequency: "monthly",
    priority: 1,
  }, ...flagshipProjects.map((project) => ({
    url: `${profile.url}/work/${project.slug}`,
    lastModified: "2026-10-01",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))];
}
