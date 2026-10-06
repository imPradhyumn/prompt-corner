import { notFound } from "next/navigation";
import PromptCard from "@/app/components/PromptCard";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import { supabaseClient } from "@/lib/supabase";
import Image from "next/image";
import CopyButton from "@/app/components/CopyButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data, error } = await supabaseClient.from("prompt").select("slug");

  if (error || !data) return [];

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: prompt, error } = await supabaseClient
    .from("prompt")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !prompt) {
    return { title: "Prompt Not Found" };
  }

  return {
    title: `${prompt.title} AI Photo Prompt`,
    description: prompt.prompt?.replace(/\s+/g, " ").slice(0, 155).trim() ?? "",
  };
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;

  const { data: prompt, error } = await supabaseClient
    .from("prompt")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !prompt) {
    notFound();
  }

  return (
    <main
      className="flex min-h-screen w-full items-center md:h-[100vh]
      justify-center bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6"
      style={{ backgroundImage: "url('/road-bg.jpg')" }}
    >
      <Navbar />

      <section
        className="flex items-center justify-center mx-auto 
        mt-14 w-full max-w-3xl"
      >
        <div
          className="mt-1 md:grid h-[95%] gap-8 rounded-[28px] border border-white/30 
        bg-white/80 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] 
        backdrop-blur-sm md:grid-cols-[1.1fr_0.9fr] md:p-8"
        >
          <div className="md:h-full h-[23rem] mb-5 overflow-hidden rounded-[24px] bg-[#f3f4f6]">
            <Image
              src={prompt.image_url}
              alt={prompt.title}
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              AI Prompt
            </p>

            <h1
              className="mt-3 text-3xl font-semibold tracking-[-0.04em]
            text-[#111827] md:text-5xl"
            >
              {prompt.title}
            </h1>

            <p className="mt-2 text-sm leading-7 text-[#4b5563] md:text-base">
              {prompt.description ||
                "A powerful AI prompt designed for creative image generation."}
            </p>

            <p className="mt-2 text-black">Best results with : ChatGPT</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <CopyButton prompt={prompt.prompt} />

              <a
                href="/"
                className="rounded-full border border-[#d1d5db] bg-white px-5 py-2.5 text-sm font-medium text-[#111827] transition hover:bg-[#f9fafb]"
              >
                Back to Home
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Prompt
              </p>

              <p className="mt-3 h-[12rem] overflow-auto whitespace-pre-wrap text-sm leading-7 text-[#111827]">
                {prompt.prompt}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
