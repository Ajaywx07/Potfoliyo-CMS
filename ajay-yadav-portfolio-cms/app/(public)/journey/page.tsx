import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "My Journey" };
export const revalidate = 300;

export default async function JourneyPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("journey_items")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeading eyebrow="Timeline" title="My Journey" />
      <div className="mt-10 space-y-8 border-l border-border pl-6">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              <p className="text-xs text-muted">{item.date}</p>
              <h3 className="font-heading font-bold">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))
        ) : (
          <EmptyState title="No journey entries yet" description="Add milestones from Admin → Journey." />
        )}
      </div>
    </section>
  );
}
