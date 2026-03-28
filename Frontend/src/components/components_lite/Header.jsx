import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Search, Sparkles, TrendingUp, Users, Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const ROLES = ["Frontend Developer", "UI/UX Designer", "Data Scientist", "Product Manager", "Backend Engineer", "DevOps Engineer"];

const STATS = [
  { icon: Briefcase, value: "50K+", label: "Live Jobs" },
  { icon: Users, value: "120K+", label: "Hired" },
  { icon: TrendingUp, value: "10K+", label: "Companies" },
];

const TRENDING = ["React", "Python", "Product Design", "Remote", "AI/ML"];

const Header = () => {
  const [query, setQuery] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      setDisplayText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const searchjobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleTrending = (tag) => {
    dispatch(setSearchedQuery(tag));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a14] min-h-[88vh] flex items-center">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#6A38C2] opacity-[0.15] blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-[#C026D3] opacity-[0.10] blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#3B82F6] opacity-[0.08] blur-[90px]" />
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6A38C2]/40 bg-[#6A38C2]/10 text-[#a78bfa] text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          India's #1 Job Hunt Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
          Find Your Next
          <br />
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#818cf8]">
              {displayText}
            </span>
            <span className="animate-pulse text-[#a78bfa]">|</span>
          </span>
        </h1>

        <p className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Thousands of life-changing opportunities are waiting for you. Start your journey today and get hired faster.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center gap-0 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-2 focus-within:border-[#6A38C2]/70 transition-all duration-300 focus-within:bg-white/8 focus-within:shadow-[0_0_0_4px_rgba(106,56,194,0.15)]">
            <Search className="w-5 h-5 text-[#64748b] ml-3 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
              placeholder="Job title, skill, or company..."
              className="flex-1 bg-transparent text-white placeholder:text-[#475569] outline-none text-base py-2 px-1"
            />
            <button
              onClick={searchjobHandler}
              className="shrink-0 bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#7c3aed] hover:to-[#9333ea] text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(106,56,194,0.5)] active:scale-95 text-sm"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Trending tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-14">
          <span className="text-[#64748b] text-sm">Trending:</span>
          {TRENDING.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTrending(tag)}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#cbd5e1] text-xs hover:border-[#6A38C2]/60 hover:bg-[#6A38C2]/15 hover:text-[#a78bfa] transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-[#a78bfa]" style={{ width: 18, height: 18 }} />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg leading-none">{value}</p>
                <p className="text-[#64748b] text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d0d1a] to-transparent z-10" />

      {/* Keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease both; }
      `}</style>
    </section>
  );
};

export default Header;