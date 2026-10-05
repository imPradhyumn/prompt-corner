"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.length > 0)
      router.push(`?q=${encodeURIComponent(searchQuery)}`);
    else router.replace(`/`);
  };

  return (
    <div
      className="my-5 mx-auto flex h-[44px] w-full max-w-[500px] 
    items-center gap-3 rounded-full border border-[#172234] bg-white 
    px-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-[#7b8492]"
      >
        <circle
          cx="11"
          cy="11"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M16 16L20 20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search using keywords..."
        className="w-full bg-transparent text-[13px] text-[#1e293b] outline-none 
        placeholder:text-[#9aa1ac]"
      />
      <button
        onClick={handleSearch}
        className="bg-pink-500 text-sm text-white rounded-full px-2 py-1"
      >
        Search
      </button>
    </div>
  );
}
