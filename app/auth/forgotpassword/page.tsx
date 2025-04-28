"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const { forgotPassword, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        router.push("/auth/resetpassword");
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
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <ArrowLeft className="h-6 w-6" />
              <span> Back to InternHub</span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {showSuccess && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              Token sent to email!
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
