export const siteQuery = {
	query: 'site',
	select: {
		title: true,
		// description: true,
		// maintenance: 'site.maintenance',
		children: {
			query: 'site.children',
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
