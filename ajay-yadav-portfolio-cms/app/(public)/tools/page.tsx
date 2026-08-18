import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Tools",
  description: "Tools, software, and technologies I use.",
};

export default function ToolsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Stack" title="Tools & Technologies" />
      <EmptyState
        title="Tools list coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}