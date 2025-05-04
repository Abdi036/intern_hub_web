import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[65vh]">
      <Spinner text="Loading..." />
    </div>
  );
}
