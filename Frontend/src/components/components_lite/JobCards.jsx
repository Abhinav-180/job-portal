import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Users, ArrowUpRight } from "lucide-react";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  // Generate a consistent color from company name
  const colors = [
    { bg: "#6A38C2", light: "rgba(106,56,194,0.15)", border: "rgba(106,56,194,0.35)" },
    { bg: "#0EA5E9", light: "rgba(14,165,233,0.15)", border: "rgba(14,165,233,0.35)" },
    { bg: "#10B981", light: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.35)" },
    { bg: "#EC4899", light: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.35)" },
    { bg: "#F59E0B", light: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.35)" },
    { bg: "#8B5CF6", light: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.35)" },
  ];
  const color = colors[(job?.name?.charCodeAt(0) || 0) % colors.length];

  const initials = (job?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative flex flex-col gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 cursor-pointer transition-all duration-250 overflow-hidden"
    >
      {/* Hover top-edge glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${color.bg}, transparent)` }}
      />

      {/* Company row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo / initials */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ background: color.light, border: `1px solid ${color.border}`, color: color.bg }}
          >
            {initials}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{job?.name || "Company"}</p>
            <p className="text-[#64748b] text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {job?.location || "India"}
            </p>
          </div>
        </div>

        {/* Arrow icon */}
        <div className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:border-white/20 -translate-x-1 group-hover:translate-x-0">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#94a3b8]" />
        </div>
      </div>

      {/* Job title + description */}
      <div>
        <h3 className="text-white font-bold text-base leading-snug mb-1.5">{job?.title}</h3>
        <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2">
          {job?.description || "No description provided."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-auto pt-1 border-t border-white/6">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0EA5E9]/10 text-[#38bdf8] border border-[#0EA5E9]/20">
          <Users className="w-3 h-3" />
          {job?.position} Positions
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#10B981]/10 text-[#34d399] border border-[#10B981]/20">
          <DollarSign className="w-3 h-3" />
          {job?.salary} LPA
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#8B5CF6]/10 text-[#a78bfa] border border-[#8B5CF6]/20">
          <Briefcase className="w-3 h-3" />
          {job?.jobType}
        </span>
      </div>
    </div>
  );
};

export default JobCards;