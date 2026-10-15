import { getImages } from './images';

export const globalMetaQuery = {
	query: 'site',
	select: {
		sitetitle: 'site.title',
		shareimage: getImages('site.shareimage ? site.shareimage.toFiles?.first : null'),
		seotitle: 'site.seotitle',
		seotags: 'site.seotags',
		seometa: 'site.seometa'
	}
};

export function getMetaQuery(pageId: string) {
	if (pageId === '') {
		return globalMetaQuery;
	} else {
		return {
			query: `page("${pageId}")`,
			select: {
				title: true,
				sitetitle: 'site.seotitle',
				shareimage: getImages(
					'page.shareimage ? page.shareimage.toFiles?.first : site.shareimage.toFiles?.first'
				),
				seotitle: 'page.seotitle',
				seotags: 'page.seotags',
				seometa: 'page.seometa'
			}
		};
	}
}
