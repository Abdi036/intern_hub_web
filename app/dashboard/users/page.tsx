"use client";

import Spinner from "@/app/_components/Spinner";
/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/app/_context/AuthContext";
import { User } from "@/app/_lib/api";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import defaultUser from "@/public/default-user.jpg";
export default function UsersPage() {
  const { getAllUsers, deleteUser, user, loading } = useAuth();
  const [usersList, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  function handleDeleteUser(userId: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      deleteUser(userId)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  }

  if (user?.role !== "admin") {
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
    <div className="p-6 min-h-screen bg-gray-900">
      <h2 className="text-2xl font-semibold text-white mb-6 px-4">
        InternHub Users
      </h2>

      {loading ? (
        <div>
          <Spinner text="loading users" />
        </div>
      ) : (
        <div className="grid gap-4 px-4">
          {usersList.map((user) => {
            const isCompany = user.role === "company";
            const userCard = (
              <div
                key={user._id}
                className={`relative bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4 border border-gray-700 transition-transform duration-200 ${
                  isCompany
                    ? "cursor-pointer hover:ring-2 hover:ring-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user?.photo && user?.photo !== "default-user.jpg"
                        ? user.photo
                        : defaultUser.src
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <span className="text-xs mt-1 inline-block text-green-400 bg-green-900 px-2 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                    {"   "}
                    {user.role === "company" && (
                      <span
                        className={`text-xs mt-1 inline-block px-2 py-1 rounded-full capitalize
                          ${
                            user.approved === "pending"
                              ? "text-yellow-400 bg-yellow-900"
                              : user.approved === "approved"
                              ? "text-green-400 bg-green-900"
                              : user.approved === "rejected"
                              ? "text-red-400 bg-red-900"
                              : "text-gray-400 bg-gray-700"
                          }
                        `}
                      >
                        {user.approved}
                      </span>
                    )}
                  </div>
                </div>
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="flex items-center justify-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5 " />
                    Delete
                  </button>
                )}
              </div>
            );

            return isCompany ? (
              <Link
                key={user._id}
                href={`/dashboard/users/${user._id}`}
                className="block"
                prefetch={false}
              >
                {userCard}
              </Link>
            ) : (
              userCard
            );
          })}
        </div>
      )}
    </div>
  );
}
