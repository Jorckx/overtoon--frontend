
export const siteQuery = {
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
		}
	}
};
