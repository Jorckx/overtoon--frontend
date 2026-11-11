import { useKqlQuery, type KqlPaginated } from '#lib/utils/useKirby.js';
import { DEFAULT_LANG, LANGS } from '#lib/utils/i18n.js';

export const SITE = 'https://4hoog.be';

export type Alternate = { hreflang: string; href: string };
export type Entry = { loc: string; lastmod?: string; alternates?: Alternate[] };

type KqlPage = { id: string; uri: string; modified?: string };
type KqlResult = KqlPaginated<KqlPage> | KqlPage[] | null | undefined;

export const SITEMAPS = {
	pages: { query: 'site.pages.listed' },
	residencies: { query: "page('residencies').children.listed" },
	news: { query: "page('news').children.listed" },
	artists: { query: "page('artists').children.listed" }
} as const;

const escape = (s: unknown): string =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export function xmlResponse(body: BodyInit): Response {
	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
}

const lastmodTag = (lastmod?: string): string =>
	lastmod ? `\n\t\t<lastmod>${escape(lastmod)}</lastmod>` : '';

const alternateTags = (alternates: Alternate[] = []): string =>
	alternates
		.map(
			({ hreflang, href }) =>
				`\n\t\t<xhtml:link rel="alternate" hreflang="${escape(hreflang)}" href="${escape(href)}"/>`
		)
		.join('');

export function urlset(entries: Entry[]): string {
	const urls = entries.map(
		({ loc, lastmod, alternates }) =>
			`\n\t<url>\n\t\t<loc>${escape(loc)}</loc>${lastmodTag(lastmod)}${alternateTags(alternates)}\n\t</url>`
	);

	return [
    '<?xml version="1.0" encoding="UTF-8"?>',
   	'<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		'</urlset>'
	].join('\n');
}

export function sitemapIndex(entries: Entry[]): string {
	const items = entries.map(
		({ loc, lastmod }) =>
			`\n\t<sitemap>\n\t\t<loc>${escape(loc)}</loc>${lastmodTag(lastmod)}\n\t</sitemap>`
	);

	return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...items,
		'</sitemapindex>'
	].join('\n');
}

const urlFor = (lang: string | null, uri: string, prefix: string): string => {
	const path = uri === 'home' ? '' : `/${uri}`;
	const langPrefix = lang && lang !== DEFAULT_LANG ? `/${lang}` : '';
	return `${SITE}${langPrefix}${prefix}${path}`;
};

type Variant = { lang: string | null; uri: string; modified?: string };

/** Fetch pages from Kirby for every language and turn them into sitemap entries with hreflang alternates */
export async function kqlSitemap(
	query: string,
	{ prefix = '' }: { prefix?: string } = {}
): Promise<Entry[]> {
 	const multilang = LANGS.length > 1;
  const langs: (string | null)[] = multilang ? [...LANGS] : [null];

	const perLang = await Promise.all(
		langs.map(async (lang) => {
			const pages = await useKqlQuery<KqlResult>(
				{
					query,
					select: {
						id: 'page.id',
						uri: 'page.uri',
						modified: "page.modified('yyyy-MM-dd')"
					},
					pagination: { limit: 1000 }
				},
				lang
			);

			const list: KqlPage[] = Array.isArray(pages) ? pages : (pages?.data ?? []);
			return { lang, list };
		})
	);

	// Group the language variants of each page by its (language-independent) id
	const groups = new Map<string, Variant[]>();
	for (const { lang, list } of perLang) {
		for (const p of list) {
			const variants = groups.get(p.id) ?? [];
			variants.push({ lang, uri: p.uri, modified: p.modified });
			groups.set(p.id, variants);
		}
	}

	const entries: Entry[] = [];
	for (const variants of groups.values()) {
		let alternates: Alternate[] | undefined;

		if (multilang) {
			alternates = variants.map((v) => ({
				hreflang: v.lang as string,
				href: urlFor(v.lang, v.uri, prefix)
			}));
			const fallback = variants.find((v) => v.lang === DEFAULT_LANG) ?? variants[0];
			alternates.push({
				hreflang: 'x-default',
				href: urlFor(fallback.lang, fallback.uri, prefix)
			});
		}

		for (const v of variants) {
			entries.push({
				loc: urlFor(v.lang, v.uri, prefix),
				lastmod: v.modified,
				alternates
			});
		}
	}

	return entries;
}
