import { getImages } from './images';

export const homeQuery = {
  query: 'page("home")',
  select: {
    title: true,
  	highlights: {
      query: "page('home').highlights.toPages",
      select: {
          title: 'page.title',
          headline: 'page.headline',
          // https://unicode-org.github.io/icu/userguide/format_parse/datetime/#date-field-symbol-table
          startdate: 'page.startdate.toDate("LLLL d y")',
          artists: 'page.artists.toPages.first.title',
          cover: getImages('page.cover.toFiles?.first')
        }
  	},
	}
}
