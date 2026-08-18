import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Projects" };
export const revalidate = 60;

const CATEGORIES = ["all", "web", "ai", "python", "javascript", "automation", "other"] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category ?? "all";
  const supabase = createClient();

  let query = supabase
    .from("projects")
    .select("slug, name, short_description, featured_image, technologies, category")
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (activeCategory !== "all") {
    query = query.eq("category", activeCategory);
  }

  const { data: projects } = await query;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Portfolio" title="Projects" />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === "all" ? "/projects" : `/projects?category=${cat}`}
            className={`rounded-full px-4 py-1.5 text-sm capitalize ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.slug} project={project} />)
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="No projects here yet" description="Add projects from Admin → Projects." />
          </div>
        )}
      </div>
    </section>
  );
}
