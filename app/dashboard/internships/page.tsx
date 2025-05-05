"use client";

import InternshipCard from "@/app/_components/InternshipCard";
import Spinner from "@/app/_components/Spinner";
import { useAuth } from "@/app/_context/AuthContext";
import { Internship } from "@/app/_lib/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Page() {
  const { getAllInternships, loading } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const remote = searchParams.get("remote") === "true";
  const paid = searchParams.get("paid") === "true";

  // Fetch internships with current query filters + page
  const fetchInternships = async (pageNumber = 1) => {
    try {
      const query: Record<string, any> = { page: pageNumber };
      if (searchParams.get("remote")) query.remote = remote;
      if (searchParams.get("paid")) query.paid = paid;

      const { internships: newInternships, pagination } =
        await getAllInternships(query);

      if (pageNumber === 1) {
        setInternships(newInternships);
      } else {
        setInternships((prev) => [...prev, ...newInternships]);
      }

      setHasMore(pagination.page < pagination.pages);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  // Fetch when query changes or page resets
  useEffect(() => {
    setPage(1);
    setInternships([]); // Clear old results when filters change
    fetchInternships(1);
  }, [searchParams.toString()]);

  const handleFilterChange = (type: string) => {
    const current = new URLSearchParams(searchParams.toString());
    if (current.get(type) === "true") {
      current.delete(type);
    } else {
      current.set(type, "true");
    }

    // Reset page and push new URL
    current.delete("page");
    router.push(`${pathname}?${current.toString()}`);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchInternships(nextPage);
  };

  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="space-y-4 md:space-y-6 p-4 sm:p-6 flex flex-col">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          Browse Internships
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Find your perfect internship opportunity.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between border border-gray-500 rounded-lg shadow-md p-4 sm:p-6 bg-card">
            {/* Search */}
            <div className="w-full md:w-1/3">
              <label
                htmlFor="search"
                className="block text-sm font-semibold text-gray-300 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="search"
                  type="search"
                  placeholder="Search internships..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Type Filters */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Type
              </label>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3">
                {["remote", "paid"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={type}
                      className="h-4 w-4 text-primary border-gray-500 rounded focus:ring-primary cursor-pointer"
                      checked={searchParams.get(type) === "true"}
                      onChange={() => handleFilterChange(type)}
                    />
                    <label
                      htmlFor={type}
                      className="text-sm capitalize text-gray-300"
                    >
                      {type.replace("-", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Internship Cards */}
        {loading && page === 1 ? (
          <div className="flex items-center justify-center w-full h-64">
            <Spinner text="Loading internships..." />
          </div>
        ) : (
          <>
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship, index) => (
                <InternshipCard key={index} internship={internship} />
              ))
            ) : (
              <p className="text-gray-300 text-center mt-4">
                No internships match your search.
              </p>
            )}
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="bg-primary hover:bg-secondary text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer transition duration-200"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
