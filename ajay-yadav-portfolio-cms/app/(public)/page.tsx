import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // ISR: re-fetch at most once a minute

async function getFeaturedProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("slug, name, short_description, featured_image, technologies, category")
    .eq("status", "published")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(3);
  return data ?? [];
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <Hero
        name="Ajay Yadav"
        headline="Web Developer · Frontend Engineer · Python · SEO · AI/Automation"
        description="I build clean, fast, responsive websites and experiment with AI-assisted automation. Currently learning and shipping in public."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading eyebrow="Portfolio" title="Featured Projects" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyState
                title="No featured projects yet"
                description="Add and feature a project from Admin → Projects to show it here."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
