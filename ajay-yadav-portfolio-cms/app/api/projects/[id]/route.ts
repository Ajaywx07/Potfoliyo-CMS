import { NextResponse } from "next/server";
import { projectSchema } from "@/lib/validation/schemas";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json().catch(() => null);
  const parsed = projectSchema.partial().safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("activity_logs").insert({
    user_id: session.user.id,
    action: "update",
    target_type: "project",
    target_id: params.id,
    description: `Updated project "${data.name}"`,
  });

  return NextResponse.json({ data });
}

// Soft delete — moves to Trash instead of permanent removal, per spec.
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  const { error } = await admin
    .from("projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("activity_logs").insert({
    user_id: session.user.id,
    action: "delete",
    target_type: "project",
    target_id: params.id,
    description: "Moved project to Trash",
  });

  return NextResponse.json({ ok: true });
}
