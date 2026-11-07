<script lang="ts">
    import { page } from '$app/state';
    import Data from '#lib/components/data.svelte'
    import Blocks from '#lib/components/Blocks.svelte'
</script>
{#if page.data.pageData}
    <h1>{page.data.pageData.title}</h1>
    <h1>{page.data.pageData.intro}</h1>
    blocks:
    <!-- {page.data.pageData.intro} -->
    <Blocks />
    <Data data={JSON.stringify(page.data.pageData, null, 2)} />
{:else}
    page not found…
{/if}
