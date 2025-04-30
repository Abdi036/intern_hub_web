import { Building, MapPin, Search } from "lucide-react";

export default function InternshipsPage() {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6 flex flex-col">
      {/* title card */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Browse Internships
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Find your perfect internship opportunity.
        </p>
      </div>

      {/* main card */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
        {/* Filters Card - Fixed */}
        <div className="w-full lg:w-[250px] flex-shrink-0">
          <div className="border rounded-lg shadow-sm p-4 space-y-4 lg:space-y-6 lg:sticky lg:top-6">
            <h2 className="text-lg md:text-xl font-semibold">Filters</h2>

            {/* Search */}
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="search"
                  type="search"
                  placeholder="Search internships..."
                  className="pl-8 w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">
                {["remote", "paid", "full-time", "part-time"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input type="checkbox" id={type} className="h-4 w-4" />
                    <label htmlFor={type} className="text-sm capitalize">
                      {type.replace("-", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary text-sm font-medium">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Internship Cards - Scrollable */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-9rem)] p-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-lg shadow-sm">
              <div className="p-3 md:p-4 border-b flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    Software Engineering Intern
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Building className="mr-1 h-4 w-4" />
                    TechCorp Inc.
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 self-start">
                  New
                </span>
              </div>
              <div className="p-3 md:p-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  San Francisco, CA (On-site)
                </div>
                <p className="text-sm">
                  Join our engineering team to build cutting-edge software
                  solutions. You&apos;ll work on real projects and gain valuable
                  experience in software development.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["React", "JavaScript", "Node.js"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 md:p-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm">
                  <span className="font-medium">$25/hr</span>
                  <span className="text-gray-500"> · Posted 2 days ago</span>
                </div>
                <button className="bg-primary text-white py-1.5 px-4 rounded hover:bg-accent text-sm font-medium self-start sm:self-auto">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
