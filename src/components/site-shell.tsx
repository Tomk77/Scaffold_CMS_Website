import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { CmsBootstrap } from "@/lib/cms/schema";

export function SiteShell({ children, cms }: { children: ReactNode; cms: CmsBootstrap | null }) {
  const header = cms?.navigation.find((menu) => menu.location === "header");
  const footer = cms?.navigation.find((menu) => menu.location === "footer");

  return (
    <>
      <SiteHeader items={header?.items} />
      <main>{children}</main>
      <SiteFooter items={footer?.items} />
    </>
  );
}
