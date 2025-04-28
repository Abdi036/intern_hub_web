"use client";

import type React from "react";
import { useState } from "react";
import { DashboardSidebar } from "../_components/dashboard-sidebar";
import { useAuth } from "../_context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <DashboardSidebar
          userRole={userData?.role as "student" | "company" | "admin"}
          userName={userData?.name || "User"}
          userPhoto={userData?.photo || undefined}
        />
      </div>

      {/* Main Area with Sidebar Spacing */}
      <div className="flex flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-gray-800 border-b border-gray-700 px-6 shadow-sm">
          <h1 className="text-3xl">Welcome, {userData?.name || "User"}</h1>
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
