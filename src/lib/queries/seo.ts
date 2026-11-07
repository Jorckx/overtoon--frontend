import { getImages } from './images';
export type seoQueryType = {
  sitetitle: string,
  seotitle: string,
  seotags: string,
  seometa: string,
  shareimage: string
}
export const globalSeoQuery = {
	query: 'site',
	select: {
		sitetitle: 'site.title',
		seotitle: 'site.seotitle',
		seotags: 'site.seotags',
		seometa: 'site.seometa',
		shareimage: getImages('site.shareimage ? site.shareimage.toFiles?.first : null')
	}
};

export const getSeoQuery = {
	query: 'page',
	select: {
		title: true,
		sitetitle: 'site.seotitle',
		seotitle: 'page.seotitle',
		seotags: 'page.seotags',
		seometa: 'page.seometa',
		shareimage: getImages(
			'page.shareimage ? page.shareimage.toFiles?.first : site.shareimage.toFiles?.first'
		)
	}
}
