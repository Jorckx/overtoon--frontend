import { error } from '@sveltejs/kit';
import { useKqlQuery, getPreview, withPreview } from '#lib/utils/useKirby.js';
import { getLocale, deLocalizeUrl } from '#lib/paraglide/runtime.js';
import { pageQuery } from './query.js';
import type { pageQueryType } from './query.js';

export const prerender = false;

export async function load({ url, locals }) {
  const lang = getLocale();
  const preview = getPreview(url);
  // const pageId = deLocalizeUrl(url).pathname.replace(/^\/|\/$/g, '');
  const pageId = deLocalizeUrl(url).pathname;

  // query with preview wrapper to iddentify preview-query (hooks >> cache-control: no-store)
  const pageData: pageQueryType = await useKqlQuery(withPreview(pageQuery, preview), lang);
  const page = pageData?.result ?? pageData;
  if (!page) throw error(404, 'Page not found');

  // flatten artists with year
  const artists = (page.artists ?? []).map((artist) => ({
    ...artist,
    years: [...new Set((artist.periods ?? []).map((p) => p.year))]
  }));
  if (!artists) throw error(404, 'artists not found');

  // current artists
  // const current = (artists ?? []).filter((artist) => artist.current === 'true');
  function pickRandom(items, limit = 10) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, limit);
  }

  const randomArtists = pickRandom(artists ?? [], 10);


  // Cache-Tag for this page. The hook sends it with the response (hooks.server.ts && app.d.ts).
  locals.cacheTags.add(`page:${pageId}`);
  console.log(locals.cacheTags)

  return {
    theme: 'var(--color-pink-300)',
    artists,
    randomArtists,
    pageData,
    isPreview: !!preview,
    metamessage: url.pathname.slice(1)
  };
}
