// import { Building, Calendar, Eye } from "lucide-react";
// import { Application } from "@/app/_lib/api";

// export default function ApplicationCard({
//   application,
// }: {
//   application: Application;
// }) {
//   return (
//     <div className="border-gray-600 rounded-lg shadow-sm p-4 bg-card">
//       <div className="flex justify-between items-start mb-2">
//         <div>
//           <h2 className="text-lg font-semibold">{application.title}</h2>
//           <div className="flex items-center text-sm text-gray-300 mt-1">
//             <Building className="mr-1" />
//             {application.companyName}
//           </div>
//         </div>
//         <span
//           className={`px-3 py-1 text-xs rounded-full font-semibold ${
//             application.applicationStatus === "pending"
//               ? "bg-amber-200 text-amber-800"
//               : application.applicationStatus === "accepted"
//               ? "bg-green-400 text-green-800"
//               : "bg-red-400 text-red-800"
//           }
//             `}
//         >
//           {application.applicationStatus}
//         </span>
//       </div>
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-300">
//         <div className="flex items-center mb-2 sm:mb-0">
//           <Calendar className="mr-1" />
//           DeadLine: {application.applicationDeadline.split("T")[0]}
//         </div>
//         <div className="flex gap-2">
//           <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-500 transition-colors cursor-pointer">
//             <Eye className="mr-1" />
//             View Application Detail
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Building, Calendar, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Application } from "@/app/_lib/api";

export default function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/dashboard/applications/${application.internshipId}`);
  };

  return (
    <div className="border-gray-600 rounded-lg shadow-sm p-4 bg-card">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-semibold">{application.title}</h2>
          <div className="flex items-center text-sm text-gray-300 mt-1">
            <Building className="mr-1" />
            {application.companyName}
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            application.applicationStatus === "pending"
              ? "bg-amber-200 text-amber-800"
              : application.applicationStatus === "accepted"
              ? "bg-green-400 text-green-800"
              : "bg-red-400 text-red-800"
          }`}
        >
          {application.applicationStatus}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-300">
        <div className="flex items-center mb-2 sm:mb-0">
          <Calendar className="mr-1" />
          DeadLine: {application.applicationDeadline.split("T")[0]}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex items-center px-3 py-1 border rounded hover:bg-gray-500 transition-colors cursor-pointer"
          >
            <Eye className="mr-1" />
            View Application Detail
          </button>
        </div>
      </div>
    </div>
  );
}
