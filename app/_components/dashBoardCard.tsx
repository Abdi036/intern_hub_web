import { FileTextIcon, User2 } from "lucide-react";

export default function DashBoardCard({
  title,
  applications,
}: {
  title: string;
  applications: number;
}) {
  return (
    <div>
      <div className="bg-card p-4 rounded-lg shadow-md flex-col justify-center items-center h-[100px]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">{title}</h2>
          {title === "Student" ||
          title === "Company" ||
          title === "Admin" ||
          title === "Total Applicants" ||
          title === "Total Users" ? (
            <User2 />
          ) : (
            <FileTextIcon />
          )}
        </div>
        <div className="mt-2 text-2xl font-bold text-center">
          {applications}
        </div>
      </div>
    </div>
  );
}
