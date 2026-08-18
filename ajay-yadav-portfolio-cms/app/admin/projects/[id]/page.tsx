import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single();
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Edit Project</h1>
      <div className="mt-6">
        <ProjectForm
          initial={{
            id: project.id,
            name: project.name,
            slug: project.slug,
            short_description: project.short_description,
            full_description: project.full_description,
            category: project.category,
            technologies: (project.technologies ?? []).join(", "),
            demo_url: project.demo_url ?? "",
            github_url: project.github_url ?? "",
            status: project.status,
            featured: project.featured,
          }}
        />
      </div>
    </div>
  );
}
