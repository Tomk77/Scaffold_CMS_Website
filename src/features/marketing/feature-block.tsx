import {
  ArrowBendUpLeft,
  ArrowRight,
  CheckCircle,
  Code,
  Cube,
  PlugsConnected,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { ReactNode } from "react";

import type { PageBlock } from "@/lib/cms/schema";

type FeatureBlock = Extract<PageBlock, { __typename: "FeatureBlock" }>;

const icons: Record<string, ReactNode> = {
  tree: <TreeStructure aria-hidden="true" />,
  redirect: <ArrowBendUpLeft aria-hidden="true" />,
  content: <Cube aria-hidden="true" />,
  api: <PlugsConnected aria-hidden="true" />,
};

function FeatureVisual({ block }: { block: FeatureBlock }) {
  if (block.visual === "image" && block.imageSrc && block.imageAlt) {
    return (
      <Image
        className="feature-image"
        src={block.imageSrc}
        alt={block.imageAlt}
        width={920}
        height={540}
      />
    );
  }

  if (block.visual === "redirects") {
    return (
      <div className="redirect-visual" aria-label={`${block.title} examples`}>
        {block.redirects.map((redirect) => (
          <div key={`${redirect.source}-${redirect.destination}`}>
            <code>{redirect.source}</code>
            <ArrowRight aria-hidden="true" />
            <code>{redirect.destination}</code>
            <span>{redirect.statusCode}</span>
          </div>
        ))}
      </div>
    );
  }

  if (block.visual === "content") {
    return (
      <div className="content-visual">
        <div className="content-visual-head">
          <Cube weight="fill" aria-hidden="true" />
          <span>{block.recordTitle}</span>
          {block.recordStatus ? <i>{block.recordStatus}</i> : null}
        </div>
        {block.recordFields.map((field) => (
          <label key={field.label}>
            {field.label} <span>{field.value}</span>
          </label>
        ))}
      </div>
    );
  }

  if (block.visual === "code" && block.code) {
    return (
      <div className="code-visual">
        <div>
          <Code aria-hidden="true" /> {block.codeLanguage}
        </div>
        <pre>
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }

  return null;
}

export function MarketingFeatureBlock({ block, index }: { block: FeatureBlock; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "reverse" : ""}`}>
      <div className="feature-copy">
        {block.eyebrow ? (
          <span className="eyebrow-pill">
            {icons[block.icon ?? ""] ?? <Cube aria-hidden="true" />}
            {block.eyebrow}
          </span>
        ) : null}
        <h3>{block.title}</h3>
        {block.body ? <p>{block.body}</p> : null}
        {block.points.length ? (
          <ul>
            {block.points.map((point) => (
              <li key={point}>
                <CheckCircle weight="fill" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="feature-visual">
        <FeatureVisual block={block} />
      </div>
    </article>
  );
}
