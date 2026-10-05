import { supabaseClient } from "@/lib/supabase";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";
import PromptCard from "./components/PromptCard";
import SearchBar from "./components/Searchbar";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const searchKeyword = (params?.q ?? "").trim().toLowerCase();

  let query = supabaseClient.from("prompt").select("*");

  if (searchKeyword) {
    query = query.ilike("keyword", `%${searchKeyword}%`);
  }

  const { data: prompts, error } = await query;
  console.log("🚀 ~ Home ~ prompts:", prompts);

  return (
    <div id="home" className="mt-5 pt-5">
      <Navbar />

      <section className="px-6 pb-10 pt-14 text-center">
        <h1 className="mx-auto max-w-[600px] text-[36px] font-medium leading-[1.15] tracking-[-1.5px] text-[#101827]">
          Turn your photos into
          <br />
          something <span className="text-pink-400">extraordinary</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-6 text-[#748095]">
          Discover trending AI photo prompts, get inspired,
          <br />
          and bring your creative ideas to life.
        </p>

        <SearchBar />
        <Categories />

        {error && (
          <div className="mt-6 mx-auto w-fit text-black">
            Failed to load data!!
          </div>
        )}

        <div className="grid mx-auto px-5 mt-6 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {prompts?.map((prompt: any) => {
            return (
              <PromptCard
                key={prompt.id}
                image_url={prompt.image_url}
                prompt={prompt.prompt}
                title={prompt.title}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
