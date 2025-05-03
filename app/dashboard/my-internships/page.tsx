import { Eye } from "lucide-react";
import Link from "next/link";

export default function CompanyInternshipsPage() {
  const dummyInternships = [
    {
      _id: "1",
      title: "Frontend Intern",
      CompanyName: "Digital Spark",
      department: "Engineering",
      startDate: "2025-06-01",
      endDate: "2025-08-30",
      description: "Assist in building responsive UIs using React.",
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
      description: "Work with Node.js and MongoDB to develop REST APIs.",
      requiredSkills: ["Node.js", "Express", "MongoDB"],
      location: "Addis Ababa",
      remote: false,
      paid: false,
      numPositions: 1,
      applicationDeadline: "2025-06-10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Posted Internships
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {dummyInternships.map((intern) => (
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
    </div>
  );
}
