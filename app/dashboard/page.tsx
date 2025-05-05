"use client";

import AdminDashBoard from "../_components/AdminDashBoard";
import CompanyDashBoard from "../_components/CompanyDashBoard";
import StudentDashBoard from "../_components/StudentDashBoard";
import { useAuth } from "../_context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return (
      <div>
        <AdminDashBoard />
      </div>
    );
  }
  if (user?.role === "company") {
    return (
      <div>
        <CompanyDashBoard />
      </div>
    );
  }
  if (user?.role === "student") {
    return (
      <div>
        <StudentDashBoard />
      </div>
    );
  }
}
