<script lang="ts">
    import Image from '#lib/components/Image.svelte'
   	import { formatPeriod } from '#lib/utils/formatPeriod.js';

    let {item} = $props()
</script>


<figure class="pt-main text-left border-b-3 grid grid-cols-[2fr_1fr] gap-x-lg max-h-[20vh] overflow-clip relative">
    <a href={item.id} class="flex flex-col gap-x-main justify-between items-start">
        <h3 class="text-md font-tz text-balance leading-tight">{item.title}</h3>
        <div class="flex flex-col py-sm">
            <time class="font-marfa font-bold text-base text-balance leading-tight text-black/35">
                {formatPeriod(item)}
            </time>
        </div>
    </a>
    <figure class="card-image h-full overflow-clip" style="--fill-w:auto; --fill-h:100%">
        <Image image={item.cover} fit="cover" ratio="6/5" />
    </figure>
</figure>
