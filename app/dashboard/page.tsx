"use client";

import { FileText, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back to your InternHub dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Applications",
            value: 12,
            change: "+2 since last month",
            Icon: FileText,
          },
          {
            title: "Active Applications",
            value: 8,
            change: "+1 since last week",
            Icon: Users,
          },

          {
            title: "Offers",
            value: 1,
            change: "+1 since last month",
            Icon: FileText,
          },
        ].map(({ title, value, change, Icon }, i) => (
          <div key={i} className="bg-card p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">{title}</h2>
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-400">{change}</p>
          </div>
        ))}
      </div>

      {/* Applications */}
      <div className=" md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Applications */}
        <div className="bg-card p-6 rounded-lg shadow-md col-span-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <p className="text-sm text-gray-400">
              Your most recent internship applications
            </p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">Software Engineering Intern</p>
                  <p className="text-sm text-gray-400">TechCorp Inc.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                    In Review
                  </span>
                  <button className="text-blue-600 text-sm hover:underline">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              href="/dashboard/applications"
              className="text-sm text-blue-600 hover:underline"
            >
              View all applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
