import { globalSeoQuery, type seoQueryType  } from '#lib/queries/index.js';

export type layoutQueryType = {
  isErrorPage: true;
  result?: {
    id: string;
    title: string;
    headline?: string,
    ui?: string,
    menu?: {
      id: string,
      title: string,
      isListed: string,
      modified: string,
      url: string,
    }[];
    children?: {
      id: string,
      title: string,
      isListed: string,
      modified: string,
      url: string,
    }[];
    seo: seoQueryType,
  }
};

export const layoutQuery = {
	query: 'site',
	select: {
    title: true,
		headline: 'page("home").headline.inline',
		// translatable UI strings (site.yml → Interface tab)
		ui: 'site.ui.toObject',
		// description: true,
		// maintenance: 'site.maintenance',
    menu: {
      query: 'site.menu.toPages',
			select: {
				id: true,
				title: true,
				isListed: true,
				modified: "page.modified('c', 'date')",
				url: 'page.url'
			}
		},
		children: {
			query: 'site.children',
			select: {
				id: true,
				title: true,
				isListed: true,
			}
    },
    news: {
      query: 'page("updates").announcements.toPages',
      select: {
        id: true,
        title: true,
        category: true,
        highlightSum: 'page.highlight.toObject.summary.inline',
        highlightSub: 'page.highlight.toObject.subtitle.inline',
        highlightEnd: 'page.highlight.toObject.end.toDate',
				modified: "page.modified('c', 'date')",
      }
    },
    activities: {
      query: 'page("activities").children.listed',
      select: {
        id: true,
        title: true,
        artists: {
          query: 'page.artists.toPages',
          select: {
            title: true,
            id: true,
          }
        }
      }
    },
    residents: {
      query: 'page("artists").children.listed',
      select: {
        id: true,
        title: true,
        periods: {
          query: 'page.periods.toStructure',
          select: {
            start: 'structureItem.start',
            end: 'structureItem.end.toDate',
            links: true
          }
        }
      }
    },
    seo: globalSeoQuery ? globalSeoQuery : null,
	}
}
