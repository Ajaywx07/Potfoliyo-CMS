import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Education",
  description: "My educational background and learning journey.",
};

export default function EducationPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Education" title="My Education" />
      <EmptyState
        title="Education details coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}