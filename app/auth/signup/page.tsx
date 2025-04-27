"use client";
import Link from "next/link";
import { Building, ArrowLeft, GraduationCap } from "lucide-react";

export default function Signup() {
  const role = "";
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
              <span>Back to InternHub</span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Create a password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">I am a</label>
              <div className="flex gap-4">
                {/* Student */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={role === ""}
                    onChange={() => {}}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <GraduationCap className="h-4 w-4" />
                    Student
                  </span>
                </label>

                {/* Company */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="company"
                    name="role"
                    value="company"
                    checked={role === ""}
                    onChange={() => {}}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <Building className="h-4 w-4" />
                    Company
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
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
