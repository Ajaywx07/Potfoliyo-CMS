import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Add Project</h1>
      <div className="mt-6">
        <ProjectForm />
      </div>
    </div>
  );
}
