"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <SectionHeading eyebrow="Get in Touch" title="Contact Me" />

      <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
        {/* Honeypot — hidden from real users, bots often fill every field */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
          <input id="name" name="name" required minLength={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium">Subject</label>
          <input id="subject" name="subject" required minLength={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
          <textarea id="message" name="message" required minLength={10} rows={5} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>

        <Button type="submit" isLoading={status === "loading"}>
          Send Message
        </Button>

        {status === "success" && (
          <p role="status" className="text-sm text-green-600">Thanks — your message has been sent.</p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-red-600">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}
