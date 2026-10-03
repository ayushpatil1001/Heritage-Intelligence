import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ambedkarverse.in";
  const now = new Date();

  // Primary static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/assistant`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quotes/verify`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/graph`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kiosk`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/display`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 4 Curated Visual Essays
  const storySlugs = [
    "mahad-satyagraha",
    "drafting-the-constitution",
    "columbia-to-london",
    "conversion-at-nagpur",
  ];
  const storyRoutes: MetadataRoute.Sitemap = storySlugs.map((slug) => ({
    url: `${baseUrl}/stories/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 30 Authenticated Primary Archival Items
  const itemIds = [
    "item-baws-01-caste",
    "item-baws-01-aoc",
    "item-cad-art32",
    "item-cad-final-speech",
    "item-baws-06-rupee",
    "item-baws-07-shudras",
    "item-baws-08-pakistan",
    "item-baws-09-congress-gandhi",
    "item-baws-11-buddha",
    "item-baws-03-philosophy",
    "item-baws-04-riddles",
    "item-baws-05-untouchables",
    "item-baws-02-mahad-bill",
    "item-baws-10-cabinet",
    "item-baws-12-southborough",
    "item-cad-art14",
    "item-cad-art15",
    "item-cad-art17",
    "item-cad-art44",
    "item-cad-art395",
    "item-dissertation-columbia",
    "item-editorial-mooknayak",
    "item-editorial-bahishkrit",
    "item-mahad-declaration",
    "item-poona-pact-doc",
    "item-states-minorities",
    "item-hindu-code-resignation",
    "item-deekshabhoomi-speech",
    "item-bbc-interview",
    "item-photo-drafting-committee",
  ];
  const readerRoutes: MetadataRoute.Sitemap = itemIds.map((id) => ({
    url: `${baseUrl}/reader/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...storyRoutes, ...readerRoutes];
}
