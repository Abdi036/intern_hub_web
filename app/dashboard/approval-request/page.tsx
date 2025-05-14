"use client";

import { useAuth } from "@/app/_context/AuthContext";
import Image from "next/image";
import { useState } from "react";

export default function UploadImagePage() {
  const { approvalRequest, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file (JPG, PNG, etc.)");
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("approvalLetter", selectedImage);

    try {
      setIsSubmitting(true);
      setUploadMessage(null);
      await approvalRequest(formData);
      setUploadMessage("Upload successful!");
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 w-full p-4 min-h-screen">
      <div className="w-full rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <p className="text-gray-400 mt-2">
            <span className="text-2xl font-bold">Note: </span>
            Take a photo of your approval letter and upload it here.Your
            approval Image should have your company seal on it and should be
            clear,readable and in good quality Upload your Approval Letter image
            file (JPG, PNG, etc.)
          </p>

          <div
            className={`${
              user?.approved === "pending"
                ? "bg-yellow-400"
                : user?.approved === "approved"
                ? "bg-green-500"
                : user?.approved === "rejected"
                ? "bg-red-500"
                : "bg-gray-400"
            } rounded-full px-4 py-1 text-sm font-semibold text-gray-900`}
          >
            <h1 className="text-gray-600">{user?.approved}</h1>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">
              Approval Letter Upload <span className="text-red-500">*</span>
            </h2>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition hover:border-primary">
              <div className="flex flex-col items-center justify-center space-y-3">
                <p className="text-gray-400">Drag and drop your image here</p>
                <p className="text-sm text-gray-500">or</p>
                <label className="px-4 py-2 bg-primary hover:bg-secondary rounded-md cursor-pointer transition">
                  <span>Browse Files</span>
                  <input
                    disabled={user?.approved === "pending"}
                    type="file"
                    accept="image/*"
                    className="hidden disabled:cursor-not-allowed"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-xs text-gray-500">
                  Accepted: JPG, PNG | Max: 5MB
                </p>
              </div>
            </div>

            {/* Preview Image */}
            {imagePreview && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Selected Image Preview:
                </p>
                <Image
                  src={imagePreview}
                  width={300}
                  height={300}
                  alt="Selected preview"
                  className="mx-auto rounded-lg max-h-64 border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              disabled={
                user?.approved === "approved" ||
                user?.approved === "rejected" ||
                isSubmitting
              }
              onClick={handleSubmit}
              className={`w-full cursor-pointer ${
                isSubmitting ? "bg-gray-600" : "bg-primary hover:bg-secondary"
              } text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-800 transition-color disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Uploading..." : "Submit"}
            </button>
          </div>
          {uploadMessage && (
            <p
              className={`mt-2 text-center ${
                uploadMessage.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {uploadMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
