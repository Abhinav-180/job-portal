import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Mail, Lock, User, Phone, CreditCard, IdCard, ImagePlus, Loader2 } from "lucide-react";

const Field = ({ icon: Icon, label, type = "text", name, value, onChange, placeholder, accept }) => (
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
        accept={accept}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200 file:bg-transparent file:border-0 file:text-[#a78bfa] file:text-xs file:font-medium file:cursor-pointer"
      />
    </div>
  </div>
);

const Register = () => {
  const [input, setInput] = useState({
    fullname: "", email: "", password: "", role: "",
    phoneNumber: "", pancard: "", adharcard: "", file: "",
  });
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) { setInput({ ...input, file }); setFileName(file.name); }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    ["fullname", "email", "password", "pancard", "adharcard", "role", "phoneNumber"].forEach(
      (k) => formData.append(k, input[k])
    );
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#6A38C2] opacity-[0.12] blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#0EA5E9] opacity-[0.07] blur-[100px]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 px-8 py-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs">JP</div>
          <span className="text-xl font-extrabold"><span className="text-white">Job</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">Portal</span></span>
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6A38C2]/40 bg-[#6A38C2]/10 text-[#a78bfa] text-xs font-semibold mb-4">
              ✦ Join thousands of job seekers
            </div>
            <h1 className="text-3xl font-extrabold text-white">Create your account</h1>
            <p className="text-[#64748b] text-sm mt-2">Find your dream job in minutes</p>
          </div>

          <form onSubmit={submitHandler} className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-4 backdrop-blur-sm">

            {/* Two-column row */}
            <div className="grid grid-cols-2 gap-4">
              <Field icon={User} label="Full Name" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="John Doe" />
              <Field icon={Phone} label="Phone Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="+91 9876543210" type="tel" />
            </div>

            <Field icon={Mail} label="Email" name="email" value={input.email} onChange={changeEventHandler} placeholder="johndoe@gmail.com" type="email" />
            <Field icon={Lock} label="Password" name="password" value={input.password} onChange={changeEventHandler} placeholder="••••••••" type="password" />

            <div className="grid grid-cols-2 gap-4">
              <Field icon={CreditCard} label="PAN Card" name="pancard" value={input.pancard} onChange={changeEventHandler} placeholder="ABCDE1234F" />
              <Field icon={IdCard} label="Aadhar Card" name="adharcard" value={input.adharcard} onChange={changeEventHandler} placeholder="1234 5678 9012" />
            </div>

            {/* Role selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {["Student", "Recruiter"].map((role) => (
                  <label
                    key={role}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 text-sm font-medium ${input.role === role
                        ? "border-[#6A38C2]/60 bg-[#6A38C2]/20 text-[#a78bfa]"
                        : "border-white/8 bg-white/[0.02] text-[#64748b] hover:border-white/15 hover:text-white"
                      }`}
                  >
                    <input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} className="sr-only" />
                    <span>{role === "Student" ? "🎓" : "💼"}</span>
                    {role}
                  </label>
                ))}
              </div>
            </div>

            {/* Profile photo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Profile Photo</label>
              <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] cursor-pointer hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/5 transition-all duration-200 group">
                <ImagePlus className="w-4 h-4 text-[#475569] group-hover:text-[#a78bfa] transition-colors" />
                <span className="text-sm text-[#475569] group-hover:text-[#94a3b8] transition-colors">
                  {fileName || "Click to upload photo"}
                </span>
                <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</> : "Create Account"}
            </button>

            <p className="text-center text-[#64748b] text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#a78bfa] hover:text-[#c084fc] font-semibold transition-colors duration-150">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;