const PAGE_FIELDS = `
  id
  parentId
  locale
  title
  slug
  path
  templateName
  templateKey
  blocks {
    __typename
    ... on HeroBlock {
      id version eyebrow headline subheadline
      primaryLabel primaryUrl secondaryLabel secondaryUrl
      highlights imageSrc imageAlt imageLabel
    }
    ... on RichTextBlock { id version body }
    ... on QuoteBlock { id version text cite }
    ... on ImageBlock { id version alt caption }
    ... on CtaBlock {
      id version heading body button
      primaryLabel primaryUrl secondaryLabel secondaryUrl
    }
    ... on MetricsBlock {
      id version accessibleLabel
      metrics { value label }
    }
    ... on StepsBlock {
      id version eyebrow heading introduction
      steps { icon title body }
    }
    ... on FeatureBlock {
      id version eyebrow title body points icon visual
      imageSrc imageAlt
      redirects { source destination statusCode }
      recordTitle recordStatus recordFields { label value }
      codeLanguage code
    }
    ... on PageListBlock {
      id version eyebrow heading body maxItems emptyTitle emptyBody
    }
    ... on FaqBlock {
      id version eyebrow heading
      questions { question answer }
    }
  }
  seo { title description socialImage }
  publishedAt
  updatedAt
`;

export const BOOTSTRAP_QUERY = `
  query WebsiteBootstrap {
    site { id key name timezone domains { hostname primary } }
    languages { id code name default urlPrefix }
    pages(first: 100) {
      nodes { ${PAGE_FIELDS} }
      totalCount
      pageInfo { hasNextPage endCursor }
    }
    navigation { id locale location items publishedAt }
    redirects { id locale sourcePath destinationPath statusCode }
  }
`;

export const PAGE_QUERY = `
  query WebsitePage($url: String!) {
    page(url: $url) { ${PAGE_FIELDS} }
  }
`;
