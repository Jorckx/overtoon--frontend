<script lang="ts">
// 1. INTERNAL
import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
import { resolve } from '$app/paths';
import { page } from '$app/state';
let { logoheader, y, w } = $props()

// import { fade } from 'svelte/transition';
// const path = $derived(deLocalizeHref(page.url.pathname));

// 2. COMPONENTS
// import Logo from '#lib/components/header/LogoAnimated.svelte';
// import LogoO from '#lib/components/header/LogoO.svelte';
import MenuMobile from '#lib/components/header/MenuMobile.svelte';
// import HomeTab from '#lib/components/Sidebar/HomeTab.svelte';
// import StickyO from '#lib/components/StickyO.svelte';

// 2. STATE
const currentLang = $derived(getLocale());
let toggleMenu = $state(false)
let closeMenu = () => {
  toggleMenu = false
}
</script>

{#snippet mobileToggle()}
    <button onclick={() => toggleMenu = !toggleMenu} aria-label="Menu" aria-expanded={toggleMenu} class="touch-manipulation relative inset-0 grid h-full items-start cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="size-full p-sm">
            <g stroke="black" stroke-width="5" stroke-linecap="butt" fill="none">
                <line x1="0" y1="5" x2="80" y2="5"/>
                <line x1="0" y1="22.5" x2="80" y2="22.5"/>
                <line x1="0" y1="40" x2="80" y2="40"/>
            </g>
        </svg>
    </button>
{/snippet}
{#snippet menu()}
    <div class="menu-wrapper pb-0 h-full p-main">
        <div class="menu">
            <div class="menu-inner">

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
                          aria-current={locale === currentLang ? 'true' : undefined}
                          class:font-bold={locale === currentLang}
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
                        <li class="font-bold lowercase leading-tight text-right">
                            <a
                                href={resolve(localizeHref('/' + child.id, { locale: currentLang }))}
                                class:font-normal={page.url.pathname === child.id}
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
<header class="fixed w-full top-0 z-900" style:--thm={page.data.theme || 'var(--color-cyan-400)'}>
    <div class="header-wrapper" class:scrolled={y > 50}>

        <div class="header-top" class:toggleMenu>
            <!-- LOGO -->
            {@render logoheader()}
            <!-- MENU mobile -->
            {#if w < 976}
            <div class="menu-toggle col-start-2 w-[calc(8.5vw+1.83rem)] lg:hidden pr-main">
                {@render mobileToggle()}
            </div>
            <div class="menu-drop row-start-2 col-span-2">
                <div class="min-h-0 overflow-hidden">
                    <MenuMobile onSelect={closeMenu} />
                </div>
            </div>
            {/if}
        </div>

        <!-- MENU -->
        <div class="hidden lg:block h-full mb-main">
            {@render menu()}
        </div>
    </div>
</header>
<style>
    @reference "#lib/styles/app.css";
    .header-top {
        @apply
            w-full lg:h-full grid lg:block grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-main lg:gap-0 z-400
            bg-white/95 backdrop-blur-sm border-b-4
            lg:border-none lg:backdrop-blur-none lg:bg-transparent;
    }
    /* the collapse lives in its own grid, so the logo/toggle row never re-lays out.
       0fr -> 1fr is interpolable, 0fr -> auto is not */
    .menu-drop {
        @apply grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out;
    }
    .header-top.toggleMenu .menu-drop {
        @apply grid-rows-[1fr];
    }
    @media (prefers-reduced-motion: reduce) {
        .menu-drop { transition: none; }
    }
    .header-wrapper{
        @apply
            w-full grid lg:grid-cols-(--interface-cols) grid-rows-1
            duration-200 transition-all;
    }
    .menu {
         @apply h-full transition-[border-size] duration-200 border-b-6;
    }
    .menu-inner {
         @apply h-fit flex gap-x-4 w-full justify-between;
    }

    /* SCROLLED */
    .header-wrapper .menu-wrapper{
        @apply  duration-300 transition-[background];
    }
    .header-wrapper.scrolled .menu-wrapper {
        @apply   h-fit bg-linear-to-bl  to-white/85 from-white backdrop-blur-[2px];
        /*bg-linear-to-bl  to-white/85 from-(--thm)*/
    }
    .header-wrapper.scrolled .menu-wrapper .menu{
        @apply border-b-6 pb-main;
    }
    .header-wrapper.scrolled :global(.logo-header) {
        @apply lg:border-transparent;
    }
</style>
