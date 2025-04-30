"use client";
import { useState } from "react";
import { Building, Calendar, Eye, FileText } from "lucide-react";

const tabs = ["all", "pending", "accepted", "rejected"];

const applications: Application[] = [
  {
    title: "Marketing Intern",
    company: "Global Marketing Inc.",
    status: "Pending",
    date: "Applied on Apr 20, 2023",
  },
  {
    title: "Data Science Intern",
    company: "Data Insights Co.",
    status: "Rejected",
    date: "Applied on Apr 5, 2023",
  },
  {
    title: "Product Management Intern",
    company: "Product Innovations",
    status: "Accepted",
    date: "Applied on Mar 25, 2023",
  },
];

export default function ApplicationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const filtered =
    selectedTab === "all"
      ? applications
      : applications.filter(
          (app) => app.status.toLowerCase().replace(" ", "-") === selectedTab
        );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-gray-500">
          Track and manage your internship applications.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
              selectedTab === tab
                ? "bg-secondary text-white"
                : "bg-gray-500 text-white hover:bg-gray-400"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((application, i) => (
          <ApplicationCard key={i} application={application} />
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  const statusColors = {
    Pending: "bg-blue-100 text-blue-800",
    "In Review": "bg-amber-100 text-amber-800",
    Interview: "bg-purple-100 text-purple-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="border-gray-600 rounded-lg shadow-sm p-4 bg-card">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-semibold">{application.title}</h2>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Building className="mr-1" />
            {application.company}
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            statusColors[application.status]
          }`}
        >
          {application.status}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500">
        <div className="flex items-center mb-2 sm:mb-0">
          <Calendar className="mr-1" />
          {application.date}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-100">
            <Eye className="mr-1" />
            View Details
          </button>
          <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-100">
            <FileText className="mr-1" />
            View Application
          </button>
        </div>
      </div>
    </div>
  );
}

interface Application {
  title: string;
  company: string;
  status: "Pending" | "Accepted" | "Rejected";
  date: string;
}
