import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, MapPin, DollarSign, Users, Briefcase, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const daysAgo = (mongodbTime) => {
    const diff = new Date() - new Date(mongodbTime);
    const days = Math.floor(diff / (1000 * 24 * 60 * 60));
    return days === 0 ? "Today" : `${days}d ago`;
  };

  // Color from company name
  const colors = [
    { bg: "rgba(106,56,194,0.15)", border: "rgba(106,56,194,0.35)", text: "#6A38C2" },
    { bg: "rgba(14,165,233,0.15)", border: "rgba(14,165,233,0.35)", text: "#0EA5E9" },
    { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.35)", text: "#10B981" },
    { bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.35)", text: "#EC4899" },
    { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.35)", text: "#F59E0B" },
    { bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.35)", text: "#8B5CF6" },
  ];
  const color = colors[(job?.company?.name?.charCodeAt(0) || 0) % colors.length];
  const initials = (job?.company?.name || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="group relative flex flex-col gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-250 overflow-hidden cursor-pointer">
      {/* Top glow on hover */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${color.text}, transparent)` }}
      />

      {/* Top row — time + bookmark */}
      <div className="flex items-center justify-between">
        <span className="text-[#64748b] text-xs">{daysAgo(job?.createdAt)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${saved
              ? "border-[#6A38C2]/50 bg-[#6A38C2]/20 text-[#a78bfa]"
              : "border-white/8 bg-white/[0.02] text-[#475569] hover:border-white/20 hover:text-white"
            }`}
        >
          {saved
            ? <BookmarkCheck className="w-3.5 h-3.5" />
            : <Bookmark className="w-3.5 h-3.5" />
          }
        </button>
      </div>

      {/* Company row */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-105"
          style={{ background: color.bg, border: `1px solid ${color.border}` }}
        >
          {job?.company?.logo ? (
            <Avatar className="w-10 h-10 rounded-xl">
              <AvatarImage src={job.company.logo} className="object-cover" />
            </Avatar>
          ) : (
            <span className="text-xs font-bold" style={{ color: color.text }}>{initials}</span>
          )}
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{job?.company?.name}</p>
          <p className="text-[#64748b] text-xs mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> India
          </p>
        </div>
        {/* Arrow appears on hover */}
        <div className="ml-auto w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:border-white/20 -translate-x-1 group-hover:translate-x-0">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#94a3b8]" />
        </div>
      </div>

      {/* Job title + description */}
      <div>
        <h3 className="text-white font-bold text-base leading-snug mb-1.5">{job?.title}</h3>
        <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0EA5E9]/10 text-[#38bdf8] border border-[#0EA5E9]/20">
          <Users className="w-3 h-3" /> {job?.position} Positions
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#8B5CF6]/10 text-[#a78bfa] border border-[#8B5CF6]/20">
          <Briefcase className="w-3 h-3" /> {job?.jobType}
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#10B981]/10 text-[#34d399] border border-[#10B981]/20">
          <DollarSign className="w-3 h-3" /> {job?.salary} LPA
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-white/6">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 py-2 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/5 text-xs font-medium transition-all duration-200"
        >
          View Details
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${saved
              ? "bg-[#6A38C2]/30 border border-[#6A38C2]/50 text-[#a78bfa]"
              : "bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white hover:shadow-[0_4px_15px_rgba(106,56,194,0.4)]"
            }`}
        >
          {saved ? "Saved ✓" : "Save for Later"}
        </button>
      </div>
    </div>
  );
};

export default Job1;