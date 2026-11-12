<script lang="ts">
// 1. INTERNAL
import { localizeHref, deLocalizeHref, locales, getLocale } from '#lib/paraglide/runtime.js';
import { resolve } from '$app/paths';
import { page } from '$app/state';


// 2. COMPONENTS
import Logo from '#lib/components/LogoAnimated.svelte';
// import StickyO from '#lib/components/StickyO.svelte';

// 2. STATE
const currentLang = $derived(getLocale());
// let hh = $state<number>(0)
// let sbh = $derived(hh + 3)
</script>
{#snippet menu()}
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
{/snippet}

<a href={resolve(localizeHref('/'))} class="z-100 h-full flex items-center border-b-3 p-main">
    <Logo duration={3000} interval={10000} />
</a>
<nav class="w-full hidden lg:block">
    {@render menu()}
</nav>
