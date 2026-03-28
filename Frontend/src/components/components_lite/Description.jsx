import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import {
  MapPin, DollarSign, Briefcase, Users, Clock,
  CalendarDays, CheckCircle2, ArrowLeft, Zap,
} from "lucide-react";

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-150">
    <div className="w-8 h-8 rounded-lg bg-[#6A38C2]/15 border border-[#6A38C2]/25 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-3.5 h-3.5 text-[#a78bfa]" />
    </div>
    <div>
      <p className="text-[#64748b] text-xs font-medium">{label}</p>
      <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
    </div>
  </div>
);

const Description = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some((a) => a.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    setApplying(true);
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        dispatch(setSingleJob({
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        }));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some((a) => a.applicant === user?._id)
          );
        } else {
          setError("Failed to fetch job.");
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#6A38C2] border-t-transparent animate-spin" />
          <p className="text-[#64748b] text-sm">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !singleJob) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl">⚠️</div>
          <p className="text-white font-semibold">Could not load job</p>
          <p className="text-[#64748b] text-sm">{error}</p>
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 text-[#a78bfa] text-sm hover:bg-[#6A38C2]/30 transition-all">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const details = [
    { icon: Users, label: "Open Positions", value: `${singleJob?.position} Positions` },
    { icon: MapPin, label: "Location", value: singleJob?.location },
    { icon: DollarSign, label: "Salary", value: `${singleJob?.salary} LPA` },
    { icon: Briefcase, label: "Job Type", value: singleJob?.jobType },
    { icon: Clock, label: "Experience", value: `${singleJob?.experienceLevel} Year${singleJob?.experienceLevel > 1 ? "s" : ""}` },
    { icon: Users, label: "Total Applicants", value: singleJob?.applications?.length ?? 0 },
    { icon: CalendarDays, label: "Posted On", value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#64748b] hover:text-white text-sm mb-8 transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Header card */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-white text-2xl font-extrabold leading-tight">{singleJob?.title}</h1>
                  <p className="text-[#64748b] text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {singleJob?.location}
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0EA5E9]/10 text-[#38bdf8] border border-[#0EA5E9]/20">
                      <Users className="w-3 h-3" /> {singleJob?.position} Positions
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#10B981]/10 text-[#34d399] border border-[#10B981]/20">
                      <DollarSign className="w-3 h-3" /> {singleJob?.salary} LPA
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#8B5CF6]/10 text-[#a78bfa] border border-[#8B5CF6]/20">
                      <Briefcase className="w-3 h-3" /> {singleJob?.jobType}
                    </span>
                  </div>
                </div>

                {/* Apply button */}
                <button
                  onClick={isApplied ? undefined : applyJobHandler}
                  disabled={isApplied || applying}
                  className={`shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${isApplied
                      ? "bg-[#10B981]/15 border border-[#10B981]/30 text-[#34d399] cursor-default"
                      : "bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-95"
                    } ${applying ? "opacity-70 cursor-wait" : ""}`}
                >
                  {isApplied ? (
                    <><CheckCircle2 className="w-4 h-4" /> Applied</>
                  ) : applying ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Applying…</>
                  ) : (
                    <><Zap className="w-4 h-4" /> Apply Now</>
                  )}
                </button>
              </div>
            </div>

            {/* Description card */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6A38C2]" />
                Job Description
              </h2>
              <p className="text-[#94a3b8] text-sm leading-relaxed whitespace-pre-line">
                {singleJob?.description}
              </p>
            </div>
          </div>

          {/* Right — details sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6A38C2]" />
                Job Details
              </h2>
              <div className="flex flex-col gap-2">
                {details.map(({ icon, label, value }) => (
                  <Detail key={label} icon={icon} label={label} value={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;