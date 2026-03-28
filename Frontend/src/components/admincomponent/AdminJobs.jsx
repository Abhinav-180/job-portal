import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Plus, Search, Briefcase } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#a78bfa]" />
              <span className="text-[#a78bfa] text-xs font-semibold tracking-widest uppercase">Admin</span>
            </div>
            <h1 className="text-white text-3xl font-extrabold">Posted Jobs</h1>
            <p className="text-[#64748b] text-sm mt-1">Manage all your job listings</p>
          </div>

          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-95 transition-all duration-200 shrink-0"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input
            type="text"
            placeholder="Filter by title or company..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200"
          />
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;