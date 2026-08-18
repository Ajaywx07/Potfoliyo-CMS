import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import { MessageStatusSelect } from "@/components/admin/MessageStatusSelect";
import { format } from "date-fns";

export default async function AdminMessagesPage() {
  const supabase = createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Messages</h1>
      <p className="mt-1 text-sm text-muted">Contact form submissions. Never shown publicly.</p>

      <div className="mt-6 space-y-3">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{msg.subject}</p>
                  <p className="text-sm text-muted">{msg.name} · {msg.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-muted">{format(new Date(msg.created_at), "MMM d, yyyy")}</p>
                  <MessageStatusSelect id={msg.id} currentStatus={msg.status} />
                </div>
              </div>
              <p className="mt-3 text-sm">{msg.message}</p>
            </div>
          ))
        ) : (
          <EmptyState title="No messages yet" description="Submissions from the Contact page will appear here." />
        )}
      </div>
    </div>
  );
}
