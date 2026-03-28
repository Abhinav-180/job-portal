import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import Navbar from "./Navbar";

const sections = [
  {
    title: "1. Introduction",
    content:
      "This Privacy Policy outlines how we collect, use, and protect your information when you visit our Job Portal. By using our platform, you agree to the collection and use of information in accordance with this policy.",
  },
  {
    title: "2. Information We Collect",
    items: [
      "Full name, email address, and phone number",
      "Resume / CV and profile photo",
      "IP address, browser type, and pages visited",
      "Time spent on pages and usage analytics",
    ],
  },
  {
    title: "3. How We Use Your Information",
    items: [
      "To provide and maintain our services",
      "To notify you about changes to our platform",
      "To match you with relevant job opportunities",
      "To provide recruiter and applicant support",
      "To improve our services through analytics",
      "To detect and prevent technical issues or fraud",
    ],
  },
  {
    title: "4. Data Security",
    content:
      "We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it. Your data is encrypted in transit and at rest.",
  },
  {
    title: "5. Sharing Your Information",
    content:
      "We do not sell or rent your personal information to third parties. We may share your information only with:",
    items: [
      "Recruiters and companies you apply to",
      "Service providers who assist in operating our platform",
      "Law enforcement agencies if required by law",
    ],
  },
  {
    title: "6. Your Rights",
    content: "You have the right to:",
    items: [
      "Access your personal information at any time",
      "Request correction of inaccurate data",
      "Request deletion of your account and data",
      "Opt out of non-essential communications",
    ],
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update our Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised date.",
  },
  {
    title: "8. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please reach out to us at abhinavsingh180904@gmail.com — we typically respond within 48 hours.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6A38C2] opacity-[0.07] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#64748b] hover:text-white text-sm mb-10 transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#6A38C2]/20 border border-[#6A38C2]/30 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#a78bfa]" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-extrabold">Privacy Policy</h1>
            <p className="text-[#64748b] text-sm mt-1">Last updated: March 2025</p>
          </div>
        </div>

        {/* Intro card */}
        <div className="p-5 rounded-2xl border border-[#6A38C2]/25 bg-[#6A38C2]/8 mb-8">
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            Your privacy matters to us. This document explains what data we collect, why we collect it, and how we keep it safe. Please read it carefully.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6A38C2] shrink-0" />
                <h2 className="text-white font-bold text-base">{section.title}</h2>
              </div>
              {section.content && (
                <p className="text-[#94a3b8] text-sm leading-relaxed pl-4">{section.content}</p>
              )}
              {section.items && (
                <ul className="flex flex-col gap-2 pl-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-[#94a3b8] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6A38C2] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[#475569] text-xs mt-10">
          © {new Date().getFullYear()} JobPortal · Built by{" "}
          <a href="https://github.com/Abhinav-180" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#c084fc] transition-colors">
            Abhinav Singh
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;