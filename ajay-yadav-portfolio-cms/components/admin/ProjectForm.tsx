"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export interface ProjectFormValues {
  id?: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  technologies: string; // comma-separated in the form, split into array on submit
  demo_url: string;
  github_url: string;
  status: "draft" | "published";
  featured: boolean;
}

const CATEGORIES = ["web", "ai", "python", "javascript", "automation", "other"];

export function ProjectForm({ initial }: { initial?: Partial<ProjectFormValues> }) {
  const router = useRouter();
  const { show } = useToast();
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(initial?.id);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name")),
      slug: String(formData.get("slug")),
      short_description: String(formData.get("short_description")),
      full_description: String(formData.get("full_description")),
      category: String(formData.get("category")),
      technologies: String(formData.get("technologies") ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      demo_url: String(formData.get("demo_url") ?? ""),
      github_url: String(formData.get("github_url") ?? ""),
      status: formData.get("status") === "published" ? "published" : "draft",
      featured: formData.get("featured") === "on",
      display_order: 0,
    };

    const url = isEditing ? `/api/projects/${initial!.id}` : "/api/projects";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      show("Could not save project.", "error");
      return;
    }

    show(isEditing ? "Project updated." : "Project created.");
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" name="name" required defaultValue={initial?.name} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="slug">Slug</label>
          <input id="slug" name="slug" required pattern="[a-z0-9-]+" defaultValue={initial?.slug} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="short_description">Short Description</label>
        <input id="short_description" name="short_description" required maxLength={240} defaultValue={initial?.short_description} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="full_description">Full Description</label>
        <textarea id="full_description" name="full_description" required rows={6} defaultValue={initial?.full_description} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={initial?.category ?? "web"} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="technologies">Technologies (comma-separated)</label>
          <input id="technologies" name="technologies" defaultValue={initial?.technologies} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="demo_url">Live Demo URL</label>
          <input id="demo_url" name="demo_url" type="url" defaultValue={initial?.demo_url} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="github_url">GitHub URL</label>
          <input id="github_url" name="github_url" type="url" defaultValue={initial?.github_url} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={initial?.status ?? "draft"} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <label className="mt-6 flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured} />
          Featured on homepage
        </label>
      </div>

      <Button type="submit" isLoading={saving}>
        {isEditing ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
