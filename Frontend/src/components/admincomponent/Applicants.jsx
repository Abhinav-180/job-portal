import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import { ArrowLeft, Users } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const count = applicants?.applications?.length ?? 0;

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-[#64748b] hover:text-white text-sm mb-8 transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back to Jobs
        </button>

        {/* Page header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#a78bfa]" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-extrabold">Applicants</h1>
            <p className="text-[#64748b] text-sm mt-0.5">
              {count > 0
                ? `${count} candidate${count !== 1 ? "s" : ""} applied for this position`
                : "No applications yet for this job"}
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;