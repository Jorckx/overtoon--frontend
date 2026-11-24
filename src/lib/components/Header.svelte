<script lang="ts">
// 1. INTERNAL
import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import { fade } from 'svelte/transition';
const path = $derived(deLocalizeHref(page.url.pathname));

// 2. COMPONENTS
import Logo from '#lib/components/LogoAnimated.svelte';
import O from './O.svelte';
// import StickyO from '#lib/components/StickyO.svelte';

// 2. STATE
const currentLang = $derived(getLocale());
let y = $state(0)
let toggleMenu = $state(false)
</script>

<svelte:window bind:scrollY={y} />
{#snippet btn()}
    <button
        onclick={() => toggleMenu = !toggleMenu}
        in:fade|global={{ duration: 500, delay: 250 }}
        class="fixed right-main top-main font-tz text-md">
            menu
    </button>
{/snippet}
{#snippet menu()}
    <div class="menu-wrapper pb-0 h-full p-main">
        <div class="menu  h-full transition-border duration-100 border-b-3">
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
                            <a href={resolve(localizeHref('/' + child.id, { locale: currentLang }))} class:font-normal={path === child.id}>{child.title}</a>
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
    <!-- Logo -->
    <div class="logo">
        <O active={y > 50} />
        <Logo duration={3000} interval={10000} hide={y > 50} />
    </div>

    <!-- menu -->
    <div>
        <!-- {#if y > 50}
            {@render btn()}
        {/if} -->
        <div class="hidden lg:block h-full">
            {@render menu()}
        </div>
    </div>
</div>

<style>
    @reference "#lib/styles/app.css";
    .logo{
        @apply z-100 h-full flex items-center p-main duration-300;
    }
    .logo{
        @apply border-b-3 border-black;
    }
    .menu > *{
        /*@apply border-r-3 pr-sm h-fit;*/
    }
    .header-wrapper.scrolled .menu-inner {
        /*@apply bg-white;*/
    }
    .header-wrapper.scrolled .menu,
    .header-wrapper.scrolled .logo {
        @apply border-transparent;
        /*@apply border-black/3;*/
    }
</style>
