import { globalSeoQuery, type seoQueryType  } from '#lib/queries/index.js';

export type layoutQueryType = {
  isErrorPage: true,
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
    }[],
    children?: {
      id: string,
      title: string,
      isListed: string,
      modified: string,
      url: string,
    }[],
    seo: seoQueryType,
  }
};

export const layoutQuery = {
	query: 'site',
	select: {
    title: true,
		headline: true,
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
			query: 'site.children.listed',
			select: {
				id: true,
				title: true,
				isListed: true,
				modified: "page.modified('c', 'date')",
				url: 'page.url'
			}
    },
    seo: globalSeoQuery ? globalSeoQuery : null,
	}
}
