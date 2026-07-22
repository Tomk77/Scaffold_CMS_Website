import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { Quotes } from "@phosphor-icons/react/dist/ssr/Quotes";
import Link from "next/link";

import type { PageBlock } from "@/lib/cms/schema";

function paragraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <div className="page-blocks">
      {blocks.map((block) => {
        if (block.__typename === "HeroBlock") {
          return (
            <section className="content-hero" key={block.id}>
              {block.eyebrow ? <span>{block.eyebrow}</span> : null}
              <h2>{block.headline}</h2>
              {block.subheadline ? <p>{block.subheadline}</p> : null}
            </section>
          );
        }

        if (block.__typename === "RichTextBlock") {
          return (
            <section className="rich-text" key={block.id}>
              {paragraphs(block.body).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          );
        }

        if (block.__typename === "QuoteBlock") {
          return (
            <figure className="quote-block" key={block.id}>
              <Quotes weight="fill" aria-hidden="true" />
              <blockquote>{block.text}</blockquote>
              {block.cite ? <figcaption>— {block.cite}</figcaption> : null}
            </figure>
          );
        }

        if (block.__typename === "ImageBlock") {
          return (
            <figure className="image-placeholder" key={block.id}>
              <ImageIcon aria-hidden="true" />
              <strong>{block.alt}</strong>
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        return (
          <aside className="content-cta" key={block.id}>
            <h2>{block.heading}</h2>
            <Link className="white-button" href="/contact">
              {block.button || "Get in touch"} <ArrowRight weight="bold" />
            </Link>
          </aside>
        );
      })}
    </div>
  );
}
