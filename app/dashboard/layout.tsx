"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "../_components/dashboard-sidebar";
import { useAuth } from "../_context/AuthContext";
import { X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userName = user?.name.split(" ")[0];

  // Close sidebar by default on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) setSidebarOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <DashboardSidebar
          userRole={user?.role as "student" | "company" | "admin"}
          userName={user?.name || "User"}
          userPhoto={user?.photo || "default-user.jpg"}
          onLinkClick={() => {
            if (window.innerWidth < 768) setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Area with Sidebar Spacing */}
      <div className="flex flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-10 flex h-[77px] items-center justify-between bg-gray-800 border-b border-gray-700 px-6 shadow-sm">
          <h1 className="text-3xl">Welcome, {userName}</h1>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : "☰"}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
