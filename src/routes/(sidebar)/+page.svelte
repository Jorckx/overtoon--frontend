<script lang="ts">
// 1. internal
import { page } from '$app/state';
import reveal from "#lib/utils/reveal.js"

// 1. components
import Image from "#lib/components/Image.svelte"
import HomeTab from "#lib/components/Sidebar/HomeTab.svelte"
import Sidebar from "#lib/components/Sidebar/index.svelte"

// 3. state
const hll = $derived(page.data.pageData?.highlights.length)
let nth = $state(0)
function next() {
    if (!hll) return;
    nth = (nth + 1) % hll;
}
function prev() {
    if (!hll) return;
    nth = (nth - 1 + hll) % hll;
}

</script>

<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <HomeTab/>
{/snippet}

<!-- MARKUP -->
<div class="h-[calc(100dvh-var(--hh))] overflow-clip relative">
    {#if hll > 1}
    <div class="absolute left-0 top-0 z-200 text-white bg-blend-difference flex gap-main p-sm text-base">
        <button class=" font-black cursor-pointer" onclick={prev}>&larr;</button>
        <!-- <span class=" font-black">{nth + 1}/{hll}</span> -->
        <button class=" font-black cursor-pointer" onclick={next}>&rarr;</button>
    </div>
    {/if}
    {#key nth}
    <div class="h-full">
        <Image image={page.data.pageData.highlights[nth].cover} ratio="inherit" />
    </div>
    {/key}
</div>
<Sidebar content={sidebarContent} />
