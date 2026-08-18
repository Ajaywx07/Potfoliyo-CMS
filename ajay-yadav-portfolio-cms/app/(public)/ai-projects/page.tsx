import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "AI Projects",
  description: "Explore my AI and machine learning projects.",
};

export default function AIProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="AI" title="AI & Machine Learning Projects" />
      <EmptyState
        title="AI Projects coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}