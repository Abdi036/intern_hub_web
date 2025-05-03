"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { Application } from "@/app/_lib/api";

import ApplicationCard from "@/app/_components/ApplicationCard";
import Spinner from "@/app/_components/Spinner";
const tabs = ["all", "pending", "accepted", "rejected"];

export default function ApplicationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [applications, setApplications] = useState<Application[]>([]);

  const { getAllApplicatons, loading } = useAuth();

  const fetchApplications = async () => {
    try {
      const response = await getAllApplicatons();
      setApplications(response);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications =
    selectedTab === "all"
      ? applications
      : applications.filter(
          (app) => app.applicationStatus.toLowerCase() === selectedTab
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
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner text="loading Applications" />
          </div>
        ) : (
          filteredApplications.map((application, i) => (
            <ApplicationCard key={i} application={application} />
          ))
        )}
      </div>
    </div>
  );
}
