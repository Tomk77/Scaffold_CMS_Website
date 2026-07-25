import "server-only";

import { cache } from "react";
import type { ZodType } from "zod";

import { BOOTSTRAP_QUERY, PAGE_QUERY } from "@/lib/cms/queries";
import {
  bootstrapSchema,
  pageQuerySchema,
  type CmsBootstrap,
  type CmsPage,
} from "@/lib/cms/schema";

type GraphQLError = { message?: string };

type GraphQLResponse = {
  data?: unknown;
  errors?: GraphQLError[];
};

export class CmsRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CmsRequestError";
  }
}

function cmsConfig() {
  const endpoint = process.env.CMS_GRAPHQL_URL;
  const token = process.env.CMS_PUBLISHABLE_TOKEN;
  const configuredRevalidate = Number(process.env.CMS_REVALIDATE_SECONDS ?? 60);

  if (!endpoint || !token) {
    throw new CmsRequestError(
      "CMS_GRAPHQL_URL and CMS_PUBLISHABLE_TOKEN must be configured on the server.",
    );
  }

  return {
    endpoint,
    token,
    revalidate: Number.isFinite(configuredRevalidate) ? Math.max(1, configuredRevalidate) : 60,
  };
}

async function requestCms<T>(
  query: string,
  variables: Record<string, unknown>,
  schema: ZodType<T>,
): Promise<T> {
  const config = cmsConfig();
  const cacheOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: config.revalidate, tags: ["cms-published"] } };
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    ...cacheOptions,
  });

  const payload = (await response.json().catch(() => null)) as GraphQLResponse | null;
  if (!response.ok || !payload) {
    throw new CmsRequestError(`The CMS returned HTTP ${response.status}.`);
  }

  if (payload.errors?.length) {
    throw new CmsRequestError(
      payload.errors.map((error) => error.message ?? "Unknown GraphQL error").join("; "),
    );
  }

  const parsed = schema.safeParse(payload.data);
  if (!parsed.success) {
    throw new CmsRequestError("The CMS response did not match the published content contract.");
  }

  return parsed.data;
}

export const getCmsBootstrap = cache(async (): Promise<CmsBootstrap> => {
  return requestCms(BOOTSTRAP_QUERY, {}, bootstrapSchema);
});

export const getCmsPage = cache(async (path: string): Promise<CmsPage | null> => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const result = await requestCms(PAGE_QUERY, { url: normalizedPath }, pageQuerySchema);
  return result.page;
});

export async function getCmsBootstrapOrNull() {
  try {
    return await getCmsBootstrap();
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("CMS bootstrap request failed", error);
    }
    return null;
  }
}
