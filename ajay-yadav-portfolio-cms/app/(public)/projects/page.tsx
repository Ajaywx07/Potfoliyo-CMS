import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Projects",
  description: "Explore all my projects and portfolio work.",
};

export const revalidate = 60; // ISR: re-fetch at most once a minute

async function getAllProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("slug, name, short_description, featured_image, technologies, category")
    .eq("status", "published")
    .order("display_order", { ascending: true });
  return data ?? [];
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Portfolio" title="All Projects" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState
              title="No projects yet"
              description="Add projects from Admin → Projects to display them here."
            />
          </div>
        )}
      </div>
    </section>
  );
}