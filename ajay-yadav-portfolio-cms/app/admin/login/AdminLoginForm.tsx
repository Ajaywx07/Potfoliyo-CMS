"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (authError) {
      // Deliberately generic — don't reveal whether the email exists.
      setError("Invalid email or password.");
      return;
    }

    const redirectTo = searchParams.get("redirectedFrom") || "/admin";
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-background p-8 shadow-sm">
      <h1 className="font-heading text-xl font-bold">Admin Login</h1>
      <p className="mt-1 text-sm text-muted">Sign in to manage your site content.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>

        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

        <Button type="submit" isLoading={loading} className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
