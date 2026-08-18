import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : [],
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-muted">{format(new Date(post.published_at), "MMMM d, yyyy")}</p>
      <h1 className="mt-1 font-heading text-3xl font-bold sm:text-4xl">{post.title}</h1>

      {post.featured_image && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
          <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {/* NOTE: content is stored as Tiptap JSON in the DB; render via a
          JSON-to-HTML renderer (e.g. @tiptap/html) here in production.
          Rendered as plain text for now to avoid unsafely injecting HTML. */}
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <p>{typeof post.content === "string" ? post.content : "Post content"}</p>
      </div>
    </article>
  );
}
