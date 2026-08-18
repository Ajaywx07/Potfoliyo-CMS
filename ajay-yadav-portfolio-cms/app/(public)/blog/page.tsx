import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Blog",
  description: "Articles, insights, and tutorials about web development and technology.",
};

export const revalidate = 60; // ISR: re-fetch at most once a minute

async function getBlogPosts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(10);
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Blog" title="Articles & Insights" />
      {posts.length > 0 ? (
        <div className="mt-10 space-y-6">
          {posts.map((post: any) => (
            <article key={post.id} className="border-b pb-6">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="mt-2 text-muted">{post.excerpt}</p>
              <p className="mt-4 text-sm text-muted">Published on {new Date(post.published_at).toLocaleDateString()}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No blog posts yet"
          description="Check back soon for articles and insights!"
        />
      )}
    </section>
  );
}