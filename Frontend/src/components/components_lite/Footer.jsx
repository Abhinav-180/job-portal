import React from "react";
import { Github, Linkedin, Mail, Briefcase, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a14] border-t border-white/6 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#6A38C2] opacity-[0.07] blur-[80px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs">
                JP
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">Job</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">Portal</span>
              </span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-xs">
              India's #1 platform connecting top talent with life-changing opportunities. Built with passion by Abhinav Singh.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://github.com/Abhinav-180"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-[#64748b] hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com/in/abhinav-singh-9b5006318"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-[#64748b] hover:text-[#38bdf8] hover:border-[#0EA5E9]/40 hover:bg-[#0EA5E9]/10 transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:abhinavsingh180904@gmail.com"
                className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-[#64748b] hover:text-[#f87171] hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-sm font-semibold tracking-wide">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/Home" },
                { label: "Browse Jobs", to: "/Browse" },
                { label: "All Jobs", to: "/Jobs" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#64748b] hover:text-[#a78bfa] text-sm transition-colors duration-150 flex items-center gap-1 group w-fit"
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-sm font-semibold tracking-wide">Legal</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#64748b] hover:text-[#a78bfa] text-sm transition-colors duration-150 flex items-center gap-1 group w-fit"
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#475569] text-xs">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <p className="text-[#475569] text-xs flex items-center gap-1.5">
            Designed &amp; Developed by
            <a
              href="https://github.com/Abhinav-180"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a78bfa] hover:text-[#c084fc] transition-colors duration-150 font-medium"
            >
              Abhinav Singh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;