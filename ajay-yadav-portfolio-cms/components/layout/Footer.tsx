import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const QUICK_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

// TODO (Admin → Settings): these should ultimately be pulled from the
// `settings` table rather than hard-coded, once the settings API exists.
const SOCIALS = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com/", label: "Twitter", icon: Twitter },
  { href: "mailto:hello@example.com", label: "Email", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-heading text-lg font-bold">Ajay Yadav</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Web developer focused on frontend engineering, Python, SEO, and
              AI/automation projects.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Quick Links</p>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Connect</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-border p-2 text-muted transition-colors hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {year} Ajay Yadav. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
