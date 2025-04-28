"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-500">Manage your profile details.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-card">
        {[
          {
            id: "personal",
            label: "Personal Information",
            href: "/dashboard/profile/personal",
          },
          {
            id: "password",
            label: "Update Password",
            href: "/dashboard/profile/password",
          },
        ].map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-4 py-2 -mb-px border-b-2 ${
              pathname === tab.href
                ? "border-gray-200 text-gray-200 font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="bg-card shadow rounded-lg p-6">{children}</div>
    </div>
  );
}
