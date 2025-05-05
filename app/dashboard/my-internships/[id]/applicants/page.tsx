"use client";

/* eslint-disable @next/next/no-img-element */
import Spinner from "@/app/_components/Spinner";
import { useAuth } from "@/app/_context/AuthContext";
import { ApplicantsResponse } from "@/app/_lib/api";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const statusColors: { [key: string]: string } = {
  accepted: "bg-green-400",
  pending: "bg-yellow-500",
  rejected: "bg-red-500",
};

export default function UsersList() {
  const { getAllApplicants, loading } = useAuth();
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [applicants, setApplicants] = useState<ApplicantsResponse[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await getAllApplicants(id);
        setApplicants(response);
      } catch (error) {
        console.error("Failed to fetch applicants", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleUserClick = (studentId: string, applicationId: string) => {
    router.push(
      `/dashboard/my-internships/${id}/applicants/${studentId}?applicationId=${applicationId}`
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={router.back}
          className="flex items-center gap-2 text-primary text-lg transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <h2 className="text-xl font-semibold text-white ml-2">Applicants</h2>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[65vh]">
            <Spinner text="Loading users" />
          </div>
        ) : (
          applicants.map((applicant) => {
            const cardContent = (
              <div className="relative bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4 border border-gray-700">
                {/* Status Badge */}
                <span
                  className={`absolute top-2 right-2 text-xs text-white px-2 py-1 rounded-full ${
                    statusColors[applicant.status]
                  }`}
                >
                  {applicant.status}
                </span>

                {/* Profile Image */}
                <img
                  src={`https://intern-hub-server.onrender.com/images/users/${applicant.photo}`}
                  alt={applicant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Name and Email */}
                <div>
                  <p className="text-white font-semibold">{applicant.name}</p>
                  <p className="text-sm text-gray-400">{applicant.email}</p>
                </div>
              </div>
            );

            return applicant.status === "pending" ? (
              <button
                key={applicant.studentId}
                onClick={() =>
                  handleUserClick(applicant.studentId, applicant.applicationId)
                }
                className="cursor-pointer hover:translate-y-[2px] transition-transform duration-200"
              >
                {cardContent}
              </button>
            ) : (
              <div key={applicant.studentId}>{cardContent}</div>
            );
          })
        )}
      </div>
    </div>
  );
}
