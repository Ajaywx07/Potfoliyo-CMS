export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-muted">{description}</p>
      )}
    </div>
  );
}
