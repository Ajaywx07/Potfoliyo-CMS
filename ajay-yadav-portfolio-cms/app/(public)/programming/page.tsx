import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Programming",
  description: "My programming skills, projects, and code samples.",
};

export default function ProgrammingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Development" title="Programming Projects" />
      <EmptyState
        title="Programming projects coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}