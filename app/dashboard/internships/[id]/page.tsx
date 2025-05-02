"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const { applyForInternship, loading } = useAuth();

  const { id } = useParams() as { id: string };

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      alert("PDF file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);
    if (portfolio) {
      formData.append("portfolio", portfolio);
    }

    try {
      if (!id) {
        alert("Invalid internship ID.");
        return;
      }
      await applyForInternship(id, formData);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying:", error);
    }
    router.push("/dashboard/internships");
    setPdfFile(null);
    setPortfolio("");
  };

  return (
    <div className="bg-gray-900 text-gray-200 w-full p-4 min-h-screen">
      <div className="w-full rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-secondary px-6 py-4 border-b border-gray-600 flex items-center gap-5">
          <Link
            href={"/dashboard/internships"}
            className="flex items-center gap-2 cursor-pointer text-primary text-2xl font-semibold"
          >
            <ArrowLeft />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-primary">Document Upload</h1>
          <p className="text-gray-400 mt-1">
            Upload your PDF files and portfolio information
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* PDF Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">PDF Upload</h2>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition hover:border-primary">
              <div className="flex flex-col items-center justify-center space-y-3">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-gray-400">Drag and drop your PDF here</p>
                <p className="text-sm text-gray-500">or</p>
                <label className="px-4 py-2 bg-primary hover:bg-secondary rounded-md cursor-pointer transition">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    required
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
              </div>
            </div>

            {/* Portfolio Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="portfolio"
                className="text-sm font-medium text-gray-300"
              >
                Portfolio Link (optional)
              </label>
              <input
                type="url"
                id="portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="w-full cursor-pointer bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
