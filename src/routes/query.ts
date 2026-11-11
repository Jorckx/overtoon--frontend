import { getImages, globalSeoQuery, type seoQueryType, type imageType  } from '#lib/queries/index.js';

export type pageChildrenType = {
  title: string,
  headline: string,
  startdate: string,
  artists: string,
  cover: imageType,
}
export type pageQueryType = {
  isErrorPage: true,
  result?: {
    id: string;
    title: string;
    highlights?: pageChildrenType[],
    seo: seoQueryType
  }
};

export const pageQuery  = {
  query: 'page("home")',
  select: {
    id: true,
    title: true,
  	highlights: {
      query: "page.highlights.toPages",
      select: {
          title: 'page.title',
          headline: 'page.headline',
          // https://unicode-org.github.io/icu/userguide/format_parse/datetime/#date-field-symbol-table
          startdate: 'page.startdate.toDate("LLLL d y")',
          artists: 'page.artists.toPages',
          cover: getImages('page.cover.toFiles?.first')
        }
    },
    // seo: globalSeoQuery ? globalSeoQuery : null,
	}
}
