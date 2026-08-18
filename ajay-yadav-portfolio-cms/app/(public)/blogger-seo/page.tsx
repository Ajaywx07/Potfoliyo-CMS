import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Blogger SEO",
  description: "SEO optimization tips and strategies for Blogger blogs.",
};

export default function BloggerSeoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="SEO" title="Blogger SEO Strategies" />
      <EmptyState
        title="Blogger SEO content coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}