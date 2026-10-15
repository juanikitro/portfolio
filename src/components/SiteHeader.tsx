import Link from "next/link";
import type { Dictionary } from "@/content";
import { cvPath, href, type Locale, type Route } from "@/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

// Header height is fixed (--header-h) so the hero can size itself against it.
export function SiteHeader({ lang, route, t }: { lang: Locale; route: Route; t: Dictionary }) {
  const other: Locale = lang === "en" ? "es" : "en";
  const links = [
    { label: "SISOC", to: href(lang, "/sisoc") },
    { label: "ShineApp", to: href(lang, "/shineapp") },
    { label: t.nav.contact, to: href(lang, route, "#contact") },
  ];

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        {t.nav.skip}
      </a>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 h-(--header-h) border-b border-rule bg-paper/90 backdrop-blur-md">
        <div className="mx-auto grid h-full max-w-[1360px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 font-display text-sm sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Main" className="-mx-1 hidden min-w-0 gap-3 md:flex">
            {links.map((l) => (
              <Link key={l.to} href={l.to} className="whitespace-nowrap rounded px-1 py-1 font-semibold no-underline transition-colors hover:text-route">
                {l.label}
              </Link>
            ))}
          </nav>
          {/* The name always leads back to the hero: centered on desktop, alone on the left on mobile (no nav there).
              On phones it takes two lines so the CV button fits beside it. Between md and lg the nav takes the room. */}
          <Link href={href(lang)} className="min-w-0 text-[12px] font-black uppercase leading-[1.15] tracking-[0.06em] no-underline transition-colors hover:text-route min-[360px]:text-[13px] sm:truncate sm:whitespace-nowrap sm:text-[15px] sm:tracking-[0.08em] md:hidden lg:block">
            Juan Ignacio <span className="block sm:inline">Portilla Kitroser</span>
          </Link>
          <div className="flex flex-none items-center justify-end gap-2">
            {/* The CV is one tap away on every screen size: the hero has no buttons and mobile has no nav. */}
            <TrackedLink
              event="cv"
              from="header"
              lang={lang}
              href={cvPath(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 place-items-center rounded-full bg-ink px-3.5 font-display text-sm font-bold text-paper no-underline transition-colors hover:bg-route"
            >
              {t.nav.cv}
            </TrackedLink>
            <ThemeToggle labels={t.nav.theme} />
            <a
              href={href(other, route)}
              hrefLang={other}
              lang={other}
              aria-label={t.nav.langLabel}
              title={t.nav.langLabel}
              className="grid h-10 min-w-10 place-items-center rounded-full border border-rule bg-surface px-2 font-mono text-xs font-semibold no-underline transition-colors hover:border-route"
            >
              {t.nav.lang}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
