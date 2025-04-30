"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// This would typically come from an API call
const dummyInternships = [
  {
    _id: "1",
    title: "Frontend Intern",
    CompanyName: "Digital Spark",
    department: "Engineering",
    startDate: "2025-06-01",
    endDate: "2025-08-30",
    description:
      "Assist in building responsive UIs using React. You'll work closely with our design team to implement beautiful and functional user interfaces. This is a great opportunity to learn modern frontend development practices and work on real-world projects.",
    requiredSkills: ["React", "JavaScript", "Tailwind CSS"],
    location: "Remote",
    remote: true,
    paid: true,
    numPositions: 2,
    applicationDeadline: "2025-05-20",
  },
  {
    _id: "2",
    title: "Backend Intern",
    CompanyName: "Digital Spark",
    department: "Engineering",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
    description:
      "Work with Node.js and MongoDB to develop REST APIs. You'll be part of our backend team, helping to build and maintain our server infrastructure. This role offers hands-on experience with database design, API development, and cloud services.",
    requiredSkills: ["Node.js", "Express", "MongoDB"],
    location: "Addis Ababa",
    remote: false,
    paid: false,
    numPositions: 1,
    applicationDeadline: "2025-06-10",
  },
];

export default function InternshipDetailPage() {
  const params = useParams();
  const internship = dummyInternships.find(
    (intern) => intern._id === params.id
  );

  if (!internship) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Internship Not Found</h1>
          <Link
            href="/dashboard/my-internships"
            className="text-primary hover:underline"
          >
            Back to My Internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/my-internships"
          className="text-primary hover:underline flex items-center gap-2"
        >
          ← Back to My Internships
        </Link>
      </div>

      <div className="bg-card shadow-md border rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
        <p className="text-xl text-gray-400 mb-6">{internship.CompanyName}</p>

        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-400 mb-4">{internship.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Department:</span>{" "}
                  {internship.department}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {internship.location}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {internship.remote ? "Remote" : "On-site"}
                </p>
                <p>
                  <span className="font-medium">Compensation:</span>{" "}
                  {internship.paid ? "Paid" : "Unpaid"}
                </p>
                <p>
                  <span className="font-medium">Positions Available:</span>{" "}
                  {internship.numPositions}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Timeline</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Start Date:</span>{" "}
                  {new Date(internship.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">End Date:</span>{" "}
                  {new Date(internship.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Application Deadline:</span>{" "}
                  {new Date(
                    internship.applicationDeadline
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship.requiredSkills.map((skill) => (
                <span
                  key={skill}
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
