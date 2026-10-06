import { supabaseClient } from "@/lib/supabase";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://promptcorner.in";

  const { data: prompts, error } = await supabaseClient
    .from("prompt")
    .select("slug")
    .not("slug", "is", null);

  if (error || !prompts) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }

  const dynamicRoutes = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dynamicRoutes,
  ];
}
