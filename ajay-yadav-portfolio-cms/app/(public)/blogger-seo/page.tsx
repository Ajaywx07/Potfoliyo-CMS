import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/sections/BlogCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Blogger & SEO" };
export const revalidate = 60;

export default async function BloggerSeoPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, excerpt, featured_image, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Blogging & SEO"
        title="Blogger & SEO"
        description="Content creation, search optimization, and blog projects."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts && posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="No posts yet" description="Publish a post from Admin → Blog." />
          </div>
        )}
      </div>
    </section>
  );
}
