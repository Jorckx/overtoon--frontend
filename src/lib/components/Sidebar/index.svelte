<script lang="ts">
    // 1. internal
    let { content } = $props();
    import reveal from '#lib/utils/reveal.js';
</script>


<!-- MARKUP -->
<aside class="sidebar fixed z-100 pt-(--hh) lg:w-(--sidebar-w) h-full items-end justify-between flex flex-col inset-0 lg:left-auto">
    <!-- inner -->
    <div use:reveal={{delay: 300, duration: '100ms', opacityDuration: '300ms'}} class="js:reveal p-main w-full h-full flex flex-col justify-between">
        {@render content()}
    </div>
</aside>



<style>
    @reference "#lib/styles/app.css";
    .sidebar :global(.sidebar-section){
        @apply grid grid-cols-1 grid-rows-[auto_auto] gap-y-0.5;
    }
    .sidebar :global(.sidebar-header){
        @apply border-b-2 flex items-center h-fit leading-tight lowercase mb-0.75;
    }
    .sidebar :global(.sidebar-header > h3){
        @apply font-bold;
    }
    .sidebar :global(.sidebar-content){
        @apply text-sm font-tz;
    }
    .sidebar::after{
        content: '';
        --tw-duration: 1s;
        @apply
            block fixed lg:w-(--sidebar-w)
            z-[-1]
            inset-0 lg:left-auto
            bg-linear-to-b from-(--thm) to-white;
    }

    .sidebar,
    .sidebar::after {
        transition: opacity 0.5s ease-out;
    }


    /* SHARED (activity/artists) */

    .sidebar :global(.tabs){
        @apply flex justify-between gap-4 text-sm lg:border-t-6 border-t-4 border-black pt-1;
    }
    .sidebar :global(.tab-back){
        @apply flex justify-end text-base font-bold items-center gap-x-sm leading-tight mb-main;
    }
    .sidebar :global(.tab-button){
        @apply cursor-pointer text-base font-bold;
    }
    .sidebar :global(.tab-title){
        @apply font-tz text-lg lg:text-md leading-tight sticky top-0;
    }
    .sidebar :global(.tab-subtitle){
        @apply font-tz text-base text-black/35 leading-tight mt-1;
    }
    .sidebar :global(.tab-text p){
        @apply mb-[1em];
    }
    .sidebar :global(.tab-text){
         @apply relative font-marfa text-base lg:text-sm h-full overflow-y-scroll pb-8;
         /* fade the last 4rem to transparent */
             -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);
                     mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);

    }
</style>
