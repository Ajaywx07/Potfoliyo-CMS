import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero({
  name,
  headline,
  description,
}: {
  name: string;
  headline: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Hi, I&apos;m
      </p>
      <h1 className="font-heading text-4xl font-extrabold sm:text-6xl">{name}</h1>
      <p className="mt-4 text-xl text-muted">{headline}</p>
      <p className="mx-auto mt-4 max-w-xl text-muted">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/projects">
          <Button size="lg">View Projects</Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline">Contact Me</Button>
        </Link>
      </div>
    </section>
  );
}
