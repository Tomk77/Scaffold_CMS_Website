import {
  ArrowBendUpLeft,
  ArrowRight,
  CheckCircle,
  Code,
  Cube,
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

import { SiteShell } from "@/components/site-shell";
import { getMarketingHomeContent } from "@/features/marketing/home-content";
import type { CmsBootstrap, CmsPage } from "@/lib/cms/schema";

const steps = [
  {
    icon: <DownloadSimple aria-hidden="true" />,
    title: "Run the CMS",
    body: "Start the administration app against Postgres and create your first site.",
  },
  {
    icon: <TreeStructure aria-hidden="true" />,
    title: "Model your tree",
    body: "Create pages in a canonical hierarchy. Their paths follow naturally.",
  },
  {
    icon: <Stack aria-hidden="true" />,
    title: "Compose content",
    body: "Use templates, page blocks, and structured records to keep content consistent.",
  },
  {
    icon: <RocketLaunch aria-hidden="true" />,
    title: "Publish anywhere",
    body: "Fetch published content over REST or GraphQL from any front-end stack.",
  },
];

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  icon: ReactNode;
  visual: "tree" | "redirects" | "content" | "api";
};

const features: Feature[] = [
  {
    eyebrow: "Canonical page tree",
    title: "Your site is a tree. Model it like one.",
    body: "Every page has one canonical home. Reorder and nest pages while the content model stays aligned with the URLs visitors use.",
    points: [
      "Visible hierarchy and paths",
      "Templates per page type",
      "Multiple published languages",
    ],
    icon: <TreeStructure aria-hidden="true" />,
    visual: "tree",
  },
  {
    eyebrow: "Redirect safety",
    title: "Move a page. Keep every old link alive.",
    body: "The CMS records redirects when paths change and validates manual rules before they reach your website.",
    points: ["301 and 302 rules", "Loop detection", "Published redirect delivery"],
    icon: <ArrowBendUpLeft aria-hidden="true" />,
    visual: "redirects",
  },
  {
    eyebrow: "Structured content",
    title: "Reusable data, without flattening the website.",
    body: "Keep records such as people, locations, and FAQs reusable while pages remain the backbone of the site.",
    points: ["Schema-driven fields", "Localized records", "Strong content contracts"],
    icon: <Cube aria-hidden="true" />,
    visual: "content",
  },
  {
    eyebrow: "Headless delivery",
    title: "A typed API for the front end you choose.",
    body: "This website is already reading Scaffold through GraphQL. The same published model is available over REST.",
    points: ["Token-gated published reads", "Page lookup by URL", "GraphQL schema explorer"],
    icon: <PlugsConnected aria-hidden="true" />,
    visual: "api",
  },
];

const faqItems = [
  {
    question: "What does website-native mean?",
    answer:
      "Pages, paths, navigation, languages, and redirects are first-class concepts. Editors work with the shape of the website instead of a flat list of database entries.",
  },
  {
    question: "Can I use Next.js, Astro, or another framework?",
    answer:
      "Yes. Scaffold only delivers content. Your front end owns rendering, deployment, and the user experience.",
  },
  {
    question: "Does the public API expose drafts?",
    answer:
      "No. Publishable tokens currently read published content only. Preview-only credentials and draft delivery remain separate future work.",
  },
  {
    question: "How quickly do published changes appear?",
    answer:
      "That is controlled by the website. This Next.js example prebuilds known pages and revalidates its CMS reads every minute.",
  },
];

function ProductWindow() {
  return (
    <div className="product-window">
      <div className="window-bar">
        <span />
        <span />
        <span />
        <code>localhost:4000/pages</code>
      </div>
      <Image
        src="/screenshots/page-tree-dark.png"
        alt="Scaffold CMS page tree showing nested pages and publishing states"
        width={920}
        height={540}
        sizes="(max-width: 768px) 100vw, 1080px"
        priority
      />
    </div>
  );
}

