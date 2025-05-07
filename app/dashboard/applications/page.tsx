"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { Application } from "@/app/_lib/api";

import ApplicationCard from "@/app/_components/ApplicationCard";
import Spinner from "@/app/_components/Spinner";
import Link from "next/link";
const tabs = ["all", "pending", "accepted", "rejected"];

export default function ApplicationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [applications, setApplications] = useState<Application[]>([]);
  const { getAllApplicatons, user, loading, setError } = useAuth();

  const fetchApplications = async () => {
    try {
      const response = await getAllApplicatons();
      if (!response) {
        setError(null);
        return;
      }
      setApplications(response.applications);
    } catch {}
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

  if (user?.role !== "student") {
    return (
      <div className="flex flex-col items-center justify-center h-[65vh] px-4 text-center">
        <span className="text-6xl p-5">🤨</span>
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-3xl font-semibold text-gray-400 mb-2">
          Unauthorized Access
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You do not have permission to view this page.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-200"
        >
          Go Back
        </Link>
      </div>
    );
  }

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
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize cursor-pointer ${
              selectedTab === tab
                ? "text-secondary bg-white"
                : "bg-gray-600 text-white hover:bg-gray-500"
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
        ) : filteredApplications.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            There is no {selectedTab} application currently.
          </p>
        ) : (
          filteredApplications.map((application, i) => (
            <ApplicationCard key={i} application={application} />
          ))
        )}
      </div>
    </div>
  );
}
