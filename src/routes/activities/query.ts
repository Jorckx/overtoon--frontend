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
    subtitle: true,
		location: true,
    eventtype: true,
    text: 'page.text.inline',
    modified: "page.modified('c', 'date')",
    year: 'page.start.toDate("Y")',
		start: true,
		end: true,
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
      },
    },
  },
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
