<script lang="ts">
    // let {hh} = $props()
    import { page } from '$app/state';
	// import { DEFAULT_LANG, LANGS, localizeHref, switchLangHref, type Lang } from '#lib/utils/i18n.ts';
	// const lang = $derived<Lang>(page.data.lang ?? DEFAULT_LANG);
	import { resolve } from '$app/paths';
    import { locales, getLocale, localizeHref, deLocalizeHref } from '#lib/paraglide/runtime.js';
    const currentLang = $derived(getLocale());

	// let hh = $state()
</script>
<div class="p-main pb-0 h-full">
    <div class="border-b-3 flex gap-x-4 w-full justify-between h-full">
        <!-- language switch -->
        <nav aria-label={page.data.layoutData?.ui?.languages ?? 'Languages'}>
          <ul class="flex opacity-25">
            {#each locales as locale, i (locale)}
              {#if i > 0}<li aria-hidden="true">/</li>{/if}
              <li>
                <a
                  href={resolve(localizeHref(deLocalizeHref(page.url.pathname), { locale }))}
                  hreflang={locale}
                  lang={locale}
                  aria-current={locale === currentLang ? 'true' : undefined}
                  class:font-semibold={locale === currentLang}
                  data-sveltekit-reload
                >{locale}</a>
              </li>
            {/each}
          </ul>
        </nav>
        <!-- menu -->
        <nav aria-label={page.data.layoutData?.ui?.menu ?? 'Main'}>
            <ul class="pb-main block">
            {#each page.data.layoutData?.menu ?? [] as child, i (i)}
                <li class="font-semibold lowercase leading-4.5 text-right">
                    <a href={resolve(localizeHref('/' + child.id, { locale: currentLang }))}>{child.title}</a>
                </li>
            {/each}
            </ul>
        </nav>
    </div>
</div>
<!-- <div class="sidebar p-main text-stone-600">Overtoon is a platform for production, distribution and research for sound art and for sound-based installation art.</div> -->
