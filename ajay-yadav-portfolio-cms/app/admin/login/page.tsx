"use client";

import dynamic from "next/dynamic";

const AdminLoginForm = dynamic(() => import("./AdminLoginForm"), {
  ssr: false,
  loading: () => <div className="text-sm text-muted">Loading login...</div>,
});

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <AdminLoginForm />
    </div>
  );
}
