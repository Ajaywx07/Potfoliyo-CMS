import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Gallery" };
export const revalidate = 300;

export default async function GalleryPage() {
  const supabase = createClient();
  const { data: images } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading eyebrow="Gallery" title="Gallery" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images && images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-surface">
              <Image src={img.url} alt={img.alt_text ?? ""} fill className="object-cover" />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState title="No images uploaded yet" description="Upload from Admin → Gallery." />
          </div>
        )}
      </div>
    </section>
  );
}
