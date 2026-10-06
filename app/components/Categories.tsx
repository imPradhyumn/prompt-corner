"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categories: any = {
  all: { label: "All", keyword: "all" },
  trending: { label: "Trending", keyword: "trending" },
  traditional: { label: "Traditional", keyword: "tradition" },
  retro: { label: "80s/Retro/Vintage", keyword: "retro" },
  couple: { label: "Couple", keyword: "couple" },
  travel: { label: "Travel", keyword: "travel" },
  blackAndWhite: { label: "Black and White", keyword: "black" },
  blurryToHD: { label: "Blurry to HD", keyword: "blur" },
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const fetchPromptsByCategory = () => {
    if (activeCategory === "all") router.replace(`/`);
    else router.push(`?q=${encodeURIComponent(activeCategory.toLowerCase())}`);
  };

  useEffect(() => {
    fetchPromptsByCategory();
  }, [activeCategory]);

  return (
    <div
      className="mx-auto mt-8 md:bg-white 
    flex w-fit flex-wrap justify-center 
    gap-3 py-2 px-5 md:rounded-full
    shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    >
      {Object.keys(categories).map((key: any) => {
        const keyword = categories[key].keyword;
        const active = activeCategory === keyword;
        const label = categories[key].label;

        return (
          <button
            key={key}
            onClick={() => setActiveCategory(keyword)}
            className={`rounded-full border px-4 py-2 text-[11px] transition ${
              active
                ? "border-[#172234] bg-[#172234] text-white"
                : "border-[#172234] bg-transparent text-[#172234] hover:border-[#cfd3d8]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
