import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
  short_description: z.string().max(240),
  full_description: z.string().max(20000),
  category: z.enum(["web", "ai", "python", "javascript", "automation", "other"]),
  technologies: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  demo_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  display_order: z.number().int().default(0),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const postSchema = z.object({
  title: z.string().min(2).max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(300),
  content: z.string().min(1),
  category_id: z.string().uuid().optional(),
  tag_ids: z.array(z.string().uuid()).default([]),
  featured_image: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  published_at: z.string().optional(),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
  og_image: z.string().url().optional().or(z.literal("")),
});
export type PostInput = z.infer<typeof postSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(5000),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0).optional(),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const skillSchema = z.object({
  name: z.string().min(1).max(60),
  icon: z.string().max(60).optional(),
  level: z.number().int().min(0).max(100),
  category: z.string().max(60),
  description: z.string().max(300).optional(),
  display_order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});
export type SkillInput = z.infer<typeof skillSchema>;
