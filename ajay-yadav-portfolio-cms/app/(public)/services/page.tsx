import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Services",
  description: "Services I offer for businesses and clients.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Services" title="What I Offer" />
      <EmptyState
        title="Services coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}