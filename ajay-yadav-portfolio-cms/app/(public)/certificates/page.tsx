import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Certificates" };
export const revalidate = 300;

export default async function CertificatesPage() {
  const supabase = createClient();
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading eyebrow="Credentials" title="Certificates" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates && certificates.length > 0 ? (
          certificates.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-border bg-surface p-4">
              {cert.file_url && (
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-md bg-background">
                  <Image src={cert.file_url} alt={cert.title} fill className="object-cover" />
                </div>
              )}
              <h3 className="font-heading font-bold">{cert.title}</h3>
              <p className="text-sm text-muted">{cert.issuer} · {cert.date}</p>
              {cert.verify_url && (
                <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-accent">
                  Verify credential
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="No certificates uploaded yet" description="Upload from Admin → Certificates." />
          </div>
        )}
      </div>
    </section>
  );
}
