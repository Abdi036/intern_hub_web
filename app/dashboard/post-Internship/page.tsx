"use client";

import { useState } from "react";

export default function PostInternshipPage() {
  const [formData, setFormData] = useState({
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
    companyId: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const val = type === "checkbox" ? target.checked : value;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Send `formData` to API
  };

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
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="CompanyName"
            placeholder="Company Name"
            value={formData.CompanyName}
            onChange={handleChange}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
            />
          </div>

          <textarea
            name="description"
            placeholder="Internship Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
            rows={5}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remote"
              checked={formData.remote}
              onChange={handleChange}
              id="remote"
            />
            <label htmlFor="remote">Remote Position</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="paid"
              checked={formData.paid}
              onChange={handleChange}
              id="paid"
            />
            <label htmlFor="paid">Paid Position</label>
          </div>

          <input
            type="number"
            name="numPositions"
            value={formData.numPositions}
            onChange={handleChange}
            min={1}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
            placeholder="Number of Positions"
          />

          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />

          <input
            type="text"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            placeholder="Company ID"
            className="w-full border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
          />

          <div>
            <label className="font-medium">Required Skills</label>
            <div className="flex flex-wrap gap-2 my-2">
              {formData.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
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
                className="flex-grow border-gray-800  rounded px-4 py-2 bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
          >
            Post Internship
          </button>
        </div>
      </form>
    </div>
  );
}
