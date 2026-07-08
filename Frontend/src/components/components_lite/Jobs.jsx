import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const query = searchedQuery.toLowerCase().trim();

    // Check if query is a salary range like "0-50k", "50k-100k", "100k-200k", "200k+"
    const salaryMatch = query.match(/^(\d+)k?-(\d+)k\+?$|^(\d+)k\+$/);
    if (salaryMatch) {
      let minSalary, maxSalary;
      if (salaryMatch[3]) {
        // Pattern: "200k+"
        minSalary = parseInt(salaryMatch[3]) * 1000;
        maxSalary = Infinity;
      } else {
        // Pattern: "0-50k" or "50k-100k"
        minSalary = parseInt(salaryMatch[1]) * (salaryMatch[0].includes('k') && !salaryMatch[0].startsWith(salaryMatch[1] + 'k') ? 1 : 1);
        maxSalary = parseInt(salaryMatch[2]) * 1000;
        // Handle cases like "0-50k" where first number has no k
        if (salaryMatch[1] && !query.startsWith(salaryMatch[1] + 'k')) {
          minSalary = parseInt(salaryMatch[1]);
        } else {
          minSalary = parseInt(salaryMatch[1]) * 1000;
        }
      }
      // Convert LPA salary to comparable value (salary in DB is in LPA, filter is in k)
      // Salary in DB: 25 means 25 LPA = 2500000 per year = ~2500k? No, let's treat filter as LPA too
      // Actually filter values are "0-50k", "50k-100k" — these seem to be in thousands (₹ per month?) or annual
      // Since DB stores salary as LPA (e.g. 25), let's convert filter to LPA:
      // 0-50k => 0-50 LPA, 50k-100k => 50-100 LPA, 100k-200k => 100-200 LPA, 200k+ => 200+ LPA
      minSalary = parseInt(salaryMatch[3] || salaryMatch[1]);
      maxSalary = salaryMatch[3] ? Infinity : parseInt(salaryMatch[2]);
      
      setFilterJobs(
        allJobs.filter((job) => {
          const sal = parseFloat(job.salary);
          if (isNaN(sal)) return false;
          return sal >= minSalary && sal <= maxSalary;
        })
      );
      return;
    }

    // Check if query is an experience range like "0-3 years", "3-5 years", "5-7 years", "7+ years"
    const expMatch = query.match(/^(\d+)-(\d+)\s*years?$|^(\d+)\+\s*years?$/);
    if (expMatch) {
      const minExp = parseInt(expMatch[3] || expMatch[1]);
      const maxExp = expMatch[3] ? Infinity : parseInt(expMatch[2]);
      setFilterJobs(
        allJobs.filter((job) => {
          const exp = parseFloat(job.experienceLevel ?? job.experience);
          if (isNaN(exp)) return false;
          return exp >= minExp && exp <= maxExp;
        })
      );
      return;
    }

    // Default: text-based search across multiple fields
    setFilterJobs(
      allJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.jobType?.toLowerCase().includes(query) ||
          job.company?.name?.toLowerCase().includes(query)
      )
    );
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">
                {filterJobs.length}
              </span>{" "}
              Jobs Available
            </h1>
            <p className="text-[#64748b] text-sm mt-0.5">
              {searchedQuery ? `Filtered by "${searchedQuery}"` : "Browse all open positions"}
            </p>
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex lg:hidden items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 bg-white/[0.03] text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filter sidebar — desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/6 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#a78bfa]" />
                <span className="text-white text-sm font-semibold">Filters</span>
              </div>
              <div className="p-4">
                <FilterCard />
              </div>
            </div>
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                  onClick={() => setMobileFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-72 bg-[#0f0f1e] border-r border-white/8 z-50 lg:hidden overflow-y-auto"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                    <span className="text-white font-semibold flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#a78bfa]" /> Filters
                    </span>
                    <button onClick={() => setMobileFilterOpen(false)} className="text-[#64748b] hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5">
                    <FilterCard />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Job results */}
          <div className="flex-1 min-w-0">
            {filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl">💼</div>
                <p className="text-white font-semibold">No jobs match your filters</p>
                <p className="text-[#64748b] text-sm text-center max-w-xs">Try adjusting your filters or search with different keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id || job.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Job1 job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;