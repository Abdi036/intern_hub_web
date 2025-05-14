"use client";
import Spinner from "@/app/_components/Spinner";
import { useAuth } from "@/app/_context/AuthContext";
import { companyDetail } from "@/app/_lib/api";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const id = useParams().company as string;
  const [userDetail, setUserDetail] = useState<companyDetail>();
  const { getUser, approveCompany, loading } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUserDetail(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this user?"
    );
    if (!confirmed) return;
    try {
      await approveCompany(id, "approved");
      const response = await getUser(id);
      setUserDetail(response);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this user?"
    );
    if (!confirmed) return;
    try {
      await approveCompany(id, "rejected");
      const response = await getUser(id);
      setUserDetail(response);
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Spinner text="Loading user detail" />
        </div>
      ) : (
        <div className="text-gray-200 w-full p-4 h-[80vh]">
          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            <Link
              href={"/dashboard/users"}
              className="flex items-center gap-2 cursor-pointer text-primary text-2xl font-semibold  transition-colors"
            >
              <ArrowLeft size={24} />
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-200">
              Company Approval Letter
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2">
              <span className="text-sm font-medium text-gray-400">Name:</span>
              <span className="text-base font-semibold text-gray-100">
                {userDetail?.user.name}
              </span>
            </div>
            <div className="flex items-center gap-3 pb-2">
              <span className="text-sm font-medium text-gray-400">Email:</span>
              <span className="text-base text-gray-100">
                {userDetail?.user.email}
              </span>
            </div>
            <div className="flex items-center gap-3 pb-2">
              <span className="text-sm font-medium text-gray-400">Role:</span>
              <span className="text-base text-gray-100">
                {userDetail?.user.role}
              </span>
            </div>
            <div className="flex items-center gap-3 pb-2">
              <span className="text-sm font-medium text-gray-400">Status:</span>
              <span
                className={`text-base font-semibold ${
                  userDetail?.user.approved === "approved"
                    ? "text-green-500"
                    : userDetail?.user.approved === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {userDetail?.user.approved}
              </span>
            </div>

            <div className="flex items-center gap-3 pb-2">
              <span className="text-sm font-medium text-gray-400">
                Approval Letter:
              </span>
              <span className="text-base text-gray-100">
                {userDetail?.user.approvalLetter ? (
                  <Link
                    href={userDetail.user.approvalLetter}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    View Approval Letter
                  </Link>
                ) : (
                  <span className="text-gray-400">No Approval Letter</span>
                )}
              </span>
            </div>
            {/* Approve and Reject Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                disabled={
                  userDetail?.user.approved !== "pending" ||
                  userDetail?.user.approvalLetter === undefined ||
                  false
                }
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                Approve
              </button>
              <button
                disabled={
                  userDetail?.user.approved !== "pending" ||
                  userDetail?.user.approvalLetter === undefined ||
                  false
                }
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle size={20} />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
