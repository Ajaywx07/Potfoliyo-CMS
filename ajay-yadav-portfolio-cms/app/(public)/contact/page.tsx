import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Contact",
  description: "Get in touch with me for inquiries and collaborations.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Contact" title="Get In Touch" />
      <EmptyState
        title="Contact form coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}