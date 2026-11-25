<script lang="ts">
    // 1. props
    let { open } = $props();

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
    <div class="pb-0 h-fit p-main w-full">
        <div class="menu h-full transition-border duration-100">
            <div class="menu-inner h-fit flex gap-x-4 w-full justify-between">
                <!-- language switch -->
                <nav aria-label={page.data.layoutData?.ui?.languages ?? 'Languages'}>
                  <ul class="flex">
                    {#each locales as locale, i (locale)}
                      {#if i > 0}<li aria-hidden="true">/</li>{/if}
                      <li class="menu-item">
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
                        <li class="menu-item">
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

<!-- MARKUP -->
<div class="menu-mobile" class:open style:--thm="var(--color-cyan-400)">
    <!-- inner -->
    <div class="menu-mobile-inner p-main w-full h-full flex flex-col justify-end">
        {@render menu()}
    </div>
</div>



<style>
    @reference "#lib/styles/app.css";
    .menu-mobile{
        @apply
            z-20 w-full h-fit items-end justify-between flex flex-col inset-0 pt-lg lg:hidden
            pointer-events-none;
        /* closed: hidden from tab order/taps once the collapse has finished */
        visibility: hidden;
        transition: visibility 0s linear 300ms;
    }
    .menu-mobile-inner {
        opacity: 0;
        transform: translateY(-0.5rem);
        transition: opacity 150ms ease-out, transform 200ms ease-out;
    }
    .menu-item {
        @apply font-bold text-md lowercase leading-tight text-right overflow-clip;
    }
    .menu-mobile.open{
        @apply pointer-events-auto;
        visibility: visible;
        transition-delay: 0s;
    }
    .menu-mobile.open .menu-mobile-inner {
        opacity: 1;
        transform: none;
        transition: opacity 200ms ease-out 100ms, transform 300ms ease-out 100ms;
    }
    @media (prefers-reduced-motion: reduce) {
        .menu-mobile, .menu-mobile-inner, .menu-mobile.open .menu-mobile-inner { transition: none; }
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
</style>
