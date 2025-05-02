"use client";

import { Building, MapPin, CalendarDays } from "lucide-react";
import { Internship } from "@/app/_lib/api";
import { useRouter } from "next/navigation";

interface InternshipCardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const router = useRouter();

  const {
    _id: id,
    title,
    CompanyName,
    department,
    startDate,
    endDate,
    description,
    requiredSkills,
    location,
    remote,
    paid,
    numPositions,
    applicationDeadline,
  } = internship;

  const handleApply = async () => {
    router.push(`/dashboard/internships/${id}`);
  };

  return (
    <div className="border border-gray-600 rounded-lg shadow-sm bg-card text-gray-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-500 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center text-sm mt-1 flex-wrap gap-1">
            <Building className="mr-1 h-4 w-4" />
            {CompanyName} · {department}
          </div>
        </div>
        <span className="text-sm">{remote ? "Remote" : "On-site"}</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 text-sm">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-1" />
          {new Date(startDate).toLocaleDateString()} –{" "}
          {new Date(endDate).toLocaleDateString()}
        </div>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {requiredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-sm">
          <div>
            <strong>{paid ? "Paid" : "Unpaid"}</strong> · {numPositions}{" "}
            position(s)
          </div>
          <div>
            Deadline:{" "}
            <span className="text-red-600">
              {new Date(applicationDeadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="bg-primary text-white py-1.5 px-4 rounded hover:bg-secondary text-sm font-medium cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
