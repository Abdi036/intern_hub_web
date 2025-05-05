"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import DashBoardCard from "./dashBoardCard";
import { useAuth } from "../_context/AuthContext";
import { User } from "../_lib/api";
import { useEffect, useState } from "react";

export default function AdminDashBoard() {
  const { getAllUsers } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const totalCompany = users.filter((user) => user.role === "company").length;
  const totalStudent = users.filter((user) => user.role === "student").length;
  const totalAdmin = users.filter((user) => user.role === "admin").length;

  const cards = [
    { title: "Total Users", value: totalUsers },
    { title: "Company", value: totalCompany },
    { title: "Student", value: totalStudent },
    { title: "Admin", value: totalAdmin },
  ];

  // Chart Data (same structure for both charts)
  const chartData = [
    { label: "Company", value: totalCompany },
    { label: "Student", value: totalStudent },
    { label: "Admin", value: totalAdmin },
  ];

  const COLORS = ["#60a5fa", "#34d399", "#f87171"];

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl px-4 mx-auto">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <DashBoardCard
            key={index}
            title={card.title}
            applications={card.value}
          />
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-secondary p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="label" stroke="#ffffff" />
            <YAxis stroke="#ffffff" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#60a5fa" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-secondary p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">User Distribution (Pie)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
