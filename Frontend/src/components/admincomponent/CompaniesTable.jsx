import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filtered = companies?.filter((company) => {
      if (!searchCompanyByText) return true;
      return company.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filtered || []);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-[#6A38C2] border-t-transparent animate-spin" />
        <span className="text-[#64748b] text-sm">Loading companies...</span>
      </div>
    );
  }

  if (filterCompany.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#475569]" />
        </div>
        <p className="text-white font-semibold text-sm">No companies found</p>
        <p className="text-[#64748b] text-xs text-center max-w-xs">
          {searchCompanyByText ? `No results for "${searchCompanyByText}"` : "Add your first company to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/6 bg-white/[0.02]">
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Logo</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Company Name</th>
            <th className="text-left text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Registered On</th>
            <th className="text-right text-[#64748b] text-xs font-semibold px-5 py-3.5 tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.map((company, i) => {
            const initials = (company.name || "?")
              .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <tr
                key={company._id || company.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150 ${i === filterCompany.length - 1 ? "border-b-0" : ""
                  }`}
              >
                {/* Logo */}
                <td className="px-5 py-4">
                  <div className="w-9 h-9 rounded-xl bg-[#6A38C2]/15 border border-[#6A38C2]/25 flex items-center justify-center overflow-hidden shrink-0">
                    {company.logo ? (
                      <Avatar className="w-9 h-9 rounded-xl">
                        <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                      </Avatar>
                    ) : (
                      <span className="text-[#a78bfa] text-xs font-bold">{initials}</span>
                    )}
                  </div>
                </td>

                {/* Name */}
                <td className="px-5 py-4">
                  <p className="text-white font-semibold text-sm">{company.name}</p>
                  {company.website && (
                    <p className="text-[#64748b] text-xs mt-0.5 truncate max-w-[200px]">{company.website}</p>
                  )}
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-[#64748b] text-xs tabular-nums">
                  {company.createdAt?.split("T")[0]}
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.02] flex items-center justify-center text-[#64748b] hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-150 ml-auto">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 bg-[#0f0f1e] border border-white/10 shadow-2xl rounded-xl p-1.5">
                      <button
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[#94a3b8] hover:text-white transition-colors duration-150 text-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#a78bfa]" />
                        Edit Company
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer count */}
      <div className="px-5 py-3 border-t border-white/6 bg-white/[0.01]">
        <p className="text-[#475569] text-xs">
          {filterCompany.length} {filterCompany.length === 1 ? "company" : "companies"} registered
        </p>
      </div>
    </div>
  );
};

export default CompaniesTable;