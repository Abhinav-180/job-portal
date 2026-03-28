import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = user?.role === "Recruiter"
    ? [{ to: "/admin/companies", label: "Companies" }, { to: "/admin/jobs", label: "Jobs" }]
    : [{ to: "/Home", label: "Home" }, { to: "/Browse", label: "Browse" }, { to: "/Jobs", label: "Jobs" }];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#0a0a14]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs shrink-0">
              JP
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-white">Job</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">Portal</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(to)
                      ? "bg-[#6A38C2]/20 text-[#a78bfa]"
                      : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:shadow-[0_4px_15px_rgba(106,56,194,0.5)] transition-all duration-200 active:scale-95">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-2 py-1 rounded-xl border border-white/10 hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/10 transition-all duration-200">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                    </Avatar>
                    <span className="text-sm text-[#cbd5e1] font-medium pr-1">{user?.fullname?.split(" ")[0]}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 bg-[#0f0f1e] border border-white/10 shadow-2xl rounded-2xl p-0 overflow-hidden">
                  {/* Profile header */}
                  <div className="p-4 border-b border-white/8 flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <p className="text-white font-semibold text-sm">{user?.fullname}</p>
                      <p className="text-[#64748b] text-xs mt-0.5 line-clamp-1">{user?.profile?.bio || "No bio yet"}</p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="p-2">
                    {user?.role === "Student" && (
                      <Link to="/Profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[#94a3b8] hover:text-white transition-colors duration-150 text-sm">
                        <User2 className="w-4 h-4" />
                        View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-[#94a3b8] hover:text-red-400 transition-colors duration-150 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#94a3b8] hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a0a14]/95 backdrop-blur-xl border-t border-white/8 px-6 py-4 flex flex-col gap-2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium ${isActive(to) ? "bg-[#6A38C2]/20 text-[#a78bfa]" : "text-[#94a3b8]"
                  }`}
              >
                {label}
              </Link>
            ))}
            {!user ? (
              <div className="flex gap-2 mt-2">
                <Link to="/login" className="flex-1">
                  <button className="w-full py-2 rounded-lg border border-white/10 text-sm text-[#94a3b8]">Login</button>
                </Link>
                <Link to="/register" className="flex-1">
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white text-sm font-semibold">Register</button>
                </Link>
              </div>
            ) : (
              <button onClick={logoutHandler} className="flex items-center gap-2 text-sm text-red-400 px-4 py-2.5 mt-1">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        )}
      </nav>
      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;