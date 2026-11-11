<script lang="ts">
let { content } = $props();
let visible = $state(false)
</script>
<div class="fixed bottom-main w-3/5 z-900 opacity-0 hover:opacity-90">
    <button onclick={() => visible = !visible} class="fixed right-main bottom-main font-black text-blue-500 cursor-pointer text-[70%]">DEBUG</button>
    <div class="hidden" class:visible>
        {@render content()}
    </div>
</div>
<style>
    .visible{
        display: block !important;
    }
</style>
