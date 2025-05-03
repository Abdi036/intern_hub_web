"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// Dummy Data
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
  const router = useRouter();
  const internship = dummyInternships.find(
    (intern) => intern._id === params.id
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(internship);

  if (!internship) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Internship Not Found</h1>
        <Link
          href="/dashboard/my-internships"
          className="text-primary hover:underline"
        >
          Back to My Internships
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here, you would typically send a PUT or PATCH request to the backend.
    console.log("Updated Internship:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(internship);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Here, you'd make a DELETE request to your backend API.
    console.log("Deleted Internship ID:", internship._id);
    router.push("/dashboard/my-internships");
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/my-internships"
          className="text-primary hover:underline flex items-center gap-2"
        >
          ← Back to My Internships
        </Link>
      </div>

      <div className="bg-card shadow-md border border-gray-600 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            {isEditing ? (
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="text-3xl font-bold mb-2 bg-transparent border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
            )}
            <p className="text-xl text-gray-400">{formData.CompanyName}</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 w-20 bg-primary cursor-pointer hover:bg-secondary transition-colors text-white rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-400">{formData.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Details</h3>
              <div className="space-y-2">
                <p>
                  <strong>Department:</strong>{" "}
                  {isEditing ? (
                    <input
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded bg-gray-600"
                    />
                  ) : (
                    formData.department
                  )}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {isEditing ? (
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded bg-gray-600"
                    />
                  ) : (
                    formData.location
                  )}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {formData.remote ? "Remote" : "On-site"}
                </p>
                <p>
                  <strong>Compensation:</strong>{" "}
                  {formData.paid ? "Paid" : "Unpaid"}
                </p>
                <p>
                  <strong>Positions:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      name="numPositions"
                      value={formData.numPositions}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded w-20 bg-gray-600"
                    />
                  ) : (
                    formData.numPositions
                  )}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Timeline</h3>
              <div className="space-y-2">
                {["startDate", "endDate", "applicationDeadline"].map(
                  (dateField) => (
                    <p key={dateField}>
                      <strong>{dateField.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                      {isEditing ? (
                        <input
                          type="date"
                          name={dateField}
                          value={formData[dateField]}
                          onChange={handleInputChange}
                          className="border px-2 py-1 rounded bg-gray-600"
                        />
                      ) : (
                        new Date(formData[dateField]).toLocaleDateString()
                      )}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {formData.requiredSkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t mt-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Internship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
