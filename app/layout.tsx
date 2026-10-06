import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prompt Corner",
    template: "%s | Prompt Corner",
  },
  description:
    "Discover trending AI photo prompts, cinematic prompts, travel prompts, portrait prompts, and creative ideas for your next image generation project.",
  keywords: [
    "AI prompts",
    "AI photo prompts",
    "cinematic prompts",
    "portrait prompts",
    "travel prompts",
    "creative prompts",
    "HD prompts",
    "Trending Prompts",
    "Vintage prompts",
    "retro prompts",
    "bollywood prompts",
    "ai image generator prompt",
    "chatgpt prompts",
    "gemini prompts",
  ],
  authors: [{ name: "Pradhyumn Sharma" }],
  creator: "Pradhyumn Sharma",
  openGraph: {
    title: "Prompt Corner",
    description:
      "Discover trending AI photo prompts and creative ideas for cinematic, portrait, travel, and fashion shots.",
    siteName: "Prompt Corner",
    type: "website",
    url: "https://promptcorner.in",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prompt Corner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Corner",
    description:
      "Discover trending AI photo prompts and creative ideas for cinematic, portrait, travel, and fashion shots.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://promptcorner.in",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pink-50">{children}</body>
    </html>
  );
}
