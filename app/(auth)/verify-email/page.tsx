"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const { verifyEmail, error, loading } = useAuth();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  // Handle keyboard input (only digits) and auto-focus next box
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move focus to previous input
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect OTP from inputs
    const otp = inputsRef.current.map((input) => input?.value || "").join("");

    // Validate OTP
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return; // Rely on error from useAuth for invalid OTP
    }

    // Validate email
    if (!email) {
      return; // Rely on error from useAuth for missing email
    }

    try {
      await verifyEmail(email, otp);
      setSuccessMsg(true);
      setTimeout(() => {
        router.push("/signin");
      }, 1500); // Delay navigation to show success message briefly
    } catch (err) {
      console.error("Verification error:", err);
      // Error is handled by useAuth's error state
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <ArrowLeft className="h-6 w-6" />
              <span>Back to InternHub</span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter the 6-digit code sent to {email || "your email"}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* OTP Boxes */}
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ))}
            </div>

            {/* Success Message */}
            {successMsg && (
              <div className="p-3 bg-green-300 border border-white rounded-md">
                <p className="text-white text-sm text-center">
                  Email Verified Successfully
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-5 text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button className="text-primary font-medium hover:underline underline-offset-4">
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
