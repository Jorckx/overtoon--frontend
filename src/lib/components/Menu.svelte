<script lang="ts">
    let {hh} = $props()
    import { page } from '$app/state';
	import { DEFAULT_LANG, LANGS, localizeHref, switchLangHref, type Lang } from '#lib/utils/i18n.ts';

	const lang = $derived<Lang>(page.data.lang ?? DEFAULT_LANG);
	// let hh = $state()
</script>
<div class="p-main pb-0 h-(--hh) sticky top-0">
    <div class="border-b-3 flex w-full justify-between h-full">
        <!-- language switch -->
        <nav aria-label={page.data.siteData?.ui?.languages ?? 'Languages'}>
            <ul class="flex opacity-25">
            {#each LANGS as l, i (l)}
                {#if i > 0}/{/if}
                <li>
                    <a
                        href={switchLangHref(page.url.pathname, l)}
                        hreflang={l}
                        aria-current={l === lang ? 'true' : undefined}
                        class={l === lang ? 'font-semibold' : ''}
                    >{l}</a>
                </li>
            {/each}
            </ul>
        </nav>
        <!-- menu -->
        <nav aria-label={page.data.siteData?.ui?.menu ?? 'Main'}>
            <ul class="pb-main block">
            {#each page.data.siteData?.menu ?? [] as child, i (i)}
                <li class="font-semibold lowercase leading-4.5 text-right">
                    <a href={localizeHref('/' + child.id, lang)}>{child.title}</a>
                </li>
            {/each}
            </ul>
        </nav>
    </div>
</div>
<!-- <div class="sidebar p-main text-stone-600">Overtoon is a platform for production, distribution and research for sound art and for sound-based installation art.</div> -->