function FeatureVisual({ kind }: { kind: Feature["visual"] }) {
  if (kind === "tree") {
    return (
      <Image
        className="feature-image"
        src="/screenshots/page-tree-light.png"
        alt="Page tree with nested news, blog, and product pages"
        width={920}
        height={540}
      />
    );
  }

  if (kind === "redirects") {
    return (
      <div className="redirect-visual" aria-label="Example automatic redirects">
        <div>
          <code>/old-about</code>
          <ArrowRight />
          <code>/about</code>
          <span>301</span>
        </div>
        <div>
          <code>/journal</code>
          <ArrowRight />
          <code>/blog</code>
          <span>301</span>
        </div>
        <div>
          <code>/start</code>
          <ArrowRight />
          <code>/help/getting-started</code>
          <span>302</span>
        </div>
      </div>
    );
  }

  if (kind === "content") {
    return (
      <div className="content-visual">
        <div className="content-visual-head">
          <Cube weight="fill" />
          <span>Team member</span>
          <i>Published</i>
        </div>
        <label>
          Name <span>Amina Yusuf</span>
        </label>
        <label>
          Role <span>Lead engineer</span>
        </label>
        <label>
          Expertise <span>APIs · Content modelling</span>
        </label>
      </div>
    );
  }

  return (
    <div className="code-visual">
      <div>
        <Code aria-hidden="true" /> GraphQL
      </div>
      <pre>
        <code>{`query WebsitePage($url: String!) {
  page(url: $url) {
    title
    path
    blocks { __typename }
  }
}`}</code>
      </pre>
    </div>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "reverse" : ""}`}>
      <div className="feature-copy">
        <span className="eyebrow-pill">
          {feature.icon}
          {feature.eyebrow}
        </span>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
        <ul>
          {feature.points.map((point) => (
            <li key={point}>
              <CheckCircle weight="fill" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="feature-visual">
        <FeatureVisual kind={feature.visual} />
      </div>
    </article>
  );
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

export function MarketingHome({ cms }: { cms: CmsBootstrap | null }) {
  const content = getMarketingHomeContent(cms);
  const pages = cms?.pages.nodes.filter((page) => page.path !== "/").slice(0, 6) ?? [];

  return (
    <SiteShell cms={cms}>
      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="release-pill">
            <GitBranch weight="fill" />
            {content.eyebrow}
          </span>
          <h1>{content.headline}</h1>
          <p>{content.subheadline}</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/help/getting-started">
              Explore the CMS <ArrowRight weight="bold" />
            </Link>
            <Link className="quiet-button" href="#live-content">
              <Graph aria-hidden="true" />
              See live CMS data
            </Link>
          </div>
          <div className="hero-checks">
            <span>
              <CheckCircle weight="fill" />
              Website-native
            </span>
            <span>
              <CheckCircle weight="fill" />
              Published reads only
            </span>
            <span>
              <CheckCircle weight="fill" />
              Bring your own front end
            </span>
          </div>
        </div>
        <ProductWindow />
      </section>

      <section className="proof-strip" aria-label="Product capabilities">
        <div>
          <strong>{cms?.pages.totalCount ?? "—"}</strong>
          <span>published pages connected</span>
        </div>
        <div>
          <strong>REST + GraphQL</strong>
          <span>typed delivery contracts</span>
        </div>
        <div>
          <strong>URL lookup</strong>
          <span>fetch a page by its path</span>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-heading">
          <span>How it works</span>
          <h2>From content model to live website in four moves.</h2>
          {content.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article key={step.title} className="step-card">
              <i>{step.icon}</i>
              <code>0{index + 1}</code>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="features section" id="features">
        {features.map((feature, index) => (
          <FeatureRow key={feature.title} feature={feature} index={index} />
        ))}
      </section>

      <section className="live-section" id="live-content">
        <div className="section live-inner">
          <div className="section-heading">
            <span>Live from GraphQL</span>
            <h2>These routes come from the CMS you are running.</h2>
            <p>
              {cms
                ? `Connected to “${cms.site.name}”. Open a page to see the generic published-page renderer.`
                : "Start the CMS and configure the server token to load published pages here."}
            </p>
          </div>
          {pages.length ? (
            <div className="live-grid">
              {pages.map((page) => (
                <LivePageCard key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <div className="cms-empty">
              <PlugsConnected />
              <strong>Waiting for published CMS content</strong>
              <span>The marketing site remains usable while the CMS is unavailable.</span>
            </div>
          )}
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>Questions, answered.</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
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

      <section className="cta-wrap">
        <div className="final-cta">
          <h2>{content.ctaHeading}</h2>
          <p>Use Scaffold as the content layer, then make the website entirely your own.</p>
          <div>
            <Link className="white-button" href="/help/getting-started">
              {content.ctaButton} <ArrowRight weight="bold" />
            </Link>
            <Link className="glass-button" href="/help">
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
