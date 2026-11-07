<script lang="ts">
    import { page } from '$app/state';
</script>
{#if page.data.pageData.blocks}
{#each page.data.pageData.blocks as block, i (i)}
    {@html block.content?.text}
{/each}
{/if}
