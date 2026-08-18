import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Gallery",
  description: "Photo gallery and visual portfolio.",
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Gallery" title="Photo Gallery" />
      <EmptyState
        title="Gallery coming soon"
        description="This page is currently under development. Check back soon!"
      />
    </section>
  );
}