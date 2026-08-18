import { AdminSidebar } from "@/components/admin/Sidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { ToastProvider } from "@/components/ui/Toast";

// This layout only renders for authenticated requests — middleware.ts
// redirects unauthenticated visitors to /admin/login before this ever runs.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <header className="flex h-14 items-center justify-between border-b border-border px-4">
            <p className="text-sm text-muted">Admin Dashboard</p>
            <LogoutButton />
          </header>
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
