import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Web Development" };
export const revalidate = 60;

export default async function Page() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, name, short_description, featured_image, technologies, category")
    .eq("status", "published")
    .eq("category", "web")
    .order("display_order", { ascending: true });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Web Development" title="Web Development" description="Frontend-focused, responsive websites built with modern tooling." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.slug} project={project} />)
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="Nothing published in this category yet" description="Add projects with this category from Admin → Projects." />
          </div>
        )}
      </div>
    </section>
  );
}
