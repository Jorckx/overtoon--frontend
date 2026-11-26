<script lang="ts">
    // 1. props
    let { onSelect } = $props();

    // 1. internal
   	import { page } from '$app/state';
	import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
	import { resolve } from '$app/paths';

    // 1. state
    const path = $derived(deLocalizeHref(page.url.pathname));
	const currentLang = $derived(getLocale());
</script>
<!-- SNIPPETS -->
{#snippet menu()}
<div class="h-fit flex gap-x-main w-full items-end justify-between">
    <!-- language switch -->
    <nav aria-label={page.data.layoutData?.ui?.languages ?? 'Languages'}>
        <ul class="flex">
        {#each locales as locale, i (locale)}
            {#if i > 0}<li class="menu-item" aria-hidden="true">/</li>{/if}
            <li class="menu-item font-bold">
            <a
                href={resolve(localizeHref(deLocalizeHref(page.url.pathname), { locale }))}
                hreflang={locale}
                lang={locale}
                onclick={onSelect}
                aria-current={locale === currentLang ? 'true' : undefined}
                class:font-normal={locale === currentLang}
                data-sveltekit-reload
            >{locale}</a>
            </li>
        {/each}
        </ul>
    </nav>
    <!-- menu -->
    <nav aria-label={page.data.layoutData?.ui?.menu ?? 'Main'}>
        <!-- <ul class="pb-main grid grid-rows-2 grid-cols-2 gap-x-8"> -->
        <ul class="block">
        {#each page.data.layoutData?.menu ?? [] as child, i (i)}
            <li class="menu-item font-bold">
                <a
                    href={resolve(localizeHref('/' + child.id, { locale: currentLang }))}
                    onclick={onSelect}
                    class:font-normal={path === '/' + child.id}
                >{child.title}</a>
            </li>
        {/each}
        </ul>
    </nav>
</div>

{/snippet}

<!-- MARKUP -->
<div class="menu-mobile" style:--thm="var(--color-cyan-400)">
    <!-- inner -->
    <div class="menu-mobile-inner p-main w-full h-full flex flex-col justify-end">
        {@render menu()}
    </div>
</div>



<style>
    @reference "#lib/styles/app.css";
    .menu-mobile{
        @apply
            z-20 w-full h-fit items-end justify-between flex flex-col inset-0 pt-main lg:hidden
            transition-[visibility] duration-300;
    }
            /*bg-linear-to-b to-(--thm) from-white;*/
    .menu-item {
        @apply text-md font-marfa lowercase leading-tight text-right overflow-clip;
    }
</style>
