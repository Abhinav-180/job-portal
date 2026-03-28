import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Loader2, ArrowLeft, Briefcase, MapPin, DollarSign,
  Users, FileText, Layers, Clock, Tag, Building2, AlertCircle,
} from "lucide-react";

const Field = ({ icon: Icon, label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200"
      />
    </div>
  </div>
);

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", requirements: "", salary: "",
    location: "", jobType: "", experience: "", position: 0, companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const selectChangeHandler = (e) => {
    const selected = companies.find((c) => c._id === e.target.value);
    if (selected) setInput({ ...input, companyId: selected._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-[#64748b] hover:text-white text-sm mb-8 transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back to Jobs
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-[#a78bfa]" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-extrabold">Post a New Job</h1>
            <p className="text-[#64748b] text-sm mt-0.5">Fill in the details to attract the right candidates</p>
          </div>
        </div>

        {/* No companies warning */}
        {companies.length === 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Please register a company first before posting a job.
          </div>
        )}

        <form onSubmit={submitHandler} className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5">

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field icon={Briefcase} label="Job Title" name="title" value={input.title} onChange={changeEventHandler} placeholder="e.g. Senior React Developer" />
            <Field icon={MapPin} label="Location" name="location" value={input.location} onChange={changeEventHandler} placeholder="e.g. Bangalore, Remote" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field icon={DollarSign} label="Salary (LPA)" name="salary" value={input.salary} onChange={changeEventHandler} placeholder="e.g. 25" type="number" />
            <Field icon={Users} label="Open Positions" name="position" value={input.position} onChange={changeEventHandler} placeholder="e.g. 3" type="number" />
            <Field icon={Clock} label="Experience (yrs)" name="experience" value={input.experience} onChange={changeEventHandler} placeholder="e.g. 2" type="number" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field icon={Tag} label="Job Type" name="jobType" value={input.jobType} onChange={changeEventHandler} placeholder="Full-Time / Remote / Contract" />
            <Field icon={Layers} label="Requirements" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="React, Node.js, MongoDB…" />
          </div>

          {/* Description — full width */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-[#475569]" />
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Describe the role, responsibilities, and what you're looking for…"
                rows={4}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Company selector */}
          {companies.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Company</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none" />
                <select
                  onChange={selectChangeHandler}
                  defaultValue=""
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200 appearance-none cursor-pointer"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled className="bg-[#0f0f1e] text-[#475569]">Select a company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id} className="bg-[#0f0f1e] text-white">
                      {company.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] text-xs">▾</div>
              </div>
            </div>
          )}

          <div className="border-t border-white/6" />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || companies.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting…</> : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;