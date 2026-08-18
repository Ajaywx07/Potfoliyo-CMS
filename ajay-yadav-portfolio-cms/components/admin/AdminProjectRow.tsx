"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function AdminProjectRow({ project }: { project: any }) {
  const router = useRouter();
  const { show } = useToast();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Move "${project.name}" to Trash?`)) return;
    setDeleting(true);
    const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    setDeleting(false);
    if (!res.ok) {
      show("Could not delete project.", "error");
      return;
    }
    show("Moved to Trash.");
    router.refresh();
  }

  return (
    <tr className="border-t border-border">
      <td className="px-4 py-3 font-medium">{project.name}</td>
      <td className="px-4 py-3 capitalize text-muted">{project.category}</td>
      <td className="px-4 py-3">
        <span
          className={clsx(
            "rounded-full px-2 py-0.5 text-xs",
            project.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          )}
        >
          {project.status}
        </span>
      </td>
      <td className="px-4 py-3 text-muted">{project.featured ? "Yes" : "—"}</td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <Link href={`/admin/projects/${project.id}`} aria-label={`Edit ${project.name}`} className="rounded-lg p-1.5 text-muted hover:bg-surface">
            <Pencil size={16} />
          </Link>
          <button onClick={handleDelete} disabled={deleting} aria-label={`Delete ${project.name}`} className="rounded-lg p-1.5 text-muted hover:bg-surface">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
