import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Mail, Lock, Loader2, Zap } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#6A38C2] opacity-[0.12] blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#C026D3] opacity-[0.08] blur-[100px]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 px-8 py-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs">JP</div>
          <span className="text-xl font-extrabold"><span className="text-white">Job</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">Portal</span></span>
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6A38C2]/40 bg-[#6A38C2]/10 text-[#a78bfa] text-xs font-semibold mb-4">
              <Zap className="w-3 h-3" /> Welcome back
            </div>
            <h1 className="text-3xl font-extrabold text-white">Sign in to your account</h1>
            <p className="text-[#64748b] text-sm mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={submitHandler} className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-sm">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="johndoe@gmail.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#475569] text-sm outline-none focus:border-[#6A38C2]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#6A38C2]/15 transition-all duration-200"
                />
              </div>
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
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      className="sr-only"
                    />
                    <span className="text-base">{role === "Student" ? "🎓" : "💼"}</span>
                    {role}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white font-semibold text-sm hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-[#475569] text-xs">or</span>
              <div className="flex-1 h-px bg-white/6" />
            </div>

            {/* Register link */}
            <p className="text-center text-[#64748b] text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#a78bfa] hover:text-[#c084fc] font-semibold transition-colors duration-150">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;