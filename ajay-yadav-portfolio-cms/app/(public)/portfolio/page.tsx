import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Portfolio" };
export const revalidate = 60;

export default async function PortfolioPage() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, name, short_description, featured_image, technologies, category")
    .eq("status", "published")
    .order("display_order", { ascending: true });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Showcase" title="Portfolio" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.slug} project={project} />)
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="Portfolio is empty" description="Add projects from Admin → Projects." />
          </div>
        )}
      </div>
    </section>
  );
}
