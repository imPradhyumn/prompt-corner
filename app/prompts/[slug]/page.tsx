import { notFound } from "next/navigation";
import prompts from "../../data/prompts.json";
import PromptCard from "@/app/components/PromptCard";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const prompt = prompts.find((item) => item.slug === slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: `${prompt.title} AI Photo Prompt`,
    description: prompt.prompt.slice(0, 150),
  };
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;

  const prompt = prompts.find((item) => item.slug === slug);

  if (!prompt) {
    notFound();
  }

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('/road-bg.jpg')" }}
    >
      <Navbar />
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="bg-white text-black px-4 py-1 rounded-md w-fit text-3xl font-semibold">
          {prompt.title}
        </h1>

        <PromptCard
          image_url={prompt.image_url}
          prompt={prompt.prompt}
          title={prompt.title}
        />
      </div>
    </main>
  );
}
