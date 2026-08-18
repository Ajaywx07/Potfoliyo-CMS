import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = createClient();

  const [
    projectsTotal, projectsPublished, projectsDraft,
    postsTotal, postsPublished, postsDraft,
    messages, certificates, gallery, services, skills,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("certificates").select("id", { count: "exact", head: true }),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("skills").select("id", { count: "exact", head: true }),
  ]);

  return {
    projectsTotal: projectsTotal.count ?? 0,
    projectsPublished: projectsPublished.count ?? 0,
    projectsDraft: projectsDraft.count ?? 0,
    postsTotal: postsTotal.count ?? 0,
    postsPublished: postsPublished.count ?? 0,
    postsDraft: postsDraft.count ?? 0,
    newMessages: messages.count ?? 0,
    certificates: certificates.count ?? 0,
    gallery: gallery.count ?? 0,
    services: services.count ?? 0,
    skills: skills.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const stats = await getCounts();

  const cards = [
    { label: "Total Projects", value: stats.projectsTotal },
    { label: "Published Projects", value: stats.projectsPublished },
    { label: "Draft Projects", value: stats.projectsDraft },
    { label: "Total Posts", value: stats.postsTotal },
    { label: "Published Posts", value: stats.postsPublished },
    { label: "Draft Posts", value: stats.postsDraft },
    { label: "New Messages", value: stats.newMessages },
    { label: "Certificates", value: stats.certificates },
    { label: "Gallery Images", value: stats.gallery },
    { label: "Services", value: stats.services },
    { label: "Skills", value: stats.skills },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs text-muted">{card.label}</p>
            <p className="mt-1 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
