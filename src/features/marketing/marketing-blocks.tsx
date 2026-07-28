import {
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  GitBranch,
  Graph,
  PlugsConnected,
  RocketLaunch,
  Stack,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { MarketingFeatureBlock } from "@/features/marketing/feature-block";
import type { CmsBootstrap, CmsPage, PageBlock } from "@/lib/cms/schema";

const stepIcons: Record<string, ReactNode> = {
  database: <DownloadSimple aria-hidden="true" />,
  tree: <TreeStructure aria-hidden="true" />,
  stack: <Stack aria-hidden="true" />,
  rocket: <RocketLaunch aria-hidden="true" />,
};

function paragraphs(value: string | null) {
  return (value ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function replaceTokens(value: string, cms: CmsBootstrap) {
  return value
    .replaceAll("{pageCount}", String(cms.pages.totalCount))
    .replaceAll("{siteName}", cms.site.name);
}

function LivePageCard({ page }: { page: CmsPage }) {
  return (
    <Link className="live-page-card" href={page.path}>
      <span>{page.templateName}</span>
      <h3>{page.title}</h3>
      <code>{page.path}</code>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

function MarketingBlock({
  block,
  cms,
  featureIndex,
}: {
  block: PageBlock;
  cms: CmsBootstrap;
  featureIndex: number;
}) {
  if (block.__typename === "HeroBlock") {
    return (
      <section className="hero" id="top">
        <div className="hero-copy">
          {block.eyebrow ? (
            <span className="release-pill">
              <GitBranch weight="fill" aria-hidden="true" />
              {block.eyebrow}
            </span>
          ) : null}
          <h1>{block.headline}</h1>
          {block.subheadline ? <p>{block.subheadline}</p> : null}
          <div className="hero-actions">
            {block.primaryLabel && block.primaryUrl ? (
              <Link className="primary-button" href={block.primaryUrl}>
                {block.primaryLabel} <ArrowRight weight="bold" aria-hidden="true" />
              </Link>
            ) : null}
            {block.secondaryLabel && block.secondaryUrl ? (
              <Link className="quiet-button" href={block.secondaryUrl}>
                <Graph aria-hidden="true" />
                {block.secondaryLabel}
              </Link>
            ) : null}
          </div>
          {block.highlights.length ? (
            <div className="hero-checks">
              {block.highlights.map((highlight) => (
                <span key={highlight}>
                  <CheckCircle weight="fill" aria-hidden="true" />
                  {highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {block.imageSrc && block.imageAlt ? (
          <div className="product-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <code>{block.imageLabel}</code>
            </div>
            <Image
              src={block.imageSrc}
              alt={block.imageAlt}
              width={920}
              height={540}
              sizes="(max-width: 768px) 100vw, 1080px"
              priority
            />
          </div>
        ) : null}
      </section>
    );
  }

  if (block.__typename === "MetricsBlock") {
    return (
      <section className="proof-strip" aria-label={block.accessibleLabel ?? undefined}>
        {block.metrics.map((item) => (
          <div key={`${item.value}-${item.label}`}>
            <strong>{replaceTokens(item.value, cms)}</strong>
            <span>{replaceTokens(item.label, cms)}</span>
          </div>
        ))}
      </section>
    );
  }

  if (block.__typename === "StepsBlock") {
    return (
      <section className="section" id="how-it-works">
        <div className="section-heading">
          {block.eyebrow ? <span>{block.eyebrow}</span> : null}
          <h2>{block.heading}</h2>
          {paragraphs(block.introduction).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="steps-grid">
          {block.steps.map((step, index) => (
            <article key={`${step.title}-${index}`} className="step-card">
              <i>{stepIcons[step.icon] ?? <Stack aria-hidden="true" />}</i>
              <code>{String(index + 1).padStart(2, "0")}</code>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.__typename === "FeatureBlock") {
    return <MarketingFeatureBlock block={block} index={featureIndex} />;
  }

  if (block.__typename === "PageListBlock") {
    const pages = cms.pages.nodes.filter((page) => page.path !== "/").slice(0, block.maxItems);

    return (
      <section className="live-section" id="live-content">
        <div className="section live-inner">
          <div className="section-heading">
            {block.eyebrow ? <span>{block.eyebrow}</span> : null}
            <h2>{block.heading}</h2>
            {block.body ? <p>{replaceTokens(block.body, cms)}</p> : null}
          </div>
          {pages.length ? (
            <div className="live-grid">
              {pages.map((page) => (
                <LivePageCard key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <div className="cms-empty">
              <PlugsConnected aria-hidden="true" />
              {block.emptyTitle ? <strong>{block.emptyTitle}</strong> : null}
              {block.emptyBody ? <span>{block.emptyBody}</span> : null}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (block.__typename === "FaqBlock") {
    return (
      <section className="section faq-section">
        <div className="section-heading">
          {block.eyebrow ? <span>{block.eyebrow}</span> : null}
          <h2>{block.heading}</h2>
        </div>
        <div className="faq-list">
          {block.questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    );
  }

  if (block.__typename === "CtaBlock") {
    return (
      <section className="cta-wrap">
        <div className="final-cta">
          <h2>{block.heading}</h2>
          {block.body ? <p>{block.body}</p> : null}
          <div>
            {block.primaryLabel && block.primaryUrl ? (
              <Link className="white-button" href={block.primaryUrl}>
                {block.primaryLabel} <ArrowRight weight="bold" aria-hidden="true" />
              </Link>
            ) : null}
            {block.secondaryLabel && block.secondaryUrl ? (
              <Link className="glass-button" href={block.secondaryUrl}>
                {block.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export function MarketingBlocks({ blocks, cms }: { blocks: PageBlock[]; cms: CmsBootstrap }) {
  const rendered: ReactNode[] = [];
  let featureIndex = 0;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]!;
    if (block.__typename === "FeatureBlock") {
      const featureBlocks: Array<Extract<PageBlock, { __typename: "FeatureBlock" }>> = [];
      while (blocks[index]?.__typename === "FeatureBlock") {
        featureBlocks.push(blocks[index] as Extract<PageBlock, { __typename: "FeatureBlock" }>);
        index += 1;
      }
      index -= 1;

      rendered.push(
        <section className="features section" id="features" key={`features-${block.id}`}>
          {featureBlocks.map((feature) => {
            const currentFeatureIndex = featureIndex;
            featureIndex += 1;

            return (
              <MarketingFeatureBlock block={feature} index={currentFeatureIndex} key={feature.id} />
            );
          })}
        </section>,
      );
      continue;
    }

    rendered.push(
      <MarketingBlock key={block.id} block={block} cms={cms} featureIndex={featureIndex} />,
    );
  }

  return rendered;
}
