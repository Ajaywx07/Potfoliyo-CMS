import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Automation Projects",
  description: "Discover my automation and scripting projects.",
};

export default function AutomationPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Automation" title="Automation & Scripting" />
      <EmptyState
        title="Automation projects coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}