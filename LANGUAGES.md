## srcs/utils/i18n.ts

```
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
```

## src/hooks.server.ts

```
import type { Handle } from '@sveltejs/kit/hooks';
import { getLang } from '#lib/utils/i18n.ts';

// Sets <html lang="%lang%"> from the URL language
export const handle: Handle = ({ event, resolve }) => {
	const lang = getLang(event.params);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
```
## src/params.ts

set params for 'lang' >> [[lang=lang]]
```
import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Only non-default languages get a URL prefix (en lives at the root)
	lang: (param) => (param === 'nl' ? param : undefined)
});

```
