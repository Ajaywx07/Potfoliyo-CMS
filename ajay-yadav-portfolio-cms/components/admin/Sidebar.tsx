"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard, User, Milestone, Sparkles, FolderKanban, Bot, Cog,
  Briefcase, GraduationCap, Award, FileText, Trophy, Wrench, Image as ImageIcon,
  MessageSquare, Star, Search, Palette, Settings, History, Trash2,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/profile", label: "Profile", icon: User },
      { href: "/admin/journey", label: "Journey", icon: Milestone },
      { href: "/admin/skills", label: "Skills", icon: Sparkles },
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/ai-projects", label: "AI Projects", icon: Bot },
      { href: "/admin/automation", label: "Automation", icon: Cog },
      { href: "/admin/services", label: "Services", icon: Briefcase },
      { href: "/admin/experience", label: "Experience", icon: Briefcase },
      { href: "/admin/education", label: "Education", icon: GraduationCap },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/achievements", label: "Achievements", icon: Trophy },
      { href: "/admin/tools", label: "Tools", icon: Wrench },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
      { href: "/admin/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
      { href: "/admin/seo", label: "SEO", icon: Search },
      { href: "/admin/theme", label: "Theme", icon: Palette },
      { href: "/admin/settings", label: "Settings", icon: Settings },
      { href: "/admin/activity-logs", label: "Activity Logs", icon: History },
      { href: "/admin/trash", label: "Trash", icon: Trash2 },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface p-4 md:block">
      <p className="mb-4 px-2 font-heading text-lg font-bold">Admin</p>
      <nav className="space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase text-muted">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={clsx(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                      pathname === href
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-background"
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
