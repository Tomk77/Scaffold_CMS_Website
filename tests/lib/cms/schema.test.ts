import { describe, expect, it } from "vitest";

import { bootstrapSchema, pageSchema } from "@/lib/cms/schema";

const page = {
  id: "page-1",
  parentId: null,
  locale: "en",
  title: "About",
  slug: "about",
  path: "/about",
  templateName: "Standard page",
  templateKey: "standard-page",
  blocks: [
    {
      __typename: "HeroBlock",
      id: "block-1",
      version: 1,
      eyebrow: "Company",
      headline: "About us",
      subheadline: null,
    },
  ],
  seo: { title: "About", description: "Our story", socialImage: null },
  publishedAt: "2026-07-22T10:00:00Z",
  updatedAt: "2026-07-22T10:00:00Z",
};

describe("CMS delivery schemas", () => {
  it("parses the strongly typed published page union", () => {
    const parsed = pageSchema.parse(page);
    expect(parsed.blocks[0]?.__typename).toBe("HeroBlock");
  });

  it("rejects unknown page block types", () => {
    expect(() =>
      pageSchema.parse({
        ...page,
        blocks: [{ __typename: "ScriptBlock", id: "bad", version: 1 }],
      }),
    ).toThrow();
  });

  it("parses recursive published navigation", () => {
    const parsed = bootstrapSchema.parse({
      site: { id: "site-1", key: "demo", name: "Demo", timezone: "UTC", domains: [] },
      languages: [{ id: "language-1", code: "en", name: "English", default: true, urlPrefix: "" }],
      pages: {
        nodes: [page],
        totalCount: 1,
        pageInfo: { hasNextPage: false, endCursor: null },
      },
      navigation: [
        {
          id: "nav-1",
          locale: "en",
          location: "header",
          publishedAt: "2026-07-22T10:00:00Z",
          items: [
            {
              id: "group-1",
              kind: "group",
              label: "Product",
              target: "",
              targetType: "page",
              newTab: false,
              children: [
                {
                  id: "link-1",
                  kind: "link",
                  label: "Overview",
                  target: "/products",
                  targetType: "page",
                  newTab: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      redirects: [],
    });

    expect(parsed.navigation[0]?.items[0]?.children[0]?.target).toBe("/products");
  });
});
