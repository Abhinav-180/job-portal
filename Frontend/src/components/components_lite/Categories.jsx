import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Code2, Server, Layers, Database, BarChart2, Cloud,
  Brain, ShieldCheck, Cpu, Package, Palette, PenTool,
  Film, Figma,
} from "lucide-react";

const Category = [
  { label: "Frontend Developer", icon: Code2, color: "#6A38C2" },
  { label: "Backend Developer", icon: Server, color: "#0EA5E9" },
  { label: "Full Stack Developer", icon: Layers, color: "#10B981" },
  { label: "MERN Developer", icon: Database, color: "#F59E0B" },
  { label: "Data Scientist", icon: BarChart2, color: "#EC4899" },
  { label: "DevOps Engineer", icon: Cloud, color: "#14B8A6" },
  { label: "Machine Learning Engineer", icon: Brain, color: "#8B5CF6" },
  { label: "AI Engineer", icon: Cpu, color: "#F97316" },
  { label: "Cybersecurity Engineer", icon: ShieldCheck, color: "#EF4444" },
  { label: "Product Manager", icon: Package, color: "#06B6D4" },
  { label: "UX/UI Designer", icon: Figma, color: "#A855F7" },
  { label: "Graphics Designer", icon: Palette, color: "#F43F5E" },
  { label: "Video Editor", icon: Film, color: "#84CC16" },
  { label: "Graphic Engineer", icon: PenTool, color: "#FB923C" },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-[#0d0d1a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#6A38C2]/15 border border-[#6A38C2]/30 text-[#a78bfa] text-xs font-semibold tracking-widest uppercase mb-4">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Browse by Category
          </h2>
          <p className="text-[#64748b] text-base max-w-md mx-auto">
            Discover thousands of jobs across the most in-demand tech roles.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Category.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => searchjobHandler(label)}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 text-center active:scale-95"
              style={{ "--cat-color": color }}
            >
              {/* Icon bubble */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="text-[#cbd5e1] text-xs font-medium leading-snug group-hover:text-white transition-colors duration-200">
                {label}
              </span>

              {/* Subtle hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${color}18 0%, transparent 70%)`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;