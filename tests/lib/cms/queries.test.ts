import { describe, expect, it } from "vitest";

import { BOOTSTRAP_QUERY, PAGE_QUERY } from "@/lib/cms/queries";

describe("GraphQL documents", () => {
  it("looks pages up by URL and selects every known block type", () => {
    expect(PAGE_QUERY).toContain("page(url: $url)");
    for (const type of ["HeroBlock", "RichTextBlock", "QuoteBlock", "ImageBlock", "CtaBlock"]) {
      expect(PAGE_QUERY).toContain(`on ${type}`);
    }
  });

  it("bootstraps pages, navigation, and redirects in one request", () => {
    expect(BOOTSTRAP_QUERY).toContain("pages(first: 100)");
    expect(BOOTSTRAP_QUERY).toContain("navigation");
    expect(BOOTSTRAP_QUERY).toContain("redirects");
  });
});
