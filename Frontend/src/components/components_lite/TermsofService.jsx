import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "./Navbar";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to JobPortal. These Terms and Conditions govern your use of our platform. By accessing or using our website, you agree to comply with these terms. Please read them carefully before using our services.",
  },
  {
    title: "2. Acceptance of Terms",
    content:
      "By using our website, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree with any part of these terms, you must not use our platform.",
  },
  {
    title: "3. Changes to Terms",
    content:
      "We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes your acceptance of the new terms.",
  },
  {
    title: "4. User Responsibilities",
    items: [
      "Use the platform only for lawful purposes",
      "Not infringe the rights of other users or third parties",
      "Provide accurate and up-to-date information in your profile",
      "Keep your account credentials secure and confidential",
      "Not attempt to access unauthorized areas of the platform",
    ],
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content, trademarks, and intellectual property on the website are owned by or licensed to JobPortal. You may not reproduce, distribute, or create derivative works from any content without our express written permission.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, JobPortal shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or inability to access it.",
  },
  {
    title: "7. Governing Law",
    content:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of India.",
  },
  {
    title: "8. Contact Information",
    content:
      "If you have any questions about these Terms and Conditions, please contact us at abhinavsingh180904@gmail.com. We typically respond within 48 hours.",
  },
];

const TermsofService = () => {
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
            <FileText className="w-5 h-5 text-[#a78bfa]" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-extrabold">Terms of Service</h1>
            <p className="text-[#64748b] text-sm mt-1">Last updated: March 2025</p>
          </div>
        </div>

        {/* Intro card */}
        <div className="p-5 rounded-2xl border border-[#6A38C2]/25 bg-[#6A38C2]/8 mb-8">
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            These terms govern your use of JobPortal. By continuing to use our platform, you agree to be bound by these terms. Please review them carefully.
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
          <a
            href="https://github.com/Abhinav-180"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a78bfa] hover:text-[#c084fc] transition-colors"
          >
            Abhinav Singh
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsofService;