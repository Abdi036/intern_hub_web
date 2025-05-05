"use client";

import { Application } from "../_lib/api";
import DashBoardCard from "./dashBoardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getApplicationsThisMonth,
  getAcceptanceRate,
  getWeeklySubmissionData,
} from "../_lib/trends";
import { useAuth } from "../_context/AuthContext";
import { useEffect, useState } from "react";

export default function StudentDashBoard() {
  const { getAllApplicatons } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllApplicatons();
        setApplications(response);
      } catch {}
    };

    fetchData();
  }, []);

  const thisMonthApps = getApplicationsThisMonth(applications);
  const acceptanceRate = getAcceptanceRate(applications);
  const weeklyData = getWeeklySubmissionData(applications);

  const accepted = applications.filter(
    (application) => application.applicationStatus === "accepted"
  );

  const rejected = applications.filter(
    (application) => application.applicationStatus === "rejected"
  );

  const pending = applications.filter(
    (application) => application.applicationStatus === "pending"
  );

  const cards = ["Total Application", "Accepted", "Rejected", "Pending"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back to your InternHub dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 h-[100px]">
        {cards.map((card, index) => (
          <DashBoardCard
            key={index}
            title={card}
            applications={
              card === "Total Application"
                ? applications.length
                : card === "Accepted"
                ? accepted.length
                : card === "Rejected"
                ? rejected.length
                : pending.length
            }
          />
        ))}
      </div>

      {/* Applications Info */}
      <div className="md:grid-cols-2 lg:grid-cols-7 mt-20">
        <h2 className="text-xl font-semibold mb-2">Insights Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary p-4 shadow rounded-lg">
            <p className="text-sm text-gray-200">Applications this month</p>
            <h2 className="text-2xl font-bold">{thisMonthApps.length}</h2>
            <p className="text-green-600 text-sm">+25% from last month</p>
          </div>

          <div className="bg-secondary p-4 shadow rounded-lg">
            <p className="text-sm text-gray-200">Acceptance Rate</p>
            <h2 className="text-2xl font-bold">{acceptanceRate}%</h2>
          </div>

          {/* Weekly Chart */}
          <div className="bg-secondary p-4 shadow rounded-lg col-span-1 md:col-span-1">
            <p className="text-sm text-gray-200">Weekly Submission Trend</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
