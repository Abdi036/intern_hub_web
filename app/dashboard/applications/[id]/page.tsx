"use client";

import {
  Calendar,
  Building,
  MapPin,
  Laptop,
  Banknote,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/app/_context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ApplicationDetailResponse } from "@/app/_lib/api";
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";

export default function ApplicationDetail() {
  const { getApplicationById } = useAuth();
  const [internship, setInternship] = useState<ApplicationDetailResponse>();
  const [loading, setLoading] = useState(true);

  const id = useParams().id as string;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await getApplicationById(id);
        setInternship(res);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id, getApplicationById]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[64vh]">
        <Spinner text="Loading Application Detail" />
      </div>
    );
  if (!internship) return <p>Application not found.</p>;

  return (
    <div className="bg-secondary text-gray-300 rounded-lg shadow p-6 space-y-4 w-full h-full mx-auto">
      {/* Header */}
      <div>
        <Link
          href={"/dashboard/applications"}
          className="flex items-center flex-row gap-1 text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          Back
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{internship.internship.title}</h2>
          <p className="text-gray-300 flex items-center mt-1">
            <Building className="w-4 h-4 mr-1" />
            {internship.internship.companyName}
          </p>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            internship.application.status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : internship.application.status === "accepted"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {internship.application.status}
        </span>
      </div>

      {/* Grid Info */}
      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Start Date: {internship.internship.startDate.split("T")[0]}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          End Date: {internship.internship.endDate.split("T")[0]}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Location: {internship.internship.location}
        </div>
        <div className="flex items-center">
          <Laptop className="w-4 h-4 mr-2" />
          Remote: {internship.internship.remote ? "Yes" : "No"}
        </div>
        <div className="flex items-center">
          <Banknote className="w-4 h-4 mr-2" />
          Paid: {internship.internship.paid ? "Yes" : "No"}
        </div>
        <div className="flex items-center">
          <ClipboardList className="w-4 h-4 mr-2" />
          Department: {internship.internship.department}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Deadline: {internship.internship.applicationDeadline.split("T")[0]}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Applied At:{" "}
          {new Date(internship.application.appliedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Application Details */}
      <div className="space-y-1 text-sm">
        <p>
          <strong>Cover Letter: </strong>{" "}
          <a
            href={internship.application.coverLetter}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Cover Letter
          </a>
        </p>
        <p>
          {internship.application.portfolio && (
            <>
              <strong>Portfolio: </strong>
              <a
                href={internship.application.portfolio}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {internship.application.portfolio}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
