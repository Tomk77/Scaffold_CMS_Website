import { PlugsConnected } from "@phosphor-icons/react/dist/ssr";

import { SiteShell } from "@/components/site-shell";
import { MarketingBlocks } from "@/features/marketing/marketing-blocks";
import type { CmsBootstrap } from "@/lib/cms/schema";

export function MarketingHome({ cms }: { cms: CmsBootstrap | null }) {
  const home = cms?.pages.nodes.find((page) => page.path === "/");

  return (
    <SiteShell cms={cms}>
      {cms && home ? (
        <MarketingBlocks blocks={home.blocks} cms={cms} />
      ) : (
        <section className="section">
          <div className="cms-empty">
            <PlugsConnected aria-hidden="true" />
            <strong>Published homepage content is unavailable</strong>
            <span>Start the CMS and connect a publishable token to load this website.</span>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
