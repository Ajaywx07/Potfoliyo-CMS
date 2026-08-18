import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/sections/SkillCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Skills" };
export const revalidate = 300;

export default async function SkillsPage() {
  const supabase = createClient();
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true });

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading
        eyebrow="Skills"
        title="Technical Skills"
        description="Levels are self-assessed, not externally verified."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {skills && skills.length > 0 ? (
          skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
        ) : (
          <div className="sm:col-span-2">
            <EmptyState title="No skills added yet" description="Add skills from Admin → Skills." />
          </div>
        )}
      </div>
    </section>
  );
}
