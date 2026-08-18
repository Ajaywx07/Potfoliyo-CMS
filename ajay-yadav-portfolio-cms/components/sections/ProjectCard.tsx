import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export interface ProjectCardData {
  slug: string;
  name: string;
  short_description: string;
  featured_image?: string | null;
  technologies: string[];
  category: string;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="h-full">
        {project.featured_image && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-md bg-background">
            <Image
              src={project.featured_image}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        )}
        <span className="text-xs font-medium uppercase text-accent">
          {project.category}
        </span>
        <h3 className="mt-1 font-heading text-lg font-bold">{project.name}</h3>
        <p className="mt-1 text-sm text-muted">{project.short_description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-background px-2 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}
