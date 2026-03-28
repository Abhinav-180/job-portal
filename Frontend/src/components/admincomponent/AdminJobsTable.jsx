import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Briefcase } from "lucide-react";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filtered = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      const q = searchJobByText.toLowerCase();
      return (
        job.title?.toLowerCase().includes(q) ||
        job?.company?.name?.toLowerCase().includes(q)
      );
    });
    setFilterJobs(filtered || []);
  }, [allAdminJobs, searchJobByText]);

  // Color per job type
  const typeColor = (type = "") => {
    const t = type.toLowerCase();
    if (t.includes("remote")) return { bg: "rgba(16,185,129,0.1)", text: "#34d399", border: "rgba(16,185,129,0.25)" };
    if (t.includes("full")) return { bg: "rgba(106,56,194,0.1)", text: "#a78bfa", border: "rgba(106,56,194,0.25)" };
    if (t.includes("contract")) return { bg: "rgba(245,158,11,0.1)", text: "#fbbf24", border: "rgba(245,158,11,0.25)" };
    return { bg: "rgba(14,165,233,0.1)", text: "#38bdf8", border: "rgba(14,165,233,0.25)" };
  };

  if (!allAdminJobs) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-[#6A38C2] border-t-transparent animate-spin" />
        <span className="text-[#64748b] text-sm">Loading jobs...</span>
      </div>
    );
  }

  if (filterJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#475569]" />
        </div>
        <p className="text-white font-semibold text-sm">No jobs found</p>
        <p className="text-[#64748b] text-xs text-center max-w-xs">
          {searchJobByText ? `No results for "${searchJobByText}"` : "Post your first job to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/6 bg-white/[0.02]">
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Company</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Role</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Type</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Posted</th>
            <th className="text-right text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.map((job, i) => {
            const colors = typeColor(job?.jobType);
            const initials = (job?.company?.name || "?")
              .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <tr
                key={job._id || job.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150 ${i === filterJobs.length - 1 ? "border-b-0" : ""
                  }`}
              >
                {/* Company */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6A38C2]/15 border border-[#6A38C2]/25 flex items-center justify-center text-[#a78bfa] text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="text-white font-medium text-sm">{job?.company?.name}</span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <p className="text-white text-sm font-semibold">{job.title}</p>
                  {job.location && (
                    <p className="text-[#64748b] text-xs mt-0.5">📍 {job.location}</p>
                  )}
                </td>

                {/* Job type badge */}
                <td className="px-5 py-4">
                  <span
                    className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border"
                    style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
                  >
                    {job?.jobType || "N/A"}
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-[#64748b] text-xs tabular-nums">
                  {job.createdAt?.split("T")[0]}
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.02] flex items-center justify-center text-[#64748b] hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-150 ml-auto">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 bg-[#0f0f1e] border border-white/10 shadow-2xl rounded-xl p-1.5">
                      <button
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[#94a3b8] hover:text-white transition-colors duration-150 text-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#a78bfa]" />
                        Edit Job
                      </button>
                      <div className="my-1 border-t border-white/6" />
                      <button
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[#94a3b8] hover:text-white transition-colors duration-150 text-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
                        View Applicants
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/6 bg-white/[0.01]">
        <p className="text-[#475569] text-xs">
          {filterJobs.length} {filterJobs.length === 1 ? "job" : "jobs"} posted
        </p>
      </div>
    </div>
  );
};

export default AdminJobsTable;