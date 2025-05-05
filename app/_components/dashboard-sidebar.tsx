"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Building,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  User,
  Plus,
} from "lucide-react";
import { useAuth } from "../_context/AuthContext";
import Image from "next/image";

interface DashboardSidebarProps {
  userRole: "student" | "company" | "admin";
  userName: string;
  userPhoto?: string;
}

export function DashboardSidebar({
  userRole,
  userName,
  userPhoto,
}: DashboardSidebarProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const pathname = usePathname();

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const profilePhoto =
    userPhoto !== "default-user.jpg"
      ? `https://intern-hub-server.onrender.com/images/users/${userPhoto}`
      : `https://intern-hub-server.onrender.com/images/users/default-user.jpg`;

  const allMenuItems = [
    // Student menu items
    { title: "Dashboard", href: "/dashboard", icon: Home },
    {
      title: "Browse Internships",
      href: "/dashboard/internships",
      icon: Building,
    },
    {
      title: "My Applications",
      href: "/dashboard/applications",
      icon: FileText,
    },

    // Company menu items
    {
      title: "Post Internship",
      href: "/dashboard/post-Internship",
      icon: Plus,
    },
    {
      title: "My Internships",
      href: "/dashboard/my-internships",
      icon: Building,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: User,
    },

    { title: "Profile", href: "/dashboard/profile/personal", icon: User },
  ];

  const menuItems = allMenuItems.filter((item) => {
    if (userRole === "student") {
      return (
        item.title === "Dashboard" ||
        item.title === "Browse Internships" ||
        item.title === "My Applications" ||
        item.title === "Profile"
      );
    } else if (userRole === "company") {
      return (
        item.title === "Dashboard" ||
        item.title === "Post Internship" ||
        item.title === "My Internships" ||
        item.title === "Profile"
      );
    } else if (userRole === "admin") {
      return (
        item.title === "Dashboard" ||
        item.title === "Profile" ||
        item.title === "Users"
      );
    }
    return false;
  });
  return (
    <aside className="flex h-screen flex-col w-64 border-r border-slate-700 bg-card">
      {/* Header */}
      <Link href="/">
        <div className="flex items-center justify-center border-b border-slate-700 px-4 py-6 gap-2 font-bold text-xl text-primary">
          <GraduationCap className="h-6 w-6" />
          <span>InternHub</span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-slate-600 text-white"
                    : "text-gray-300 hover:bg-slate-600"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt={userName}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-bold">
              {userInitials}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-gray-500 capitalize">{userRole}</span>
          </div>
        </div>

        <div className="flex items-center w-full justify-center">
          <button
            onClick={handleSignOut}
            className="mt-2 flex items-center gap-2 px-4 py-2 text-sm text-white bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
