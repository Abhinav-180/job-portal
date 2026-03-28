import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const navigate = useNavigate();

  return (
    <section className="bg-[#0a0a14] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A38C2]/15 border border-[#6A38C2]/30 text-[#a78bfa] text-xs font-semibold tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3" /> Fresh Picks
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Latest &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">
                Top Openings
              </span>
            </h2>
            <p className="text-[#64748b] text-sm mt-2">
              Handpicked opportunities updated daily — apply before they're gone.
            </p>
          </div>

          <button
            onClick={() => navigate("/browse")}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all duration-200 group"
          >
            View all jobs
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Job grid */}
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl">
              💼
            </div>
            <p className="text-[#64748b] text-sm">No job openings available right now.</p>
            <button
              onClick={() => navigate("/browse")}
              className="px-5 py-2 rounded-lg bg-[#6A38C2]/20 border border-[#6A38C2]/30 text-[#a78bfa] text-sm hover:bg-[#6A38C2]/30 transition-all duration-200"
            >
              Browse all jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs
              .slice(0, 6)
              .filter((job) => job?._id)
              .map((job) => (
                <JobCards key={job._id} job={job} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;