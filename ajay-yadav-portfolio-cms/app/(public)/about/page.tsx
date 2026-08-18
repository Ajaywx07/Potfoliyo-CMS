import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "About Me",
  description: "Learn more about Ajay Yadav, my background, and my journey.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="About" title="About Me" />
      <EmptyState
        title="About page coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}