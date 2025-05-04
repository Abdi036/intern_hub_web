import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[65vh]">
      <Spinner text="loading applicants" />
    </div>
  );
}
