import type { Locale } from "@/i18n";
import { en } from "./en";
import { es } from "./es";

const dictionaries = { en, es } as const;

export const getDictionary = (lang: Locale) => dictionaries[lang];
export type { Dictionary } from "./types";
