<script lang="ts">
    import { page } from '$app/state';
    import Blocks from '#lib/components/Blocks.svelte'

    // 3. DATA DEBUG
    import Datarow from '#lib/components/data/row.svelte'
    import Datawrapper from '#lib/components/data/wrapper.svelte'
</script>
{#if page.data.pageData}
    <div class="p-main h-[200vh]">
    <h1>{page.data.pageData.title}</h1>
    <h1>{page.data.pageData.intro}</h1>
    <Blocks />
    </div>
{:else}
    page not found…
{/if}

<!-- DATA DEBUG -->
{#if page.data.devmode}
    {#snippet datarows()}
        <Datarow data={JSON.stringify(page.data.pageData, null, 2)} sum="page" />
        <Datarow data={JSON.stringify(page.data.layoutData, null, 2)} sum="layout" />
    {/snippet}
    <Datawrapper content={datarows}/>
{/if}
