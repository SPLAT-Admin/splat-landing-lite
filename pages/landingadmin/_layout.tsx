import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LandingAdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const links = [
    { href: "/landingadmin/dashboard", label: "Dashboard" },
    { href: "/landingadmin/analytics", label: "Analytics" },
    { href: "/landingadmin/email", label: "Emails" },
    { href: "/landingadmin/merch", label: "Merch" },
    { href: "/admin/promos", label: "Promos" },
    { href: "/admin/customers", label: "Customers" },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-900 text-white">
      <aside className="w-64 bg-black p-6 space-y-4">
        <h1 className="text-deep-crimson text-2xl font-bold">SPL@T Admin</h1>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block p-2 rounded-md transition-colors ${
                  router.pathname === link.href
                    ? "bg-deep-crimson text-white"
                    : "hover:text-deep-crimson"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
