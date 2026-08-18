import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Web Development",
  description: "Web development services and expertise.",
};

export default function WebDevelopmentPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Services" title="Web Development" />
      <EmptyState
        title="Web development details coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}