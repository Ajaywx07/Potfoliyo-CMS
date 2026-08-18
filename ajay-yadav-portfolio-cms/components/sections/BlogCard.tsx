import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { format } from "date-fns";

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  featured_image?: string | null;
  published_at: string;
  reading_time_minutes?: number;
}

export function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full">
        {post.featured_image && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-md bg-background">
            <Image
              src={post.featured_image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        )}
        <p className="text-xs text-muted">
          {format(new Date(post.published_at), "MMM d, yyyy")}
          {post.reading_time_minutes ? ` · ${post.reading_time_minutes} min read` : ""}
        </p>
        <h3 className="mt-1 font-heading text-lg font-bold">{post.title}</h3>
        <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
      </Card>
    </Link>
  );
}
