import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import { ArrowLeft, Building2, Loader2, ArrowRight } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-lg mx-auto px-6 py-16 flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center mb-6">
          <Building2 className="w-7 h-7 text-[#a78bfa]" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-white text-3xl font-extrabold mb-2">Register a Company</h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-sm">
            Start by giving your company a name. You'll be able to add more details like logo, website, and location in the next step.
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Google, Amazon, Infosys..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cancel
            </button>
            <button
              onClick={registerNewCompany}
              disabled={loading || !companyName.trim()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
                : <><span>Continue</span><ArrowRight className="w-3.5 h-3.5" /></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;