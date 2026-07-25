import { describe, expect, it } from "vitest";

import { getMarketingHomeContent } from "@/features/marketing/home-content";
import { bootstrapSchema } from "@/lib/cms/schema";

describe("getMarketingHomeContent", () => {
  it("maps the published root-page blocks into the marketing design", () => {
    const cms = bootstrapSchema.parse({
      site: { id: "site-1", key: "demo", name: "Demo", timezone: "UTC", domains: [] },
      languages: [{ id: "language-1", code: "en", name: "English", default: true, urlPrefix: "" }],
      pages: {
        nodes: [
          {
            id: "home",
            parentId: null,
            locale: "en",
            title: "Home",
            slug: "",
            path: "/",
            templateName: "Landing page",
            templateKey: "landing-page",
            blocks: [
              {
                __typename: "HeroBlock",
                id: "hero",
                version: 1,
                eyebrow: "Live from Scaffold",
                headline: "A CMS for real websites.",
                subheadline: "Published over GraphQL.",
              },
              {
                __typename: "RichTextBlock",
                id: "body",
                version: 1,
                body: "First paragraph.\n\nSecond paragraph.",
              },
              {
                __typename: "CtaBlock",
                id: "cta",
                version: 1,
                heading: "Build your website.",
                button: "Start now",
              },
            ],
            seo: { title: "Demo", description: "Demo website", socialImage: null },
            publishedAt: "2026-07-25T10:00:00Z",
            updatedAt: "2026-07-25T10:00:00Z",
          },
        ],
        totalCount: 1,
        pageInfo: { hasNextPage: false, endCursor: null },
      },
      navigation: [],
      redirects: [],
    });

    expect(getMarketingHomeContent(cms)).toEqual({
      eyebrow: "Live from Scaffold",
      headline: "A CMS for real websites.",
      subheadline: "Published over GraphQL.",
      introduction: ["First paragraph.", "Second paragraph."],
      ctaHeading: "Build your website.",
      ctaButton: "Start now",
    });
  });

  it("keeps the homepage usable while the CMS is unavailable", () => {
    expect(getMarketingHomeContent(null).headline).toContain("headless CMS");
  });
});
