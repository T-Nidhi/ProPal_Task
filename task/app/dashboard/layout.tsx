"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard/profile" className={`p-3 rounded ${isActive("/dashboard/profile")}`}>
            Profile
          </Link>
          <Link href="/dashboard/agent" className={`p-3 rounded ${isActive("/dashboard/agent")}`}>
            Agent
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
