import type { MetadataRoute } from "next";
import { navigation, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // The home page is listed explicitly because it is reached through the logo
  // rather than the navigation array.
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...navigation.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
