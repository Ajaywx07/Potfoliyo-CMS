export interface SkillCardData {
  name: string;
  level: number;
  description?: string | null;
}

export function SkillCard({ skill }: { skill: SkillCardData }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">{skill.name}</p>
        <span className="text-xs text-muted">{skill.level}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      {skill.description && (
        <p className="mt-2 text-sm text-muted">{skill.description}</p>
      )}
      <p className="mt-2 text-[11px] text-muted">Self-assessed level</p>
    </div>
  );
}
