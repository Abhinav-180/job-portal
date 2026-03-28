import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-4 h-4 text-[#a78bfa]" />
            <span className="text-[#a78bfa] text-xs font-semibold tracking-widest uppercase">Search Results</span>
          </div>
          <h1 className="text-white text-3xl font-extrabold">
            {allJobs.length}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">
              {allJobs.length === 1 ? "Job" : "Jobs"} Found
            </span>
          </h1>
          <p className="text-[#64748b] text-sm mt-1">
            Showing all available positions matching your search.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/6 mb-8" />

        {/* Grid */}
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl">🔍</div>
            <p className="text-white font-semibold">No results found</p>
            <p className="text-[#64748b] text-sm text-center max-w-xs">Try searching with different keywords or browse all categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <Job1 key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;