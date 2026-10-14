import { Fragment } from "react";

// Names that always link out wherever they appear in running text.
export const KING_SHINE_URL = "https://www.instagram.com/thekingshine_/";
const LINKS: Record<string, string> = { "The King Shine": KING_SHINE_URL };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Renders copy with the accent applied to real-world names and verifiable facts:
 * known names (e.g. "The King Shine") become external links, and `highlight` terms are only colored.
 * Not for use inside another link.
 */
export function RichText({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const terms = [...Object.keys(LINKS), ...highlight];
  const pattern = new RegExp(`(${terms.map(escape).join("|")})`, "g");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        LINKS[part] ? (
          <a key={i} href={LINKS[part]} target="_blank" rel="noopener noreferrer" className="text-route no-underline">
            {part}
          </a>
        ) : highlight.includes(part) ? (
          <span key={i} className="text-route">{part}</span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
