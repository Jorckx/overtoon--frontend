export const LANGS = ['en', 'nl'] as const;
export type Lang = (typeof LANGS)[number];

// The only line to change when switching the default language
export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value: unknown): value is Lang =>
	LANGS.includes(value as Lang);

export function getLang(params: { lang?: string }): Lang {
	return isLang(params.lang) ? params.lang : DEFAULT_LANG;
}

const LANG_PREFIX = new RegExp(`^/(${LANGS.join('|')})(?=/|$)`);

/** Remove any language prefix from a pathname */
export function stripLang(pathname: string): string {
	return pathname.replace(LANG_PREFIX, '') || '/';
}

/** Prefix a path with the language segment (default language stays unprefixed) */
export function localizeHref(path: string, lang: Lang): string {
	if (lang === DEFAULT_LANG) return path;
	return `/${lang}${path === '/' ? '' : path}`;
}

/** Same page, other language */
export function switchLangHref(pathname: string, to: Lang): string {
	return localizeHref(stripLang(pathname), to);
}
