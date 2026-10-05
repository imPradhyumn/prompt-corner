"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  "All",
  "Trending",
  "Traditional",
  "Retro",
  "Couple",
  "Travel",
  "Black and White",
  "Blurry to HD",
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const fetchPromptsByCategory = () => {
    if (activeCategory === "All") router.replace(`/`);
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
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-[11px] transition ${
              active
                ? "border-[#172234] bg-[#172234] text-white"
                : "border-[#172234] bg-transparent text-[#172234] hover:border-[#cfd3d8]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
