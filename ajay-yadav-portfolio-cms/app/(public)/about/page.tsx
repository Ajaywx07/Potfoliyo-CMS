import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About",
  description: "About Ajay Yadav — web developer and technologist.",
};

export const revalidate = 300;

export default async function AboutPage() {
  const supabase = createClient();
  const { data: profile } = await supabase.from("profile").select("*").single();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeading eyebrow="About Me" title="My Story" />
      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
        <p>
          {profile?.bio ??
            "Add your professional story, journey, interests, and goals from Admin → About. This is placeholder content until then."}
        </p>
      </div>
    </section>
  );
}
