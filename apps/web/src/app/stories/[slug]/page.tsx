import type { Metadata } from "next";
import { STORIES_DATA } from "@/lib/storiesData";
import StoryReaderClient from "./StoryReaderClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = STORIES_DATA.find((s) => s.slug === params.slug);
  const title = story ? `${story.titleEn}` : "Curated Archival Story";
  const description = story
    ? story.subtitleEn
    : "Curated archival narrative from Dr. B. R. Ambedkar's historical milestones.";
  const canonical = `https://ambedkarverse.in/stories/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | AmbedkarVerse`,
      description,
      url: canonical,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AmbedkarVerse`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function StorySlugPage() {
  return <StoryReaderClient />;
}
