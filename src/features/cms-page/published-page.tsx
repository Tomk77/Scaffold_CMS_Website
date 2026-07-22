import { ArrowRight, CalendarBlank, TreeStructure } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { PageBlocks } from "@/features/cms-page/page-blocks";
import type { CmsBootstrap, CmsPage } from "@/lib/cms/schema";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function PublishedPage({ page, cms }: { page: CmsPage; cms: CmsBootstrap }) {
  const children = cms.pages.nodes.filter((candidate) => candidate.parentId === page.id);
  const related = cms.pages.nodes
    .filter(
      (candidate) =>
        candidate.id !== page.id &&
        candidate.parentId === page.parentId &&
        candidate.locale === page.locale,
    )
    .slice(0, 3);

  return (
    <SiteShell cms={cms}>
      <article className="published-page">
        <header className="published-header">
          <div className="content-container">
            <div className="page-kicker">
              <span>{page.templateName}</span>
              <span>
                <CalendarBlank aria-hidden="true" /> Published {formatDate(page.publishedAt)}
              </span>
            </div>
            <h1>{page.title}</h1>
            {page.seo.description ? (
              <p>{page.seo.description}</p>
            ) : (
              <p>
                Published from Scaffold CMS at <code>{page.path}</code>.
              </p>
            )}
          </div>
        </header>

        <div className="content-container content-body">
          {page.blocks.length ? (
            <PageBlocks blocks={page.blocks} />
          ) : (
            <section className="empty-page-copy">
              <TreeStructure aria-hidden="true" />
              <h2>This published page is ready for content.</h2>
              <p>
                The route, template, language, metadata, and position in the page tree all came from
                the GraphQL API. Add blocks in the CMS and they will render here automatically.
              </p>
            </section>
          )}

          {children.length ? (
            <section className="child-pages">
              <div>
                <span>Explore this section</span>
                <h2>Pages below {page.title}</h2>
              </div>
              <div className="child-grid">
                {children.map((child) => (
                  <Link key={child.id} href={child.path}>
                    <span>{child.templateName}</span>
                    <strong>{child.title}</strong>
                    <code>{child.path}</code>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {!children.length && related.length ? (
            <nav className="related-pages" aria-label="Related pages">
              <strong>More in this section</strong>
              {related.map((item) => (
                <Link key={item.id} href={item.path}>
                  {item.title}
                  <ArrowRight />
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </article>
    </SiteShell>
  );
}
