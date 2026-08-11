import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, localeCookieName, type Locale } from "../lib/locale";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(localeCookieName)?.value;
  const locale: Locale = cookieValue === "ur" ? "ur" : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
