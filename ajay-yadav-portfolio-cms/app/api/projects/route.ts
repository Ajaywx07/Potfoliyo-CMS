import { NextResponse } from "next/server";
import { projectSchema } from "@/lib/validation/schemas";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// GET: list projects (admin — includes drafts). Public listing uses direct
// Supabase queries from Server Components with RLS instead of this route.
export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status");

  let query = supabase.from("projects").select("*").order("display_order", { ascending: true });
  if (search) query = query.ilike("name", `%${search}%`);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST: create a project. Server-validated with Zod before it ever touches the DB.
export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.from("projects").insert(parsed.data).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("activity_logs").insert({
    user_id: session.user.id,
    action: "create",
    target_type: "project",
    target_id: data.id,
    description: `Created project "${data.name}"`,
  });

  return NextResponse.json({ data }, { status: 201 });
}
