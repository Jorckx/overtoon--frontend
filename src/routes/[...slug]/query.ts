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
export function getPageQuery(pageId: string) {
  return{
  	query: `page("${pageId}")`,
    select: {
      title: true,
      intro: true,
      images: getImages('page.files'),
      blocks: 'page.blocks.toBlocks',
  		seo: getSeoQuery
  	}
  }
};
