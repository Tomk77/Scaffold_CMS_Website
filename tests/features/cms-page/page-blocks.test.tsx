import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageBlocks } from "@/features/cms-page/page-blocks";
import type { PageBlock } from "@/lib/cms/schema";

const blocks: PageBlock[] = [
  {
    __typename: "HeroBlock",
    id: "hero",
    version: 1,
    eyebrow: "Guide",
    headline: "Build a calmer website",
    subheadline: "Start with the page tree.",
    primaryLabel: null,
    primaryUrl: null,
    secondaryLabel: null,
    secondaryUrl: null,
    highlights: [],
    imageSrc: null,
    imageAlt: null,
    imageLabel: null,
  },
  {
    __typename: "RichTextBlock",
    id: "body",
    version: 1,
    body: "First paragraph.\n\nSecond paragraph.",
  },
  {
    __typename: "QuoteBlock",
    id: "quote",
    version: 1,
    text: "URLs are part of the product.",
    cite: "The web team",
  },
  {
    __typename: "CtaBlock",
    id: "cta",
    version: 1,
    heading: "Ready to talk?",
    body: null,
    button: "Contact us",
    primaryLabel: null,
    primaryUrl: null,
    secondaryLabel: null,
    secondaryUrl: null,
  },
];

describe("PageBlocks", () => {
  it("renders every supported content role without template-specific code", () => {
    render(<PageBlocks blocks={blocks} />);

    expect(screen.getByRole("heading", { name: "Build a calmer website" })).toBeVisible();
    expect(screen.getByText("Second paragraph.")).toBeVisible();
    expect(screen.getByText("URLs are part of the product.")).toBeVisible();
    expect(screen.getByRole("link", { name: /Contact us/ })).toHaveAttribute("href", "/contact");
  });
});
