"use client";
import React from "react";
import Button from "./Button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSigninClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <header className="font-bold sticky top-0 z-50 w-full border-b border-b-secondary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-5">
        <Link href="#home">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <GraduationCap className="h-6 w-6" />
            <span>InternHub</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="#why-internhub"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Why InternHub
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Testimonials
          </Link>
          <Link
            href="#partners"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Partners
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            text={isAuthenticated ? "Dashboard" : "Signin"}
            onClick={handleSigninClick}
          />
        </div>
      </div>
    </header>
  );
}
