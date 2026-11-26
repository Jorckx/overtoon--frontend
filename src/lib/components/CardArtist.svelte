<script lang="ts">
    import Image from '#lib/components/Image.svelte'
    import { localizeHref } from '#lib/paraglide/runtime.js';
   	// import { formatDate, DATE_FORMATS } from '#lib/utils/formatDate.js';
   	import { formatPeriod } from '#lib/utils/formatPeriod.js';

    // height: 'h-full' fills its parent (Swiper slide); pass e.g. 'h-[50vh]' outside a swiper
    let {item, height = 'h-full', masked = false, ratio = "inherit"} = $props()
</script>

<figure class="relative grid grid-rows-[2fr_1fr] overflow-clip {height} items-end">
        <div class="card-image h-full" style="--fill-w:100%; --fill-h:auto">
            <Image image={item.cover} {ratio} {masked} fit="cover" />
        </div>
        <header class="self-start text-left pt-0.75">
            <a href={localizeHref(item.id)} >
                <h3 class="text-md font-tz min-w-full text-balance leading-tight">{item.title}</h3>
            </a>

            <ul>
            {#each item.periods as period, i (i)}
                <li class="font-marfa font-bold text-base text-balance leading-tight text-black/35 flex gap-x-sm items-center">
                    <time>{formatPeriod(period)}</time>
                    {#if period.residencetype}<span class="label opacity-35">{period.residencetype}</span>{/if}
                </li>
            {/each}
            </ul>
        </header>
        <!-- Image: fills the row height, width follows the image ratio -->
</figure>
