import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketingHome } from "@/features/marketing/marketing-home";
import { bootstrapSchema } from "@/lib/cms/schema";

describe("MarketingHome", () => {
  it("renders authored homepage modules in their published order", () => {
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
                primaryLabel: "Start",
                primaryUrl: "/start",
                secondaryLabel: null,
                secondaryUrl: null,
                highlights: ["Published content"],
                imageSrc: null,
                imageAlt: null,
                imageLabel: null,
              },
              {
                __typename: "StepsBlock",
                id: "steps",
                version: 1,
                eyebrow: "How it works",
                heading: "Two moves",
                introduction: "First paragraph.\n\nSecond paragraph.",
                steps: [{ icon: "tree", title: "Model pages", body: "Keep URLs aligned." }],
              },
              {
                __typename: "CtaBlock",
                id: "cta",
                version: 1,
                heading: "Build your website.",
                body: "Own the rendering.",
                button: null,
                primaryLabel: "Start now",
                primaryUrl: "/start",
                secondaryLabel: null,
                secondaryUrl: null,
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

    const html = renderToStaticMarkup(<MarketingHome cms={cms} />);

    expect(html).toContain("A CMS for real websites.");
    expect(html).toContain("First paragraph.");
    expect(html).toContain("Model pages");
    expect(html).toContain("Build your website.");
    expect(html.indexOf("A CMS for real websites.")).toBeLessThan(html.indexOf("Two moves"));
    expect(html.indexOf("Two moves")).toBeLessThan(html.indexOf("Build your website."));
  });

  it("shows an operational empty state instead of invented marketing copy", () => {
    const html = renderToStaticMarkup(<MarketingHome cms={null} />);

    expect(html).toContain("Published homepage content is unavailable");
    expect(html).not.toContain("headless CMS that thinks");
  });
});
