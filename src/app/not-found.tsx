import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell cms={null}>
      <section className="status-page">
        <span>404</span>
        <h1>That page is not in the published tree.</h1>
        <p>The URL may have changed, or the page may not be published yet.</p>
        <Link className="primary-button" href="/">
          <ArrowLeft /> Back home
        </Link>
      </section>
    </SiteShell>
  );
}
