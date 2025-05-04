// "use client";

// import { ArrowLeft } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import React from "react";

// export default function Page() {
//   const { applicantId } = useParams() as { applicantId: string };
//   const router = useRouter();

//   // Simulated response data (can be replaced by fetched data)
//   const data = {
//     name: "Abdi K",
//     email: "abdi@gmail.com",
//     application: {
//       coverLetter:
//         "https://res.cloudinary.com/dayiizyiu/raw/upload/v1746265248/cover-letters/ufb8qfpc13jcc5o1jnob.pdf",
//       portfolio: "https://abdikumela.com",
//       appliedAt: "2025-05-03T09:40:48.569Z",
//     },
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-6 h-14 text-white p-4">
//         <button
//           onClick={router.back}
//           className="flex items-center text-primary hover:font-bold cursor-pointer transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5" />
//           Back
//         </button>
//         <p className="text-2xl font-bold">Applicants Detail</p>
//       </div>
//       <div className="flex justify-center items-center bg-gray-900 text-white px-4">
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
//           {/* Top Section: Name & Email */}
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
//             <p className="text-sm text-gray-400">{data.email}</p>
//           </div>

//           {/* Application Details */}
//           <div className="space-y-3">
//             <div>
//               <span className="font-semibold text-gray-300">Applied At: </span>
//               <span>
//                 {new Date(data.application.appliedAt).toLocaleString()}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-300">Portfolio: </span>
//               <a
//                 href={data.application.portfolio}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline"
//               >
//                 {data.application.portfolio}
//               </a>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-300">
//                 Cover Letter:{" "}
//               </span>
//               <a
//                 href={data.application.coverLetter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline"
//               >
//                 View PDF
//               </a>
//             </div>
//           </div>

//           {/* User ID */}
//           <div className="mt-6 text-sm text-gray-500">
//             <p>
//               User ID: <span className="text-white">{applicantId}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { ArrowLeft, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  // Simulated response data (can be replaced by fetched data)
  const data = {
    name: "Abdi K",
    email: "abdi@gmail.com",
    application: {
      coverLetter:
        "https://res.cloudinary.com/dayiizyiu/raw/upload/v1746265248/cover-letters/ufb8qfpc13jcc5o1jnob.pdf",
      portfolio: "https://abdikumela.com",
      appliedAt: "2025-05-03T09:40:48.569Z",
    },
  };

  const handleAccept = () => {
    console.log("Applicant accepted");
  };

  const handleReject = () => {
    // Add your reject logic here
    console.log("Applicant rejected");
  };

  return (
    <div>
      <div className="flex items-center gap-6 h-14 text-white p-4">
        <button
          onClick={router.back}
          className="flex items-center text-primary hover:font-bold cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <p className="text-2xl font-bold">Applicants Detail</p>
      </div>
      <div className="flex justify-center items-center bg-gray-900 text-white px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          {/* Top Section: Name & Email */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
            <p className="text-sm text-gray-400">{data.email}</p>
          </div>

          {/* Application Details */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-300">Applied At: </span>
              <span>
                {new Date(data.application.appliedAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-300">Portfolio: </span>
              <a
                href={data.application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {data.application.portfolio}
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-300">
                Cover Letter:{" "}
              </span>
              <a
                href={data.application.coverLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View PDF
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAccept}
              className="flex items-center gap-2 bg-primary hover:bg-slate-700 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-200"
            >
              <Check className="h-5 w-5" />
              Accept
            </button>
            <button
              onClick={handleReject}
              className="flex items-center gap-2 bg-primary hover:bg-slate-700 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-200"
            >
              <X className="h-5 w-5" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
