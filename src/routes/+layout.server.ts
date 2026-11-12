
// import { getLang } from '#lib/utils/i18n.ts';
// import { getLocale } from '#lib/paraglide/runtime.js';
// import { globalMetaQuery, siteQuery } from '#lib/queries/index.ts';
import { dev } from '$app/env';
import { error } from '@sveltejs/kit';

import { useKqlQuery, getPreview, withPreview } from '#lib/utils/useKirby.js';
import { getLocale, deLocalizeUrl } from '#lib/paraglide/runtime.js';
import { splitResidents } from '#lib/utils/residents.js';
import { layoutQuery, type layoutQueryType } from './layoutQuery.js';

export const prerender = false;

let devmode = false;
if (dev) {
	devmode = true;
}


export async function load({ url, locals }) {
  const lang = getLocale();
  const preview = getPreview(url);
  // const pageId = stripLang(url.pathname).replace(/^\/|\/$/g, '');

  // query with preview wrapper to iddentify preview-query (hooks >> cache-control: no-store)
  const layoutData: layoutQueryType = await useKqlQuery(withPreview(layoutQuery, preview), lang);
  const page = layoutData?.result ?? layoutData;
  if (!page) throw error(404, 'Page not found…');

  const activitiesByArtist = new Map<string, { id: string; title: string }[]>();

  for (const activity of page.activities) {
    for (const artist of activity.artists ?? []) {
      const list = activitiesByArtist.get(artist.id) ?? [];
      list.push({ id: activity.id, title: activity.title });
      activitiesByArtist.set(artist.id, list);
    }
  }
  const { residents, mode: residentsMode } = splitResidents(
    (page.residents ?? []).map((resident) => ({
      ...resident,
      activities: activitiesByArtist.get(resident.id) ?? [],
    })),
    Date.now()
  );

  // Cache-Tag for this page. The hook sends it with the response (hooks.server.ts && app.d.ts).
  locals.cacheTags.add(`page:${deLocalizeUrl(url)}`);
  console.log('cachetag:', locals.cacheTags)

  return {
    layoutData,
    devmode,
    residents,
    residentsMode,
    isPreview: !!preview,
    metamessage: url.pathname.slice(1)
  };
}
