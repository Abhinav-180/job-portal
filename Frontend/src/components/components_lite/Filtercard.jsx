import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: "📍",
    array: ["Delhi", "Mumbai", "Kolhapur", "Pune", "Bangalore", "Hyderabad", "Chennai", "Remote"],
  },
  {
    filterType: "Technology",
    icon: "💻",
    array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "Frontend", "Backend", "Mobile", "Desktop"],
  },
  {
    filterType: "Experience",
    icon: "🎯",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    icon: "💰",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    const next = selectedValue === value ? "" : value;
    setSelectedValue(next);
    dispatch(setSearchedQuery(next));
  };

  const clearFilter = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-white text-xs font-semibold uppercase tracking-widest">Filters</p>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-[#a78bfa] text-xs hover:text-white transition-colors duration-150"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Active filter pill */}
      {selectedValue && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#6A38C2]/15 border border-[#6A38C2]/30">
          <span className="text-[#a78bfa] text-xs font-medium truncate flex-1">{selectedValue}</span>
          <button onClick={clearFilter} className="text-[#a78bfa] hover:text-white shrink-0">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Filter sections */}
      {filterData.map((section, i) => (
        <div key={i} className="flex flex-col gap-2">
          {/* Section label */}
          <div className="flex items-center gap-2 pb-1 border-b border-white/6">
            <span className="text-sm">{section.icon}</span>
            <p className="text-white text-xs font-semibold">{section.filterType}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-1">
            {section.array.map((item, j) => {
              const isSelected = selectedValue === item;
              return (
                <button
                  key={j}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150 ${isSelected
                      ? "bg-[#6A38C2]/20 border border-[#6A38C2]/40 text-[#a78bfa]"
                      : "text-[#94a3b8] hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                >
                  {/* Radio dot */}
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${isSelected
                        ? "border-[#a78bfa] bg-[#6A38C2]"
                        : "border-white/20"
                      }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;