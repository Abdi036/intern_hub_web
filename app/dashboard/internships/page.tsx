"use client";

import InternshipCard from "@/app/_components/InternshipCard";
import { useAuth } from "@/app/_context/AuthContext";
import { Internship } from "@/app/_lib/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const { getAllInternships } = useAuth();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    []
  );

  const applyFilters = () => {
    let filtered = internships;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) => {
        const matchesRemote = selectedTypes.includes("remote")
          ? item.remote
          : true;
        const matchesPaid = selectedTypes.includes("paid") ? item.paid : true;
        const matchesFullTime = selectedTypes.includes("full-time")
          ? item.department.toLowerCase().includes("full-time")
          : true;
        const matchesPartTime = selectedTypes.includes("part-time")
          ? item.department.toLowerCase().includes("part-time")
          : true;

        return (
          matchesRemote && matchesPaid && matchesFullTime && matchesPartTime
        );
      });
    }

    setFilteredInternships(filtered);
  };

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { internships } = await getAllInternships();
        setInternships(internships);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };
    fetchInternships();
  }, [getAllInternships]);

  return (
    <div className="space-y-4 md:space-y-6 p-4 sm:p-6 flex flex-col">
      {/* title card */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          Browse Internships
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Find your perfect internship opportunity.
        </p>
      </div>

      {/* main card */}
      <div className="flex flex-col gap-6 w-full">
        {/* Filters */}
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
                />
              </div>
            </div>

            {/* Type */}
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
                      className="h-4 w-4 text-primary border-gray-500 rounded focus:ring-primary"
                      checked={selectedTypes.includes(type)}
                      onChange={() =>
                        setSelectedTypes((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        )
                      }
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

            {/* Apply Button */}
            <div className="w-full md:w-auto">
              <button
                onClick={applyFilters}
                className="w-full md:w-auto bg-primary hover:bg-secondary text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Internships */}
        {(filteredInternships.length > 0
          ? filteredInternships
          : internships
        ).map((internship, index) => (
          <InternshipCard key={index} internship={internship} />
        ))}
      </div>
    </div>
  );
}
