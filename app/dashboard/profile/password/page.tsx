"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PasswordUpdatePage() {
  const { loading, updatePassword, error, deleteAccount } = useAuth();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { currentPassword, newPassword } = formData;
    await updatePassword(currentPassword, newPassword);
    setShowSuccess(true);
    setFormData({
      currentPassword: "",
      newPassword: "",
    });
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-card shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Current Password
            </label>
            <input
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded border-2 border-gray-600 p-2 shadow-sm"
              placeholder="Current Password"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded border-2 border-gray-600  p-2 shadow-sm"
              placeholder="New Password"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {showSuccess && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              Password updated successfully!
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-400 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
          <button
            disabled={loading}
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Delete Account
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
