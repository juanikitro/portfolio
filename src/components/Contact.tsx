import Image from "next/image";
import type { Dictionary } from "@/content";
import { EmailButton } from "./EmailButton";
import { cvPath, type Locale } from "@/i18n";
import portrait from "../../public/juan.jpg";

const BTN = "inline-flex justify-center whitespace-nowrap rounded-full border-[1.5px] border-ink bg-surface px-5 py-2.5 font-display text-[15px] font-semibold no-underline transition duration-200 hover:-translate-y-0.5 hover:border-route hover:text-route";

const LINKS = [
  { label: "GitHub", url: "https://github.com/juanikitro" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/juanikitro/" },
];

export function Contact({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 py-16 md:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] justify-items-center gap-6 rounded-[18px] border-2 border-ink bg-surface p-5 text-center sm:p-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:justify-items-stretch md:gap-10 md:text-left">
        {/* the photo fills the card's full height on desktop */}
        <div className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-[14px] sm:max-w-[220px] md:aspect-auto md:h-full md:max-w-none">
          <Image src={portrait} alt="Juan Ignacio Portilla Kitroser" fill sizes="(min-width: 768px) 280px, 280px" className="object-cover" placeholder="blur" />
        </div>
        <div className="min-w-0">
          <span className="legend">{t.contact.label}</span>
          <h2 id="contact-h" className="mb-3 mt-2 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-black leading-[1.05] tracking-[-0.02em]">{t.contact.title}</h2>
          <p className="m-0 text-left text-ink-2">{t.contact.body}</p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
            <EmailButton email={t.contact.email} label={t.contact.email} copied={t.contact.copied} className={`${BTN} col-span-2`} />
            <a href={cvPath(lang)} target="_blank" rel="noopener noreferrer" className={`${BTN} col-span-2`}>
              {t.contact.cv}
            </a>
            {LINKS.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={BTN}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
