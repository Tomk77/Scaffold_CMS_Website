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
    ... on HeroBlock { id version eyebrow headline subheadline }
    ... on RichTextBlock { id version body }
    ... on QuoteBlock { id version text cite }
    ... on ImageBlock { id version alt caption }
    ... on CtaBlock { id version heading button }
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
