export const LANGS = ['nl', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export function getLang(params: { lang?: string }): Lang {
	return (params.lang as Lang) ?? DEFAULT_LANG;
}

/** Prefix a path with the language segment (default language stays unprefixed) */
export function localizeHref(path: string, lang: Lang): string {
	if (lang === DEFAULT_LANG) return path;
	return `/${lang}${path === '/' ? '' : path}`;
}

/** Same page, other language */
export function switchLangHref(pathname: string, to: Lang): string {
	const path = pathname.replace(/^\/nl(?=\/|$)/, '') || '/';
	return localizeHref(path, to);
}
