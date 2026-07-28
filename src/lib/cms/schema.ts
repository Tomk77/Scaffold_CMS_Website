import { z } from "zod";

const heroBlockSchema = z.object({
  __typename: z.literal("HeroBlock"),
  id: z.string(),
  version: z.number(),
  eyebrow: z.string().nullable(),
  headline: z.string(),
  subheadline: z.string().nullable(),
  primaryLabel: z.string().nullable(),
  primaryUrl: z.string().nullable(),
  secondaryLabel: z.string().nullable(),
  secondaryUrl: z.string().nullable(),
  highlights: z.array(z.string()),
  imageSrc: z.string().nullable(),
  imageAlt: z.string().nullable(),
  imageLabel: z.string().nullable(),
});

const richTextBlockSchema = z.object({
  __typename: z.literal("RichTextBlock"),
  id: z.string(),
  version: z.number(),
  body: z.string(),
});

const quoteBlockSchema = z.object({
  __typename: z.literal("QuoteBlock"),
  id: z.string(),
  version: z.number(),
  text: z.string(),
  cite: z.string().nullable(),
});

const imageBlockSchema = z.object({
  __typename: z.literal("ImageBlock"),
  id: z.string(),
  version: z.number(),
  alt: z.string(),
  caption: z.string().nullable(),
});

const ctaBlockSchema = z.object({
  __typename: z.literal("CtaBlock"),
  id: z.string(),
  version: z.number(),
  heading: z.string(),
  body: z.string().nullable(),
  button: z.string().nullable(),
  primaryLabel: z.string().nullable(),
  primaryUrl: z.string().nullable(),
  secondaryLabel: z.string().nullable(),
  secondaryUrl: z.string().nullable(),
});

const metricsBlockSchema = z.object({
  __typename: z.literal("MetricsBlock"),
  id: z.string(),
  version: z.number(),
  accessibleLabel: z.string().nullable(),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })),
});

const stepsBlockSchema = z.object({
  __typename: z.literal("StepsBlock"),
  id: z.string(),
  version: z.number(),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  introduction: z.string().nullable(),
  steps: z.array(z.object({ icon: z.string(), title: z.string(), body: z.string() })),
});

const featureBlockSchema = z.object({
  __typename: z.literal("FeatureBlock"),
  id: z.string(),
  version: z.number(),
  eyebrow: z.string().nullable(),
  title: z.string(),
  body: z.string().nullable(),
  points: z.array(z.string()),
  icon: z.string().nullable(),
  visual: z.string().nullable(),
  imageSrc: z.string().nullable(),
  imageAlt: z.string().nullable(),
  redirects: z.array(
    z.object({ source: z.string(), destination: z.string(), statusCode: z.number() }),
  ),
  recordTitle: z.string().nullable(),
  recordStatus: z.string().nullable(),
  recordFields: z.array(z.object({ label: z.string(), value: z.string() })),
  codeLanguage: z.string().nullable(),
  code: z.string().nullable(),
});

const pageListBlockSchema = z.object({
  __typename: z.literal("PageListBlock"),
  id: z.string(),
  version: z.number(),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  body: z.string().nullable(),
  maxItems: z.number(),
  emptyTitle: z.string().nullable(),
  emptyBody: z.string().nullable(),
});

const faqBlockSchema = z.object({
  __typename: z.literal("FaqBlock"),
  id: z.string(),
  version: z.number(),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  questions: z.array(z.object({ question: z.string(), answer: z.string() })),
});

export const pageBlockSchema = z.discriminatedUnion("__typename", [
  heroBlockSchema,
  richTextBlockSchema,
  quoteBlockSchema,
  imageBlockSchema,
  ctaBlockSchema,
  metricsBlockSchema,
  stepsBlockSchema,
  featureBlockSchema,
  pageListBlockSchema,
  faqBlockSchema,
]);

export const pageSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  locale: z.string(),
  title: z.string(),
  slug: z.string(),
  path: z.string(),
  templateName: z.string(),
  templateKey: z.string().nullable(),
  blocks: z.array(pageBlockSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    socialImage: z.string().nullable(),
  }),
  publishedAt: z.string(),
  updatedAt: z.string(),
});

export const navigationItemSchema: z.ZodType<NavigationItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    kind: z.enum(["link", "button", "group"]),
    label: z.string(),
    target: z.string(),
    targetType: z.string(),
    newTab: z.boolean(),
    children: z.array(navigationItemSchema),
  }),
);

export const bootstrapSchema = z.object({
  site: z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    timezone: z.string(),
    domains: z.array(z.object({ hostname: z.string(), primary: z.boolean() })),
  }),
  languages: z.array(
    z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
      default: z.boolean(),
      urlPrefix: z.string(),
    }),
  ),
  pages: z.object({
    nodes: z.array(pageSchema),
    totalCount: z.number(),
    pageInfo: z.object({ hasNextPage: z.boolean(), endCursor: z.string().nullable() }),
  }),
  navigation: z.array(
    z.object({
      id: z.string(),
      locale: z.string(),
      location: z.string(),
      items: z.array(navigationItemSchema),
      publishedAt: z.string().nullable(),
    }),
  ),
  redirects: z.array(
    z.object({
      id: z.string(),
      locale: z.string(),
      sourcePath: z.string(),
      destinationPath: z.string(),
      statusCode: z.number(),
    }),
  ),
});

export const pageQuerySchema = z.object({ page: pageSchema.nullable() });

export type PageBlock = z.infer<typeof pageBlockSchema>;
export type CmsPage = z.infer<typeof pageSchema>;
export type CmsBootstrap = z.infer<typeof bootstrapSchema>;

export type NavigationItem = {
  id: string;
  kind: "link" | "button" | "group";
  label: string;
  target: string;
  targetType: string;
  newTab: boolean;
  children: NavigationItem[];
};
