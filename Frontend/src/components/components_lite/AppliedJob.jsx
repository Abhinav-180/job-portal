import React from "react";
import { useSelector } from "react-redux";
import { CheckCircle2, XCircle, Clock3, Briefcase } from "lucide-react";

const StatusBadge = ({ status }) => {
  const config = {
    accepted: {
      icon: CheckCircle2,
      label: "Accepted",
      className: "bg-[#10B981]/10 text-[#34d399] border-[#10B981]/25",
      iconColor: "text-[#34d399]",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      className: "bg-red-500/10 text-red-400 border-red-500/25",
      iconColor: "text-red-400",
    },
    pending: {
      icon: Clock3,
      label: "Pending",
      className: "bg-[#F59E0B]/10 text-[#fbbf24] border-[#F59E0B]/25",
      iconColor: "text-[#fbbf24]",
    },
  };

  const { icon: Icon, label, className, iconColor } =
    config[status?.toLowerCase()] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${className}`}>
      <Icon className={`w-3 h-3 ${iconColor}`} />
      {label}
    </span>
  );
};

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#475569]" />
        </div>
        <p className="text-white font-semibold text-sm">No applications yet</p>
        <p className="text-[#64748b] text-xs text-center max-w-xs">
          Jobs you apply for will appear here. Start exploring!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/6 bg-white/[0.02]">
            <th className="text-left text-[#64748b] text-xs font-semibold px-4 py-3 tracking-wide">Date</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-4 py-3 tracking-wide">Job Title</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-4 py-3 tracking-wide">Company</th>
            <th className="text-right text-[#64748b] text-xs font-semibold px-4 py-3 tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.map((appliedJob, i) => (
            <tr
              key={appliedJob._id}
              className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150 ${i === allAppliedJobs.length - 1 ? "border-b-0" : ""
                }`}
            >
              <td className="px-4 py-3.5 text-[#64748b] text-xs tabular-nums whitespace-nowrap">
                {appliedJob?.createdAt?.split("T")[0]}
              </td>
              <td className="px-4 py-3.5">
                <span className="text-white font-medium text-sm">{appliedJob.job?.title}</span>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center text-[9px] font-bold text-[#a78bfa] shrink-0">
                    {(appliedJob.job?.company?.name || "?")[0].toUpperCase()}
                  </div>
                  <span className="text-[#94a3b8] text-sm">{appliedJob.job?.company?.name}</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-right">
                <StatusBadge status={appliedJob?.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJob;