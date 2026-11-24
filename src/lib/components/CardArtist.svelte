<script lang="ts">
    import Image from '#lib/components/Image.svelte'
   	import { formatDate, DATE_FORMATS } from '#lib/utils/date.js';

    // height: 'h-full' fills its parent (Swiper slide); pass e.g. 'h-[50vh]' outside a swiper
    let {item, height = 'h-full', masked = false, ratio = "inherit"} = $props()
</script>

<figure class="relative grid grid-rows-[minmax(0,auto)_1fr] overflow-clip {height} border-l">
    <a href={item.id} class="contents">
        <!-- Image: fills the row height, width follows the image ratio -->
        <div class="card-image" style="--fill-w:auto; --fill-h:100%">
            <Image image={item.cover} {ratio} {masked} />
        </div>
        <header class="p-sm pb-lg border-t border-b">
            <h3 class="font-tz min-w-full text-left text-balance leading-tight">{item.title}</h3>
            <ul>
                {#each item.periods as period, i (i)}
                    <li class="font-tz min-w-full text-left text-balance leading-tight text-black/35">
                        {formatDate(period.start, DATE_FORMATS.compact)}—{period.end ? formatDate(period.end, DATE_FORMATS.compact) : '…'}
                    </li>
                {/each}
            </ul>
        </header>
    </a>
</figure>
