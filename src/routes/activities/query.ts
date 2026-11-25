import { getImages, getSeoQuery, type seoQueryType, type imageType  } from '#lib/queries/index.js';

export type pageQueryType = {
  isErrorPage: true,
  result?: {
    id: string;
    title: string;
    intro?: string,
    images?: imageType;
    blocks?: string;
    seo: seoQueryType
  }
};
export const pageQuery  = {
 	query: `page("activities")`,
  select: {
    title: true,
    intro: 'page.intro.inline',
    images: getImages('page.files'),
    blocks: 'page.blocks.toBlocks',
		seo: getSeoQuery
 	}
};
