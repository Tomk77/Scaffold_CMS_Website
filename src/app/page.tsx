import type { Metadata } from "next";

import { MarketingHome } from "@/features/marketing/marketing-home";
import { getCmsBootstrapOrNull } from "@/lib/cms/client";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsBootstrapOrNull();
  const home = cms?.pages.nodes.find((page) => page.path === "/");

  if (!home) return {};

  return {
    title: home.seo.title || home.title,
    description: home.seo.description || undefined,
    openGraph: home.seo.socialImage ? { images: [home.seo.socialImage] } : undefined,
  };
}

export default async function Home() {
  const cms = await getCmsBootstrapOrNull();
  return <MarketingHome cms={cms} />;
}
