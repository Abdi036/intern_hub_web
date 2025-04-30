"use client";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold">
            404
          </div>
        </div>

        <h1 className="mt-8 text-3xl md:text-5xl font-bold text-white">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white max-w-2xl">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Return to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
