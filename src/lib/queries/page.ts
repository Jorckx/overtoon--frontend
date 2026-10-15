export function getPageQuery(pageId: string) {
	return {
		query: `page("${pageId}")`
	};
}
