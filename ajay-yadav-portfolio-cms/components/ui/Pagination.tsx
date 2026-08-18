"use client";

import Link from "next/link";
import clsx from "clsx";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm",
            page === currentPage
              ? "bg-primary text-white"
              : "text-muted hover:bg-surface"
          )}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
