import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Skills",
  description: "My technical skills and expertise.",
};

export default function SkillsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Expertise" title="My Skills" />
      <EmptyState
        title="Skills coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}