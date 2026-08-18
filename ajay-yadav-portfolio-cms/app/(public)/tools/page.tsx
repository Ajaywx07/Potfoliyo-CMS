import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Tools & Technologies" };
export const revalidate = 300;

export default async function Page() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("tools")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow="Tools & Technologies" title="Tools & Technologies" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items && items.length > 0 ? (
          items.map((item: any) => (
            <div key={item.id} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="font-heading font-bold">{item.name}</h3><p className="mt-1 text-sm text-muted">{item.description}</p>
            </div>
          ))
        ) : (
          <div className="sm:col-span-2">
            <EmptyState title="No tools added yet — add from Admin → Tools." />
          </div>
        )}
      </div>
    </section>
  );
}
