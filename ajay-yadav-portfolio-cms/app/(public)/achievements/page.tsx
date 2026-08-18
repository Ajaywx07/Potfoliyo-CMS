import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Achievements",
  description: "My accomplishments, awards, and milestones.",
};

export default function AchievementsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Achievements" title="My Accomplishments" />
      <EmptyState
        title="Achievements coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}