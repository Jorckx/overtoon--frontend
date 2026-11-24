<script lang="ts">
    import Image from '#lib/components/Image.svelte'
   	import { formatDate, DATE_FORMATS } from '#lib/utils/date.js';

    // height: 'h-full' fills its parent (Swiper slide); pass e.g. 'h-[50vh]' outside a swiper
    let {item, height = 'h-full', masked = false, ratio = "inherit"} = $props()
</script>

<figure class="relative grid grid-rows-[1fr_2fr] gap-y-main overflow-clip {height} items-end">
        <!-- Image: fills the row height, width follows the image ratio -->
        <header class="pt-main px-main text-center">
            <a href={item.id} >
                <h3 class="text-md font-tz min-w-full text-balance leading-tight">{item.title}</h3>
            </a>
            <!-- <ul class="flex flex-col">
                {#each item.periods as period, i (i)}
                    <li class="font-tz text-sm not-last:border-b text-balance leading-tight text-black/35">
                        {formatDate(period.start, DATE_FORMATS.compact)}—{period.end ? formatDate(period.end, DATE_FORMATS.compact) : '…'}
                    </li>
                {/each}
            </ul> -->
        </header>
        <div class="card-image h-full" style="--fill-w:100%; --fill-h:100%">
            <Image image={item.cover} {ratio} {masked} fit="cover" />
        </div>
</figure>
