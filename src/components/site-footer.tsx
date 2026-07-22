import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Brand } from "@/components/brand";
import type { NavigationItem } from "@/lib/cms/schema";

function FooterColumn({ item }: { item: NavigationItem }) {
  if (!item.children.length) return null;

  return (
    <div className="footer-column">
      <strong>{item.label}</strong>
      {item.children.map((child) => (
        <Link key={child.id} href={child.target || "/"}>
          {child.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter({ items }: { items?: NavigationItem[] | undefined }) {
  const groups = items?.filter((item) => item.children.length).slice(0, 3) ?? [];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-intro">
          <Brand compact />
          <p>The open, website-native headless CMS for teams who care about their URLs.</p>
          <Link className="social-link" href="/open-source" aria-label="Open source information">
            <GithubLogo aria-hidden="true" />
          </Link>
        </div>
        {groups.length ? (
          groups.map((item) => <FooterColumn key={item.id} item={item} />)
        ) : (
          <>
            <div className="footer-column">
              <strong>Product</strong>
              <Link href="/#features">Page tree</Link>
              <Link href="/redirects">Redirects</Link>
              <Link href="/products">Structured content</Link>
            </div>
            <div className="footer-column">
              <strong>Developers</strong>
              <Link href="/help">Documentation</Link>
              <Link href="/open-source">Open source</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </>
        )}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Scaffold CMS</span>
        <span className="footer-status">
          <i aria-hidden="true" /> Published content connected
        </span>
      </div>
    </footer>
  );
}
