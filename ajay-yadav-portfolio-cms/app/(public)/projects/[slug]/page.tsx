import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

async function getProject(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(url, alt_text, display_order)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.short_description,
    openGraph: {
      title: project.name,
      description: project.short_description,
      images: project.featured_image ? [project.featured_image] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <span className="text-xs font-medium uppercase text-accent">{project.category}</span>
      <h1 className="mt-1 font-heading text-3xl font-bold sm:text-4xl">{project.name}</h1>
      <p className="mt-3 text-muted">{project.short_description}</p>

      {project.featured_image && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
          <Image src={project.featured_image} alt={project.name} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <p>{project.full_description}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm text-white">
            Live Demo
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 text-sm">
            Source Code
          </a>
        )}
      </div>
    </article>
  );
}
