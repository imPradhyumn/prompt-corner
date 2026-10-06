"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PromptCardProps {
  image_url: string;
  title: string;
  prompt: string;
  slug?: string;
}

export default function PromptCard({
  image_url,
  title,
  prompt,
  slug,
}: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  const handleClick = () => {
    router.push(`/prompts/${slug}`);
  };

  const CopyButton = () => {
    return (
      <button
        onClick={handleCopy}
        className="mt-4 flex h-[34px] w-full items-center justify-center gap-2 rounded-full bg-[#f8f9fa] text-[11px] font-medium text-[#182234] transition hover:bg-[#f1f2f4]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect
            x="8"
            y="8"
            width="11"
            height="11"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Copy Prompt
      </button>
    );
  };

  const CopiedButton = () => {
    return (
      <button
        className="mt-4 flex h-[34px] w-full items-center justify-center gap-2 
        rounded-full bg-green-300
        text-[11px] font-medium text-[#182234]"
      >
        Copied!!
      </button>
    );
  };

  return (
    <article className="overflow-hidden rounded-lg border border-[#e8e8e8] bg-white">
      <div className="aspect-[4/5] overflow-hidden rounded-xl w-full overflow-hidden bg-[#eee]">
        <Image
          src={image_url || ""}
          alt={title}
          width={800}
          onClick={handleClick}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-[13px] font-medium text-[#111827]">{title}</h3>

        <p className="mt-2 line-clamp-2 text-[12px] leading-[1.6] text-[#7b8492]">
          {prompt}
        </p>

        {isCopied ? <CopiedButton /> : <CopyButton />}
      </div>
    </article>
  );
}
