import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { AdminProjectRow } from "@/components/admin/AdminProjectRow";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .is("deleted_at", null)
    .order("display_order", { ascending: true });

  if (searchParams.search) query = query.ilike("name", `%${searchParams.search}%`);
  if (searchParams.status) query = query.eq("status", searchParams.status);

  const { data: projects } = await query;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      <form className="mt-4 flex gap-2" method="get">
        <input
          name="search"
          placeholder="Search projects..."
          defaultValue={searchParams.search}
          className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <select name="status" defaultValue={searchParams.status ?? ""} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <Button type="submit" variant="outline" size="sm">Filter</Button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        {projects && projects.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <AdminProjectRow key={project.id} project={project} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6">
            <EmptyState title="No projects yet" description="Click Add Project to create your first one." />
          </div>
        )}
      </div>
    </div>
  );
}
