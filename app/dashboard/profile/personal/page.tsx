/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useState, useRef, useEffect } from "react";
import profileImage from "@/public/profile-image.png";

export default function PersonalInfoPage() {
  const { loading, user, updatePersonalInfo, error, setError } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoto(user.photo || "");
      setImageError(false);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const formData = new FormData();

      // Only append fields that have been changed
      if (name !== user?.name) formData.append("name", name);
      if (email !== user?.email) formData.append("email", email);
      if (selectedFile) formData.append("photo", selectedFile);

      if (
        formData.has("name") ||
        formData.has("email") ||
        formData.has("photo")
      ) {
        await updatePersonalInfo(formData);
      }
    } catch (error) {
      console.error("Failed to update personal info:", error);
    }
  };

  // Format the photo URL

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center">
        <div
          onClick={handleImageClick}
          className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition-all"
        >
          {!imageError ? (
            <img
              src={photo || profileImage.src}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <img
                src={profileImage.src}
                alt="Profile"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <p className="text-xs text-gray-400 mt-2">Change your profile photo</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border-2 border-gray-600 p-2 shadow-sm"
          placeholder="name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          disabled={true}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded border-2 border-gray-600 p-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="email"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-400 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
