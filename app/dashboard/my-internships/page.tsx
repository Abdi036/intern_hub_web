"use client";

import Spinner from "@/app/_components/Spinner";
import { useAuth } from "@/app/_context/AuthContext";
import { Internship } from "@/app/_lib/api";
import { Eye } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function CompanyInternshipsPage() {
  const { getAllMyPostedInternships, user, loading } = useAuth();
  const [myInternships, setMyInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const internships = await getAllMyPostedInternships();
        setMyInternships(internships);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    fetchInternships();
  }, []);

  if (user?.role !== "company") {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Posted Internships
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Spinner text="loading your internship" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {myInternships
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((intern: Internship) => (
              <div
          key={intern._id}
          className="bg-card shadow-md border border-gray-600 rounded-lg p-5 hover:shadow-lg transition-all duration-300"
              >
          <h2 className="text-xl font-semibold mb-1">{intern.title}</h2>
          <p className="text-sm text-gray-400">{intern.department}</p>
          <p className="text-xs text-gray-500 mb-2">
            {new Date(intern.startDate).toLocaleDateString()} -{" "}
            {new Date(intern.endDate).toLocaleDateString()}
          </p>

          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {intern.description}
          </p>

          <div className="flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {intern.remote ? "Remote" : "On-site"}
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {intern.paid ? "Paid" : "Unpaid"}
            </span>
            <span className="bg-gray-200 text-gray-400 px-2 py-1 rounded-full">
              {intern.location}
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              <span className="font-medium">Positions:</span>{" "}
              {intern.numPositions}
            </div>
            <Link
              href={`/dashboard/my-internships/${intern._id}`}
              className="bg-primary flex gap-2 items-center justify-center text-white px-4 py-2 rounded hover:bg-secondary text-sm font-medium transition-colors"
            >
              <Eye className="h-6 w-6" />
              View Details
            </Link>
          </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
