import { useKqlQuery } from '#lib/utils/useKirby.ts';
import { getLang } from '#lib/utils/i18n.ts';
import { getMetaQuery, homeQuery } from '#lib/queries/index.ts';

export async function load({ params }) {
	const lang = getLang(params);
	try {
		const [homeData, seoData] = await Promise.all([
			useKqlQuery(homeQuery, lang),
			useKqlQuery(getMetaQuery('home'), lang)
		]);
		return {
			// seo data
			seoData: seoData,
			pageData: homeData
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
