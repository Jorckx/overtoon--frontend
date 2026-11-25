<script lang="ts">
    // 1. internal
    let { content } = $props();
    import reveal from '#lib/utils/reveal.js';
</script>


<!-- MARKUP -->
<aside class="fixed z-100 pt-(--hh) lg:w-(--sidebar-w) h-full items-end justify-between flex flex-col inset-0 lg:left-auto">
    <!-- inner -->
    <div use:reveal={{delay: 300, duration: '100ms', opacityDuration: '300ms'}} class="js:reveal p-main w-full h-full flex flex-col justify-between">
        {@render content()}
    </div>
</aside>



<style>
    @reference "#lib/styles/app.css";
    aside :global(.sidebar-section){
        @apply grid grid-cols-1 grid-rows-[auto_auto] gap-y-0.5;
    }
    aside :global(.sidebar-header){
        @apply border-b-2 flex items-center h-fit leading-tight lowercase mb-0.75;
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
        @apply
            block fixed lg:w-(--sidebar-w)
            z-[-1]
            inset-0 lg:left-auto
            bg-linear-to-b from-(--thm) to-white;
    }

    aside,
    aside::after {
        transition: opacity 0.5s ease-out;
    }
</style>
