<script lang="ts">
// 1. INTERNAL
import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
import { resolve } from '$app/paths';
import { page } from '$app/state';
// import { fade } from 'svelte/transition';
const path = $derived(deLocalizeHref(page.url.pathname));

// 2. COMPONENTS
import Logo from '#lib/components/header/LogoAnimated.svelte';
import LogoO from '#lib/components/header/LogoO.svelte';
import MenuMobile from '#lib/components/header/MenuMobile.svelte';
// import HomeTab from '#lib/components/Sidebar/HomeTab.svelte';
// import StickyO from '#lib/components/StickyO.svelte';

// 2. STATE
const currentLang = $derived(getLocale());
let w = $state(0)
let y = $state(0)
let logoh = $state(0)
let toggleMenu = $state(false)
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} />
{#snippet mobileToggle()}
    <button onclick={() => toggleMenu = !toggleMenu} aria-label="Menu" class="h-full aspect-square grid place-items-center ml-auto cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="p-main">
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
        <div class="menu h-full transition-border duration-100 border-b-6">
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
                        <li class="font-semibold lowercase leading-4.5 text-right">
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
<div class="header-wrapper grid lg:grid-cols-(--interface-cols) grid-rows-1 duration-200 transition-all" class:scrolled={y > 50}>
    <!-- LOGO -->
    <div class="header-main flex w-full flex-row justify-between z-400 bg-white/80 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
        <div class="logo w-full grow">
            <LogoO active={y > 50} />
            <Logo duration={3000} interval={10000} hide={y > 50} />
        </div>
        {#if w < 976}
        <div class="border-b-6 h-auto w-auto lg:hidden">
            {@render mobileToggle()}
        </div>
        {/if}
    </div>

    <!-- MENU -->
    <div class="hidden lg:block h-full mb-main">
        {@render menu()}
    </div>


    <!-- MENU mobile -->
    {#if w < 976}
        <MenuMobile open={toggleMenu}/>
    {/if}
</div>

<style>
    @reference "#lib/styles/app.css";
    .logo{
        @apply z-100 h-full flex items-center p-main lg:pl-0 lg:ml-main duration-300;
        @apply border-b-6 border-black;
    }
    .menu > *{
        /*@apply border-r-3 pr-sm h-fit;*/
    }
    .header-wrapper.scrolled .menu-inner {
        /*@apply bg-white;*/
    }
    .header-wrapper.scrolled .menu,
    .header-wrapper.scrolled .logo {
        @apply lg:border-transparent;
        /*@apply border-black/3;*/
    }
</style>
