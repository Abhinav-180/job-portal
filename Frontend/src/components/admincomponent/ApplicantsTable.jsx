import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, FileText, Users, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const applications = applicants?.applications || [];

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  // Initials helper
  const initials = (name = "?") =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // Avatar color from name
  const avatarColors = [
    { bg: "rgba(106,56,194,0.2)", border: "rgba(106,56,194,0.35)", text: "#a78bfa" },
    { bg: "rgba(14,165,233,0.2)", border: "rgba(14,165,233,0.35)", text: "#38bdf8" },
    { bg: "rgba(16,185,129,0.2)", border: "rgba(16,185,129,0.35)", text: "#34d399" },
    { bg: "rgba(236,72,153,0.2)", border: "rgba(236,72,153,0.35)", text: "#f472b6" },
    { bg: "rgba(245,158,11,0.2)", border: "rgba(245,158,11,0.35)", text: "#fbbf24" },
  ];
  const colorFor = (name = "") => avatarColors[name.charCodeAt(0) % avatarColors.length];

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
          <Users className="w-6 h-6 text-[#475569]" />
        </div>
        <p className="text-white font-semibold text-sm">No applicants yet</p>
        <p className="text-[#64748b] text-xs text-center max-w-xs">
          Candidates who apply for this job will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/6 bg-white/[0.02]">
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Applicant</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Email</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Contact</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Resume</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Applied On</th>
            <th className="text-right text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item, i) => {
            const name = item?.applicant?.fullname || "Unknown";
            const color = colorFor(name);

            return (
              <tr
                key={item._id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150 ${i === applications.length - 1 ? "border-b-0" : ""
                  }`}
              >
                {/* Applicant */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}
                    >
                      {initials(name)}
                    </div>
                    <span className="text-white font-medium text-sm">{name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-4">
                  <a
                    href={`mailto:${item?.applicant?.email}`}
                    className="text-[#94a3b8] hover:text-[#a78bfa] text-sm transition-colors duration-150"
                  >
                    {item?.applicant?.email}
                  </a>
                </td>

                {/* Contact */}
                <td className="px-5 py-4 text-[#94a3b8] text-sm">
                  {item?.applicant?.phoneNumber || "—"}
                </td>

                {/* Resume */}
                <td className="px-5 py-4">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#6A38C2]/30 bg-[#6A38C2]/10 text-[#a78bfa] text-xs font-medium hover:bg-[#6A38C2]/20 transition-colors duration-150"
                    >
                      <FileText className="w-3 h-3" /> Download
                    </a>
                  ) : (
                    <span className="text-[#475569] text-xs">No resume</span>
                  )}
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-[#64748b] text-xs tabular-nums">
                  {item?.applicant?.createdAt?.split("T")[0]}
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
                      <p className="text-[#475569] text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
                        Update Status
                      </p>
                      <div className="my-1 border-t border-white/6" />
                      {shortlistingStatus.map((status) => (
                        <button
                          key={status}
                          onClick={() => statusHandler(status, item?._id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-sm ${status === "Accepted"
                              ? "text-[#94a3b8] hover:bg-[#10B981]/10 hover:text-[#34d399]"
                              : "text-[#94a3b8] hover:bg-red-500/10 hover:text-red-400"
                            }`}
                        >
                          {status === "Accepted"
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />
                            : <XCircle className="w-3.5 h-3.5 text-red-400" />
                          }
                          {status}
                        </button>
                      ))}
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
          {applications.length} {applications.length === 1 ? "applicant" : "applicants"} total
        </p>
      </div>
    </div>
  );
};

export default ApplicantsTable;