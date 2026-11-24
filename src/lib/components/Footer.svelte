<script lang="ts">
    // 1. internal
    import { consent } from '#lib/analytics/consent.js';
    import { page } from '$app/state';
	import { resolve } from '$app/paths';
    import { localizeHref } from '#lib/paraglide/runtime.js';
    import { m } from '#lib/paraglide/messages.js';

    // 2. components
    import Socials from '#lib/components/Socials.svelte'
    import Subscribe from '#lib/components/Subscribe.svelte'

    // 3. state
    const footerBg = $derived(page.data.pageTheme ? page.data.pageTheme.bg : "transparent")
</script>


<footer class="flex flex-col items-center" style:background-color={footerBg}>

    <!-- Page ref -->
    <!-- {#key page.data.pageData?.id}
    {#if page.data.pageData?.pageref?.length}
        {const refs = page.data.pageData?.pageref}
        <div class="page-subtitle bg-grey-400 text-black">{m.page_ref_label()}</div>
        <div class="page-ref flex flex-row flex-wrap justify-center gap-x-intro gap-y-px py-px">
            {#each refs as ref, i (i)}
                {const label = ref.label ? textSplit(ref.label) : textSplit(ref.title)}
                <a class="font-black text-xl flex justify-center opacity-85 hover:opacity-100 flex-wrap  " href={resolve(localizeHref('/' + ref.id ))} >
                    {#each label as word, i (i)}
                        <span class="brick bg-black text-white">{word}</span>
                    {/each}
                </a>
            {/each}
        </div>
    {/if}
    {/key} -->

    <!-- footer content -->
    <div class="p-main pb-sm text-black w-full">
        <!-- menu -->
        <nav aria-label={m.footer_nav_aria()} class="border-t-3 h-full flex flex-col flex-wrap md:flex-col md:justify-end justify-end md:items-center gap-y-main">
            <ul class="nav-prim">
                {#each page.data.layoutData?.footermenu ?? [] as child, i (i)}
                <li><a href={resolve(localizeHref('/' + (child.id === 'home' ? '' : child.id)))}>{child.title}</a></li>
                {/each}
            </ul>
            <div class=" flex md:max-w-250 mx-auto w-full p-intro">
                <Subscribe />
            </div>
           	<div class="flex justify-center">
                <Socials platforms={page.data.layoutData?.platforms} />
           	</div>
            <div class="flex justify-between w-full">
            <ul class="nav-sec">
        		<li>&copy; {new Date().getFullYear()} overtoon</li>
                <li><a href="/sitemap.xml" data-sveltekit-reload>sitemap</a></li>
                <li><button onclick={consent.show} class="cookietoggle">Cookie-instellingen</button></li>
            </ul>
        	<ul class="nav-ter">
        		<li>Webdesign: <a href="https://studiodier.com" target="_blank">Studio Dier</a></li>
        	</ul>
            </div>
        </nav>
    </div>
</footer>
<style>
   	@reference '#lib/styles/app.css';
    .nav-prim{
        @apply w-full flex flex-row flex-wrap items-center justify-between gap-x-main text-base font-normal lowercase leading-4.5 text-right;
    }
    .nav-sec{
        @apply flex flex-row justify-center gap-x-main text-sm text-black/30;
    }
    .nav-ter{
        @apply flex flex-row justify-center gap-x-main text-sm text-black/30;
    }
</style>
