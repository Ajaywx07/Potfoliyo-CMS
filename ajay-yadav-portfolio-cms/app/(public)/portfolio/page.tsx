import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Portfolio",
  description: "My complete portfolio of work and projects.",
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Portfolio" title="My Work" />
      <EmptyState
        title="Portfolio projects coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}