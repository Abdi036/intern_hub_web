"use client";

import type React from "react";
import { useState } from "react";
import { DashboardSidebar } from "../_components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole] = useState<"student" | "company" | "admin">("student");
  const [userName] = useState("John Doe");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <DashboardSidebar userRole={userRole} userName={userName} />
      </div>

      {/* Main Area with Sidebar Spacing */}
      <div className="flex flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-gray-800 border-b border-gray-700 px-6 shadow-sm">
          <h1 className="text-3xl">Welcome,User</h1>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "X" : "☰"}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
