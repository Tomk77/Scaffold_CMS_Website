import { ArrowRight, GithubLogo, List, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Brand } from "@/components/brand";
import type { NavigationItem } from "@/lib/cms/schema";

const fallbackItems: NavigationItem[] = [
  {
    id: "product",
    kind: "link",
    label: "Product",
    target: "/#features",
    targetType: "url",
    newTab: false,
    children: [],
  },
  {
    id: "how",
    kind: "link",
    label: "How it works",
    target: "/#how-it-works",
    targetType: "url",
    newTab: false,
    children: [],
  },
  {
    id: "content",
    kind: "link",
    label: "Live content",
    target: "/#live-content",
    targetType: "url",
    newTab: false,
    children: [],
  },
  {
    id: "docs",
    kind: "link",
    label: "Docs",
    target: "/help",
    targetType: "page",
    newTab: false,
    children: [],
  },
];

function NavigationLink({ item }: { item: NavigationItem }) {
  if (item.kind === "group" && item.children.length) {
    return (
      <details className="nav-group">
        <summary>{item.label}</summary>
        <div className="nav-popover">
          {item.children.map((child) => (
            <Link key={child.id} href={child.target || "/"}>
              {child.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <Link
      className={item.kind === "button" ? "nav-button" : undefined}
      href={item.target || "/"}
      target={item.newTab ? "_blank" : undefined}
      rel={item.newTab ? "noreferrer" : undefined}
    >
      {item.label}
      {item.kind === "button" ? <ArrowRight aria-hidden="true" weight="bold" /> : null}
    </Link>
  );
}

export function SiteHeader({ items }: { items?: NavigationItem[] | undefined }) {
  const navigationItems = items?.length ? items : fallbackItems;
  const actionItem = navigationItems.find((item) => item.kind === "button");
  const menuItems = navigationItems.filter((item) => item.kind !== "button");

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {menuItems.map((item) => (
            <NavigationLink key={item.id} item={item} />
          ))}
        </nav>
        <div className="header-actions">
          <Link className="quiet-button desktop-only" href="/open-source">
            <GithubLogo aria-hidden="true" weight="fill" /> Open source
          </Link>
          <Link
            className="primary-button small"
            href={actionItem?.target || "/help/getting-started"}
          >
            {actionItem?.label || "Get started"} <ArrowRight aria-hidden="true" weight="bold" />
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">
              <List className="menu-open" aria-hidden="true" />
              <X className="menu-close" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              {menuItems
                .flatMap((item) =>
                  item.kind === "group" && item.children.length ? item.children : [item],
                )
                .map((item) => (
                  <Link key={item.id} href={item.target || "/"}>
                    {item.label}
                  </Link>
                ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
