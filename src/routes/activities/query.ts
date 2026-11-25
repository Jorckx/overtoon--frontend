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
// const linksQuery = {
//   query: 'page.links.toStructure',
//   select: {
//     link: true,
//     label: true,
//   }
// }
const artistQuery = {
		query: 'page.children',
		select: {
			isListed: true,
			id: true,
      title: true,
    }
}
const activityQuery = {
		query: 'page.children',
		select: {
			isListed: true,
			id: true,
      title: true,
      text: 'page.text.inline',
      modified: "page.modified('c', 'date')",
      year: 'page.start.toDate("Y")',
      eventtype: 'page.eventtype',
			start: 'page.start',
			end: 'page.end',
      cover: getImages('page.cover.toFile'),
      // links: linksQuery,
      // periods: {
      //   query: 'page.periods.toStructure',
      //   select: {
      //     start: 'structureItem.start',
      //     end: 'structureItem.end',
      //     year: 'structureItem.start.toDate("y")',
      //     links: true
      //   },
      // },
      // activities: true
  }
}
export const pageQuery  = {
 	query: `page("activities")`,
  select: {
    title: true,
    intro: 'page.intro.inline',
    images: getImages('page.files'),
    blocks: 'page.blocks.toBlocks',
    activities: activityQuery,
		seo: getSeoQuery
 	}
};
