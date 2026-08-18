"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Error</p>
      <h1 className="mt-2 font-heading text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-muted">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <Button onClick={reset} className="mt-6">Try Again</Button>
    </div>
  );
}
