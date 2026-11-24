<script lang="ts">
    // 1. internal
    let { content, theme = 'var(--color-cyan-400)' } = $props();
    import reveal from '#lib/utils/reveal.js';
</script>


<!-- MARKUP -->
<aside class="fixed pt-(--hh) w-(--sidebar-w) h-full items-end justify-between flex flex-col top-0 bottom-0 right-0" style:--thm={theme}>
    <!-- inner -->
    <div use:reveal={{delay: 300, duration: '100ms', opacityDuration: '300ms'}} class="js:reveal p-main w-full h-full flex flex-col justify-between">
        {@render content()}
    </div>
</aside>



<style>
    @reference "#lib/styles/app.css";
    aside :global(.sidebar-section){
        @apply border-t-3 grid grid-cols-1 grid-rows-[auto_auto] gap-y-sm;
    }
    aside :global(.sidebar-header){
        @apply flex items-center h-fit leading-tight;
    }
    aside :global(.sidebar-header > h3){
        @apply font-bold;
    }
    aside :global(.sidebar-content){
        @apply text-sm font-tz;
    }
    aside::after{
        content: '';
        --tw-duration: 1s;
        @apply fixed w-(--sidebar-w) right-0 top-0 bottom-0 z-[-1];
        @apply bg-linear-to-b from-(--thm) to-white;
    }

    aside,
    aside::after {
        transition: opacity 0.5s ease-out;
    }
    aside.hide,
    aside.hide::after {
        opacity: 0;
        z-index: -1;
        pointer-events: none;
    }
</style>
