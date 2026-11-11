import { SITE, SITEMAPS, sitemapIndex, xmlResponse } from '#lib/utils/sitemap.js';

export function GET() {
	return xmlResponse(
		sitemapIndex(Object.keys(SITEMAPS).map((name) => ({ loc: `${SITE}/sitemap/${name}.xml` })))
	);
}
