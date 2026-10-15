import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteUrl } from "@/i18n";

// Social preview card (1200x630) shared by every page's opengraph-image.
// Satori can't read the CSS tokens, so the light theme is repeated here in hex (from globals.css).
const C = { paper: "#f6f8f2", surface: "#fcfdfa", ink: "#0c284f", ink2: "#3d5a7f", muted: "#596e6f", rule: "#c6d5cc", route: "#137d41", routeBg: "#d3f1d9", contour: "#dce7df" };

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Juan Ignacio Portilla Kitroser - Backend engineer";

type Props = {
  role: string;
  /** small green line above the headline */
  kicker: string;
  /** headline lines; the last one is drawn in the accent color when `accentLast` is set */
  lines: string[];
  accentLast?: boolean;
  chips: string[];
};

// Reading files stops prerendering under Cache Components; caching the read lets the images build statically.
// Returned as base64 because cached values must be serializable.
async function loadAssets() {
  "use cache";
  const files = await Promise.all([
    // literal paths, so file tracing only ships these files
    readFile(join(process.cwd(), "assets/fonts/overpass-900.ttf")),
    readFile(join(process.cwd(), "assets/fonts/overpass-600.ttf")),
    readFile(join(process.cwd(), "assets/fonts/overpass-mono-600.ttf")),
    readFile(join(process.cwd(), "public/juan.jpg")),
  ]);
  return files.map((f) => f.toString("base64"));
}

export async function ogImage({ role, kicker, lines, accentLast = false, chips }: Props) {
  const [black, semibold, mono, portrait] = (await loadAssets()).map((b64) => Buffer.from(b64, "base64"));
  const photo = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  // multi-line headlines keep each line on one row (Overpass Black is ~0.56em per character);
  // a single title is allowed to wrap
  const longest = Math.max(...lines.map((l) => l.length));
  const headline = lines.length > 1 ? Math.min(68, Math.floor(1056 / (longest * 0.56))) : 64;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: C.paper, color: C.ink, fontFamily: "Overpass", position: "relative" }}>
        {/* faint contour lines, the site's map paper */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx="1130" cy="640" rx={170 + i * 95} ry={110 + i * 62} fill="none" stroke={C.contour} strokeWidth="2" />
          ))}
        </svg>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
            <img src={photo} width={88} height={88} alt="" style={{ borderRadius: 999, border: `3px solid ${C.ink}` }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 6, height: 26, background: C.route, borderRadius: 3 }} />
                <span style={{ fontWeight: 900, fontSize: 28, letterSpacing: "0.06em", textTransform: "uppercase" }}>Juan Ignacio Portilla Kitroser</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: 26, color: C.ink2, paddingLeft: 18 }}>{role}</span>
            </div>
          </div>
          <span style={{ fontFamily: "Overpass Mono", fontSize: 20, color: C.muted, paddingTop: 6 }}>{new URL(siteUrl).host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontFamily: "Overpass Mono", fontSize: 22, letterSpacing: "0.1em", textTransform: "uppercase", color: C.route }}>{kicker}</span>
          <div style={{ display: "flex", flexDirection: "column", fontWeight: 900, fontSize: headline, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: 1056 }}>
            {lines.map((line, i) => (
              <span key={i} style={{ color: accentLast && i === lines.length - 1 ? C.route : C.ink }}>{line}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {chips.map((c, i) => (
            <span key={c} style={{ fontFamily: "Overpass Mono", fontSize: 19, padding: "7px 16px", borderRadius: 999, background: i === 0 ? C.routeBg : C.surface, color: i === 0 ? C.route : C.ink, border: `2px solid ${i === 0 ? C.routeBg : C.rule}` }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Overpass", data: black, weight: 900, style: "normal" },
        { name: "Overpass", data: semibold, weight: 600, style: "normal" },
        { name: "Overpass Mono", data: mono, weight: 600, style: "normal" },
      ],
    },
  );
}
