import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const STATIC_ROUTES = [
  "", "about", "journey", "skills", "web-development", "projects",
  "ai-projects", "automation", "programming", "blogger-seo", "portfolio",
  "services", "experience", "education", "certificates", "blog",
  "achievements", "tools", "gallery", "contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const supabase = createClient();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
  }));

  const { data: projects } = await supabase.from("projects").select("slug, updated_at").eq("status", "published");
  const { data: posts } = await supabase.from("posts").select("slug, updated_at").eq("status", "published");

  const projectEntries = (projects ?? []).map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
  }));

  const postEntries = (posts ?? []).map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
