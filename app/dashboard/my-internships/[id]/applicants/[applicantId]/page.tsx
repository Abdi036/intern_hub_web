"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { ApplicantsResponse } from "@/app/_lib/api";
import { ArrowLeft, Check, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState<ApplicantsResponse>();
  const { getApplicant } = useAuth();

  const { id, applicantId } = useParams() as {
    id: string;
    applicantId: string;
  };

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await getApplicant(id, applicantId);
        setData(response);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicant();
  }, []);

  const handleAccept = () => {
    console.log("Applicant accepted");
  };

  const handleReject = () => {
    console.log("Applicant rejected");
  };

  return (
    <div>
      <div className="flex items-center gap-6 h-14 text-white p-4">
        <button
          onClick={router.back}
          className="flex items-center text-primary hover:font-bold cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <p className="text-2xl font-bold">Applicants Detail</p>
      </div>
      <div className="flex justify-center items-center bg-gray-900 text-white px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          {/* Top Section: Name & Email */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Name: {data?.name}</h1>
            <h4 className="text-sm text-gray-400">Email :{data?.email}</h4>
          </div>

          {/* Application Details */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-300">Applied At: </span>
              <span>
                {data?.application?.appliedAt
                  ? new Date(data.application.appliedAt).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-300">Portfolio: </span>
              <a
                href={data?.application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {data?.application.portfolio}
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-300">
                Cover Letter:{" "}
              </span>
              <a
                href={data?.application.coverLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View PDF
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAccept}
              className="flex items-center gap-2 bg-primary hover:bg-slate-700 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-200"
            >
              <Check className="h-5 w-5" />
              Accept
            </button>
            <button
              onClick={handleReject}
              className="flex items-center gap-2 bg-primary hover:bg-slate-700 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-200"
            >
              <X className="h-5 w-5" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
