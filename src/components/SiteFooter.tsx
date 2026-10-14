import type { Dictionary } from "@/content";

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-3 px-4 py-8 font-mono text-xs text-muted sm:px-8">
        <span>Juan Ignacio Portilla Kitroser - Argentina - {"GMT\u20113"}</span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  );
}
