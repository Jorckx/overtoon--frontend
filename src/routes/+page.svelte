<script lang="ts">
import { page } from '$app/state';
import Image from "#lib/components/Image.svelte"
import reveal from "#lib/utils/reveal.js"

// 3. state
const hll = $derived(page.data.pageData?.highlights.length)
let nth = $state(0)
// let shownav = $state(false)
function next() {
    if (!hll) return;
    nth = (nth + 1) % hll;
}
function prev() {
    if (!hll) return;
    nth = (nth - 1 + hll) % hll;
}

// 3. DATA DEBUG
import Datarow from '#lib/components/data/row.svelte'
import Datawrapper from '#lib/components/data/wrapper.svelte'
</script>
<!-- clip the highlightso no more overflow -->
<div class="h-[calc(100dvh-var(--hh))] overflow-clip relative">
    {#if hll > 1}
    <div class="absolute left-0 top-0 z-200 text-black backdrop-blur-md flex gap-main p-main text-sm">
        <button class=" font-black cursor-pointer" onclick={prev}>&larr;</button>
        <span class=" font-black">{nth + 1}/{hll}</span>
        <button class=" font-black cursor-pointer" onclick={next}>&rarr;</button>
    </div>
    {/if}
    {#key nth}
    <div use:reveal={{delay: 0, duration: '400ms', opacityDuration: '0ms'}} class="h-full js:reveal reveal-right">
        <Image image={page.data.pageData.highlights[nth].cover} ratio="inherit" />
    </div>
    {/key}
</div>

<!-- DATA DEBUG -->
{#if page.data.devmode}
    {#snippet datarows()}
        <Datarow data={JSON.stringify(page.data.pageData, null, 2)} sum="page" />
        <Datarow data={JSON.stringify(page.data.layoutData, null, 2)} sum="layout" />
    {/snippet}
    <Datawrapper content={datarows}/>
{/if}
