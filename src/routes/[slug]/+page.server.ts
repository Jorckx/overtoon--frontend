import { error } from '@sveltejs/kit';
import { useKqlQuery, getPreview, withPreview } from '#lib/utils/useKirby.js';
import { getLocale, deLocalizeUrl } from '#lib/paraglide/runtime.js';
import { getPageQuery } from './query.js';
import type { pageQueryType } from './query.js';

export const prerender = false;

export async function load({ url, locals }) {
  const lang = getLocale();
  const preview = getPreview(url);
  // const pageId = deLocalizeUrl(url).pathname.replace(/^\/|\/$/g, '');
  const pageId = deLocalizeUrl(url).pathname;

  // query with preview wrapper to iddentify preview-query (hooks >> cache-control: no-store)
  const pageData: pageQueryType = await useKqlQuery(withPreview(getPageQuery(pageId), preview), lang);
  const page = pageData?.result ?? pageData;
  if (!page) throw error(404, 'Page not found');

  // Cache-Tag for this page. The hook sends it with the response (hooks.server.ts && app.d.ts).
  locals.cacheTags.add(`page:${pageId}`);
  console.log(locals.cacheTags)

  return {
    pageData,
    isPreview: !!preview,
    metamessage: url.pathname.slice(1)
  };
}
