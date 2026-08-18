import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Experience",
  description: "My professional experience and work history.",
};

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Experience" title="My Work Experience" />
      <EmptyState
        title="Experience details coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}