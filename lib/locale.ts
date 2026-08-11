export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookieName = "ivrp-locale";
