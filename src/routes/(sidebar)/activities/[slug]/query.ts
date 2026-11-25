import { getImages, getSeoQuery, type seoQueryType, type imageType  } from '#lib/queries/index.js';

export type pageQueryType = {
  isErrorPage: true,
  result?: {
    id: string;
    title: string;
    text?: string,
    images?: imageType;
    cover?: imageType;
    blocks?: string;
    seo: seoQueryType
  }
};
export function getPageQuery(pageId: string) {
  return{
  	query: `page("${pageId}")`,
    select: {
      title: true,
      subtitle: true,
      text: 'page.text',
      images: getImages('page.files'),
      cover: getImages('page.cover.toFile'),
      artists: {
        query: 'page.artists.toPages',
        select: {
          title: true,
          id: true,
        }
      },
      links: {
        query: 'page.links.toStructure',
        select: {
          id: 'structureItem.link.toPage ? structureItem.link.toPage.id : structureItem.link',
          label: true,
        }
      },
      periods: {
        query: 'page.periods.toStructure',
        select: {
          start: 'structureItem.start',
          end: 'structureItem.end',
          year: 'structureItem.start.toDate("y")',
          links: true
        },
      },
      blocks: 'page.blocks.toBlocks',
  		seo: getSeoQuery
  	}
  }
};
