"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { Internship } from "@/app/_lib/api";
import Link from "next/link";
import { useState } from "react";

export default function PostInternshipPage() {
  const { postinternship, user, loading } = useAuth();

  type InternshipFormData = Omit<
    Internship,
    "_id" | "applicants" | "createdAt"
  >;
  const [formData, setFormData] = useState<InternshipFormData>({
    title: "",
    CompanyName: "",
    department: "",
    startDate: "",
    endDate: "",
    description: "",
    requiredSkills: [] as string[],
    location: "",
    remote: false,
    paid: false,
    numPositions: 1,
    applicationDeadline: "",
    companyId: {
      _id: user?._id || "",
    },
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const addSkill = () => {
    if (newSkill && !formData.requiredSkills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postinternship({
        ...formData,
        _id: "",
        applicants: [],
        createdAt: new Date().toISOString(),
      });
      alert("Internship posted successfully! 🎇🎇🎇");
      // Reset form after submission
      setFormData({
        title: "",
        CompanyName: "",
        department: "",
        startDate: "",
        endDate: "",
        description: "",
        requiredSkills: [],
        location: "",
        remote: false,
        paid: false,
        numPositions: 1,
        applicationDeadline: "",
        companyId: {
          _id: user?._id || "",
        },
      });
    } catch (error) {
      console.error("Failed to post internship:", error);
    }
  };

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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Post Internship</h1>
      <p className="text-gray-600">
        Create a new internship opportunity for students.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-card shadow p-6 rounded-md"
      >
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="CompanyName"
            placeholder="Company Name"
            value={formData.CompanyName}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-white font-medium text-sm mb-1"
              >
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-white font-medium text-sm mb-1"
              >
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
              />
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Internship Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
            rows={5}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remote"
              checked={formData.remote}
              onChange={handleChange}
              id="remote"
            />
            <label htmlFor="remote" className="text-white">
              Remote Position
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="paid"
              checked={formData.paid}
              onChange={handleChange}
              id="paid"
            />
            <label htmlFor="paid" className="text-white">
              Paid Position
            </label>
          </div>

          <input
            type="number"
            name="numPositions"
            min={1}
            value={Number(formData.numPositions)}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
            placeholder="Number of Positions"
          />

          <label
            htmlFor="applicationDeadline"
            className="text-white font-medium text-sm block"
          >
            Application Deadline:
          </label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
          />

          <input
            type="text"
            name="companyId"
            defaultValue={formData.companyId._id ?? ""}
            placeholder="Company ID"
            className="w-full border-gray-800 rounded px-4 py-2 bg-gray-800 text-white cursor-not-allowed"
          />

          {/* Required Skills Section */}
          <div>
            <label className="font-medium text-white">Required Skills</label>
            <div className="flex flex-wrap gap-2 my-2">
              {formData.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add skill"
                className="flex-grow border-gray-800 rounded px-4 py-2 bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary cursor-pointer transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Post Internship"}
          </button>
        </div>
      </form>
    </div>
  );
}
