"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DashBoardCard from "./dashBoardCard";
import { useAuth } from "../_context/AuthContext";
import { useEffect, useState } from "react";
import { Internship } from "../_lib/api";

export default function CompanyDashBoard() {
  const { getAllMyPostedInternships } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMyPostedInternships();
        setInternships(response);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    fetchData();
  }, []);


  const totalInternships = internships.length;

  const totalApplicants = internships.reduce(
    (acc, internship) => acc + internship.applicants.length,
    0
  );

  const cards = [
    { title: "Total Internships", value: totalInternships },
    { title: "Total Applicants", value: totalApplicants },
  ];

  // Dynamically create chart data from internships
  const chartData = internships.map((internship) => ({
    internship:
      internship.title.length > 12
        ? internship.title.slice(0, 10) + "..."  
        : internship.title,
    applicants: internship.applicants.length,
  }));

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl px-4 mx-auto">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {cards.map((card, index) => (
          <DashBoardCard
            key={index}
            title={card.title}
            applications={card.value}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-secondary p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">
          Applicants per Internship
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="internship" stroke="#ffffff" />
            <YAxis stroke="#ffffff" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="applicants" fill="#34d399" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
