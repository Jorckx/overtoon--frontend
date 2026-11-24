<script lang="ts">
    import { page } from '$app/state';
    import Blocks from '#lib/components/Blocks.svelte'
</script>
{#if page.data.pageData}
    <div class="p-main h-[200vh]">
        <h1>{page.data.pageData.title}</h1>
        <!-- <h2>{page.data.pageData.intro}</h2> -->
        <Blocks />
    </div>
{:else}
    page not found…
{/if}
