"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
// import { Internship } from "@/app/_lib/api";
import Link from "next/link";
import { Internship } from "@/app/_lib/api";
import Spinner from "@/app/_components/Spinner";

export default function InternshipDetailPage() {
  const { id } = useParams() as { id: string };
  const { getMypostedInternshipDetail } = useAuth();
  const [internshipDetail, setInternshipDetail] = useState<Internship>();

  useEffect(() => {
    const fetchInternshipDetail = async () => {
      try {
        const internship = await getMypostedInternshipDetail(id);
        setInternshipDetail(internship);
      } catch (error) {
        console.error("Error fetching internship detail:", error);
      }
    };

    fetchInternshipDetail();
  }, [getMypostedInternshipDetail, id]);

  if (!internshipDetail) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner text="loading Internship Detail" />
      </div>
    );
  }

  const data = internshipDetail.internship;

  return (
    <div className="mx-auto px-4 py-8 h-screen">
      <div className="mb-6">
        <Link
          href="/dashboard/my-internships"
          className="text-primary hover:underline flex items-center gap-2"
        >
          ← Back to My Internships
        </Link>
      </div>

      <div className="bg-card shadow-md border border-gray-700 rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">{data.title}</h1>
            <p className="text-xl text-gray-400">{data.CompanyName}</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>
            <p className="text-gray-400">{data.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Details</h3>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Department:</strong> {data.department}
                </p>
                <p>
                  <strong>Location:</strong> {data.location}
                </p>
                <p>
                  <strong>Type:</strong> {data.remote ? "Remote" : "On-site"}
                </p>
                <p>
                  <strong>Compensation:</strong> {data.paid ? "Paid" : "Unpaid"}
                </p>
                <p>
                  <strong>Positions:</strong> {data.numPositions}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                Timeline
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(data.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(data.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Application Deadline:</strong>{" "}
                  {new Date(data.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.requiredSkills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
