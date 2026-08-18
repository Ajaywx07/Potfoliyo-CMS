import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "My Journey",
  description: "My professional journey, milestones, and growth story.",
};

export default function JourneyPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Journey" title="My Professional Journey" />
      <EmptyState
        title="Journey details coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}