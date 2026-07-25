import type { CmsBootstrap } from "@/lib/cms/schema";

const fallbackContent = {
  eyebrow: "Published API available",
  headline: "The headless CMS that thinks in pages, not tables.",
  subheadline:
    "Model a real page tree, keep clean URLs and redirects, and deliver published content to any front end over REST or GraphQL.",
  introduction: [
    "Scaffold gives editors a canonical page tree, reusable structured content, and redirect-safe URLs.",
  ],
  ctaHeading: "Own your content and your URLs.",
  ctaButton: "Get started",
};

export function getMarketingHomeContent(cms: CmsBootstrap | null) {
  const home = cms?.pages.nodes.find((page) => page.path === "/");
  const hero = home?.blocks.find((block) => block.__typename === "HeroBlock");
  const richText = home?.blocks.find((block) => block.__typename === "RichTextBlock");
  const cta = home?.blocks.find((block) => block.__typename === "CtaBlock");
  const introduction =
    richText?.body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  return {
    eyebrow: hero?.eyebrow || fallbackContent.eyebrow,
    headline: hero?.headline || fallbackContent.headline,
    subheadline: hero?.subheadline || fallbackContent.subheadline,
    introduction: introduction.length ? introduction : fallbackContent.introduction,
    ctaHeading: cta?.heading || fallbackContent.ctaHeading,
    ctaButton: cta?.button || fallbackContent.ctaButton,
  };
}
