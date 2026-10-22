import { useKqlQuery } from '#lib/utils/useKirby.ts';
import { getLang } from '#lib/utils/i18n.ts';
import { getMetaQuery, getPageQuery } from '#lib/queries/index.ts';

export async function load({ params }) {
	const lang = getLang(params);
	// params.slug matches the Kirby page id (same slug in every language)
	const { slug } = params;
	try {
		const [pageData, seoData] = await Promise.all([
			useKqlQuery(getPageQuery(slug), lang),
			useKqlQuery(getMetaQuery(slug), lang)
		]);
		return {
			// seo data
			seoData: seoData,
			pageData: pageData
		};
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		return {
			seoData: null,
			pageData: null,
			error: errorMessage
		};
	}
}
