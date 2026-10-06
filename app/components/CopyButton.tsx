"use client";

import React, { useState } from "react";

const CopyButton = ({ prompt }: { prompt: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  if (isCopied) {
    return (
      <button
        className="rounded-full bg-green-400 px-5 py-2.5 
         text-sm font-medium transition text-black"
        onClick={handleCopy}
      >
        Copied!!
      </button>
    );
  }

  return (
    <button
      className="rounded-full bg-[#111827] px-5 py-2.5 
    text-sm font-medium text-white transition hover:bg-[#1f2937]"
      onClick={handleCopy}
    >
      Copy Prompt
    </button>
  );
};

export default CopyButton;
