"use client";

import { useAuth } from "@/app/_context/AuthContext";

export default function PasswordUpdatePage() {
  const { loading } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-card shadow rounded-lg p-6">
        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-200 shadow-sm"
              placeholder="Current Password"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-200 shadow-sm"
              placeholder="New Password"
            />
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-400 transition-all duration-300 cursor-pointer">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
