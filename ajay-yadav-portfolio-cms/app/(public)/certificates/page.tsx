import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Certificates",
  description: "My professional certifications and credentials.",
};

export default function CertificatesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Credentials" title="Certificates & Credentials" />
      <EmptyState
        title="Certificates coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}