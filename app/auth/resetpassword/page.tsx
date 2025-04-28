"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const { resetPassword, loading } = useAuth();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      setShowSuccess(true);
      setToken("");
      setPassword("");
    } catch (error) {
      // Error handling is already done in the AuthContext
      console.log(error);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        router.push("/auth/signin");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Link
              href="/auth/forgotpassword"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <ArrowLeft className="h-6 w-6" />
              <span> Back to Forgotpassword</span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the reset token and your new password.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-400"
              >
                Reset Token
              </label>
              <input
                id="token"
                name="token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter reset token"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {showSuccess && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              Password reset successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
