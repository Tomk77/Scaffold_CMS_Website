import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";

import { PublishedPage } from "@/features/cms-page/published-page";
import { getCmsBootstrap, getCmsPage } from "@/lib/cms/client";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const cms = await getCmsBootstrap();
    return cms.pages.nodes
      .filter((page) => page.path !== "/")
      .map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getCmsPage(`/${slug.join("/")}`);
    if (!page) return {};
    return {
      title: page.seo.title || page.title,
      description: page.seo.description || `Published from Scaffold CMS at ${page.path}.`,
      openGraph: page.seo.socialImage ? { images: [page.seo.socialImage] } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function CmsRoute({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const [page, cms] = await Promise.all([getCmsPage(path), getCmsBootstrap()]);

  if (!page) {
    const rule = cms.redirects.find((candidate) => candidate.sourcePath === path);
    if (rule) {
      if (rule.statusCode === 301) permanentRedirect(rule.destinationPath);
      redirect(rule.destinationPath);
    }
    notFound();
  }

  return <PublishedPage page={page} cms={cms} />;
}
