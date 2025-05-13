"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadImagePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  console.log(selectedImage);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file (JPG, PNG, etc.)");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 w-full p-4 min-h-screen">
      <div className="w-full rounded-xl shadow-2xl overflow-hidden">
        <p className="text-gray-400 mt-2">
          Upload your Approval Letter image file (JPG, PNG, etc.)
        </p>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">
              Image Upload <span className="text-red-500">*</span>
            </h2>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition hover:border-primary">
              <div className="flex flex-col items-center justify-center space-y-3">
                <p className="text-gray-400">Drag and drop your image here</p>
                <p className="text-sm text-gray-500">or</p>
                <label className="px-4 py-2 bg-primary hover:bg-secondary rounded-md cursor-pointer transition">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
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
              className="w-full cursor-pointer bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-800 transition-color"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
