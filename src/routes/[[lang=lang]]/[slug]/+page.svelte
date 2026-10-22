<script lang="ts">
let { data } = $props();
</script>
<!-- {data.pageData.title} -->
{#if !data.pageData.isErrorPage}
    <pre>{JSON.stringify(data.pageData, null, 2)}</pre>
{:else}
    page not found…
{/if}
