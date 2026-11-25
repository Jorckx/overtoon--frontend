<script lang="ts">
    // 1. props
    let { open } = $props();

    // 1. internal
    import reveal from '#lib/utils/reveal.js';
   	import { page } from '$app/state';
	import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
	import { resolve } from '$app/paths';

    // 1. state
    const path = $derived(deLocalizeHref(page.url.pathname));
	const currentLang = $derived(getLocale());
</script>
<!-- SNIPPETS -->
{#snippet menu()}
    <div class="pb-0 h-fit p-main w-full">
        <div class="menu h-full transition-border duration-100 border-b-3">
            <div class="menu-inner h-fit flex gap-x-4 w-full justify-between">
                <!-- language switch -->
                <nav aria-label={page.data.layoutData?.ui?.languages ?? 'Languages'}>
                  <ul class="flex">
                    {#each locales as locale, i (locale)}
                      {#if i > 0}<li aria-hidden="true">/</li>{/if}
                      <li>
                        <a
                          href={resolve(localizeHref(deLocalizeHref(page.url.pathname), { locale }))}
                          hreflang={locale}
                          lang={locale}
                          onclick={() => open = false}
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
                    <!-- <ul class="pb-main grid grid-rows-2 grid-cols-2 gap-x-8"> -->
                    <ul class="block">
                    {#each page.data.layoutData?.menu ?? [] as child, i (i)}
                        <li class="font-semibold lowercase leading-4.5 text-right">
                            <a
                                href={resolve(localizeHref('/' + child.id, { locale: currentLang }))}
                                onclick={() => open = false}
                                class:font-normal={path === child.id}
                            >{child.title}</a>
                        </li>
                    {/each}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
{/snippet}

{#snippet menuContent()}
    {@render menu()}

{/snippet}

<!-- MARKUP -->
<div class="menu-mobile" class:open style:--thm="var(--color-cyan-400)">
    <!-- inner -->
    <div use:reveal={{delay: 300, duration: '100ms', opacityDuration: '300ms'}} class="js:reveal p-main w-full h-full flex flex-col justify-end">
        {@render menuContent()}
    </div>
</div>



<style>
    @reference "#lib/styles/app.css";
    .menu-mobile{
        @apply
            fixed z-20 w-full h-full items-end justify-between flex flex-col inset-0 pt-(--hh) lg:hidden
            transition-transform duration-200 pointer-events-none;
        transform: translateX(100vw);
    }
    .menu-mobile.open{
        @apply pointer-events-auto;
        transform: translateX(0);
    }
    div :global(.sidebar-section){
        @apply grid grid-cols-1 grid-rows-[auto_auto] gap-y-0.5;
    }
    div :global(.sidebar-header){
        @apply border-b flex items-center h-fit leading-tight lowercase mb-0.75;
    }
    div :global(.sidebar-header > h3){
        @apply font-bold;
    }
    div :global(.sidebar-content){
        @apply text-sm font-tz;
    }
    .menu-mobile::after{
        content: '';
        --tw-duration: 1s;
        @apply block fixed inset-0 z-[-1];
        @apply bg-linear-to-b to-(--thm) from-white;
    }

    div,
    div::after {
        transition: opacity 0.5s ease-out;
    }
    div.hide,
    div.hide::after {
        opacity: 0;
        z-index: -1;
        pointer-events: none;
    }
</style>
