import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, ImagePlus } from "lucide-react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";

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

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "", description: "", website: "", location: "", file: null,
  });

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) { setInput({ ...input, file }); setFileName(file.name); }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    ["name", "description", "website", "location"].forEach((k) => formData.append(k, input[k]));
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/admin/companies")}
          className="flex items-center gap-2 text-[#64748b] hover:text-white text-sm mb-8 transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to Companies
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center shrink-0">
            {singleCompany?.logo
              ? <img src={singleCompany.logo} alt="logo" className="w-full h-full object-cover rounded-xl" />
              : <Building2 className="w-5 h-5 text-[#a78bfa]" />
            }
          </div>
          <div>
            <h1 className="text-white text-2xl font-extrabold">Company Setup</h1>
            <p className="text-[#64748b] text-sm mt-0.5">
              {singleCompany?.name ? `Editing ${singleCompany.name}` : "Fill in your company details"}
            </p>
          </div>
        </div>

        {/* Form card */}
        <form onSubmit={submitHandler} className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field icon={Building2} label="Company Name" name="name" value={input.name} onChange={changeEventHandler} placeholder="e.g. Google" />
            <Field icon={Globe} label="Website" name="website" value={input.website} onChange={changeEventHandler} placeholder="https://example.com" />
            <Field icon={MapPin} label="Location" name="location" value={input.location} onChange={changeEventHandler} placeholder="e.g. Bangalore, India" />
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
                placeholder="What does your company do?"
                rows={3}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Logo upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Company Logo</label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] cursor-pointer hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/5 transition-all duration-200 group">
              <ImagePlus className="w-4 h-4 text-[#475569] group-hover:text-[#a78bfa] transition-colors shrink-0" />
              <span className="text-sm text-[#475569] group-hover:text-[#94a3b8] transition-colors truncate">
                {fileName || (singleCompany?.logo ? "Replace current logo" : "Upload company logo")}
              </span>
              <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
            </label>
          </div>

          {/* Divider */}
          <div className="border-t border-white/6" />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                : "Save Changes"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;