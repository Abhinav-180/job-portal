import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Contact, Mail, Pen, Download, FileText, Star } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];
  const hasResume = !!user?.profile?.resume;

  const initials = (user?.fullname || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">

        {/* Profile card */}
        <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-24 bg-gradient-to-r from-[#6A38C2]/40 via-[#8B5CF6]/30 to-[#C026D3]/20" />

          <div className="px-8 pb-8">
            {/* Avatar + edit button row */}
            <div className="flex items-end justify-between -mt-12 mb-5">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-[#0a0a14] rounded-2xl">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                </Avatar>
                {/* Fallback initials */}
                {!user?.profile?.profilePhoto && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold border-4 border-[#0a0a14]">
                    {initials}
                  </div>
                )}
              </div>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200 text-sm font-medium"
              >
                <Pen className="w-3.5 h-3.5" /> Edit Profile
              </button>
            </div>

            {/* Name + bio */}
            <h1 className="text-white text-2xl font-extrabold tracking-tight">{user?.fullname}</h1>
            <p className="text-[#64748b] text-sm mt-1 max-w-lg leading-relaxed">{user?.profile?.bio || "No bio added yet."}</p>

            {/* Divider */}
            <div className="border-t border-white/6 my-6" />

            {/* Contact + Resume row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Contact info */}
              <div className="flex flex-col gap-3">
                <p className="text-white text-xs font-semibold tracking-widest uppercase">Contact</p>
                <a
                  href={`mailto:${user?.email}`}
                  className="flex items-center gap-3 text-[#94a3b8] hover:text-[#a78bfa] transition-colors duration-150 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#6A38C2]/15 border border-[#6A38C2]/25 flex items-center justify-center group-hover:border-[#6A38C2]/50 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
                  </div>
                  {user?.email}
                </a>
                <a
                  href={`tel:${user?.phoneNumber}`}
                  className="flex items-center gap-3 text-[#94a3b8] hover:text-[#a78bfa] transition-colors duration-150 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#6A38C2]/15 border border-[#6A38C2]/25 flex items-center justify-center group-hover:border-[#6A38C2]/50 transition-colors">
                    <Contact className="w-3.5 h-3.5 text-[#a78bfa]" />
                  </div>
                  {user?.phoneNumber || "Not provided"}
                </a>
              </div>

              {/* Resume */}
              <div className="flex flex-col gap-3">
                <p className="text-white text-xs font-semibold tracking-widest uppercase">Resume</p>
                {hasResume ? (
                  <a
                    href={user?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#6A38C2]/30 bg-[#6A38C2]/10 hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/20 transition-all duration-200 group w-fit"
                  >
                    <FileText className="w-4 h-4 text-[#a78bfa]" />
                    <span className="text-[#a78bfa] text-sm font-medium">
                      {user?.profile?.resumeOriginalName || "View Resume"}
                    </span>
                    <Download className="w-3.5 h-3.5 text-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] w-fit">
                    <FileText className="w-4 h-4 text-[#475569]" />
                    <span className="text-[#475569] text-sm">No resume uploaded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <p className="text-white text-xs font-semibold tracking-widest uppercase mb-3">Skills</p>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-[#6A38C2]/30 bg-[#6A38C2]/10 text-[#a78bfa]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[#475569] text-sm">No skills added yet.</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs card */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-4 h-4 text-[#a78bfa]" />
            <h2 className="text-white font-bold text-lg">Applied Jobs</h2>
          </div>
          <AppliedJob />
        </div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;