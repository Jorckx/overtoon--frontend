<script lang="ts">
    // import Image from '#lib/components/Image.svelte'
   	import { formatPeriod } from '#lib/utils/formatPeriod.js';

    let {item} = $props()
</script>


<figure class="pt-main text-left border-b-3 ">
    <a href={item.id} class="flex flex-row gap-x-main justify-between items-end">
        <h3 class="text-md font-tz text-balance leading-tight">{item.title}</h3>
        <div class="flex flex-col py-sm">
            {#each item.periods as period, i (i)}
                <time class="font-marfa font-bold text-base text-balance leading-tight text-black/35">
                    {formatPeriod(period)}
                </time>
            {/each}
        </div>
    </a>
</figure>
<!-- <div class="card-image h-full" style="--fill-w:100%; --fill-h:100%">
    <Image image={item.cover} {ratio} {masked} fit="cover" />
</div> -->
