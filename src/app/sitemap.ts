import type { MetadataRoute } from "next";

import { getCmsBootstrapOrNull } from "@/lib/cms/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4001";
  const cms = await getCmsBootstrapOrNull();
  const cmsPages =
    cms?.pages.nodes.map((page) => ({
      url: new URL(page.path, baseUrl).toString(),
      lastModified: page.updatedAt,
      changeFrequency: "weekly" as const,
      priority: page.path === "/" ? 1 : 0.7,
    })) ?? [];
  return [{ url: baseUrl, changeFrequency: "weekly", priority: 1 }, ...cmsPages];
}
