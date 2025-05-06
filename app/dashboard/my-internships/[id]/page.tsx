"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2Icon, PencilIcon, ArrowLeft, Eye } from "lucide-react";

import { useAuth } from "@/app/_context/AuthContext";
import { InternshipResponse } from "@/app/_lib/api";
import Spinner from "@/app/_components/Spinner";

export default function InternshipDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { getMypostedInternshipDetail, editMyInternship, deleteInternship } =
    useAuth();
  const [internshipDetail, setInternshipDetail] =
    useState<InternshipResponse>();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<any>({});

  useEffect(() => {
    const fetchInternshipDetail = async () => {
      try {
        const internship = await getMypostedInternshipDetail(id);
        setInternshipDetail(internship);

        setUpdatedData((prev) =>
          Object.keys(prev).length === 0 ? internship.internship : prev
        );
      } catch (error) {
        console.error("Error fetching internship detail:", error);
      }
    };

    fetchInternshipDetail();
  }, []);

  const hasApplicants = internshipDetail?.internship?.applicants.length;

  const handleViewApplicants = () => {
    router.push(`/dashboard/my-internships/${id}/applicants`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (!confirm) return;

    try {
      await deleteInternship(id);
      router.push("/dashboard/my-internships");
    } catch (error) {
      console.error("Error deleting internship:", error);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | number
  ) => {
    setUpdatedData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedInternship = await editMyInternship(id, updatedData);
      setInternshipDetail(updatedInternship);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating internship:", error);
    }
  };

  if (!internshipDetail) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner text="loading Internship Detail" />
      </div>
    );
  }

  const data = internshipDetail.internship;

  return (
    <div className="mx-auto px-4 py-8 h-[75vh]">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/dashboard/my-internships"
          className="text-primary text-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        <h1 className="text-2xl">Internship Detail</h1>
      </div>

      <div className="bg-card shadow-md border border-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={updatedData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-3xl font-bold mb-2 text-white bg-gray-800 p-2 rounded"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2 text-white">
                {data.title}
              </h1>
            )}
            {isEditing ? (
              <input
                type="text"
                value={updatedData.CompanyName}
                onChange={(e) =>
                  handleInputChange("CompanyName", e.target.value)
                }
                className="text-xl text-gray-400 bg-gray-800 p-2 rounded"
              />
            ) : (
              <p className="text-xl text-gray-400">{data.CompanyName}</p>
            )}
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-primary flex items-center text-white px-4 py-2 rounded w-20 cursor-pointer hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PencilIcon className="w-5 h-5 inline mr-1" />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>
            {isEditing ? (
              <textarea
                value={updatedData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="text-gray-400 bg-gray-800 p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-400">{data.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Details</h3>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Department:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      className="bg-gray-800 p-1 rounded"
                    />
                  ) : (
                    data.department
                  )}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="bg-gray-800 p-1 rounded"
                    />
                  ) : (
                    data.location
                  )}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {isEditing ? (
                    <select
                      value={updatedData.remote ? "Remote" : "On-site"}
                      onChange={(e) =>
                        handleInputChange("remote", e.target.value === "Remote")
                      }
                      className="bg-gray-800 p-1 rounded"
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                  ) : data.remote ? (
                    "Remote"
                  ) : (
                    "On-site"
                  )}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(data.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(data.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Compensation:</strong>{" "}
                  {isEditing ? (
                    <select
                      value={updatedData.paid ? "Paid" : "Unpaid"}
                      onChange={(e) =>
                        handleInputChange("paid", e.target.value === "Paid")
                      }
                      className="bg-gray-800 p-1 rounded"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  ) : data.paid ? (
                    "Paid"
                  ) : (
                    "Unpaid"
                  )}
                </p>
                <p>
                  <strong>Positions:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={updatedData.numPositions}
                      onChange={(e) =>
                        handleInputChange(
                          "numPositions",
                          Number(e.target.value)
                        )
                      }
                      className="bg-gray-800 p-1 rounded"
                    />
                  ) : (
                    data.numPositions
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-t border-gray-700 pt-4 flex items-center justify-between">
            <button
              disabled={!hasApplicants}
              onClick={handleViewApplicants}
              className="flex items-center  bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="w-5 h-5 inline" />
              {hasApplicants ? "View Applicants" : "No Applicants"}
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 transition-colors"
            >
              <Trash2Icon className="w-5 h-5 inline" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
