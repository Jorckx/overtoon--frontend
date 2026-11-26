<script lang="ts">
    import Image from '#lib/components/Image.svelte'
   	import { formatPeriod } from '#lib/utils/formatPeriod.js';
	import { resolve } from '$app/paths';

    let {item} = $props()
</script>


<figure class="flex gap-x-main">

        <!-- CARD -->
        <a href={item.id} class="group h-full w-full gap-x-main flex lg:flex-row flex-row justify-between border-t-2">
            <!-- cover -->
            <div class="card-image lg:w-2/8 w-2/6 shrink-0 grow-0 grayscale-100 duration-300 opacity-80 group-hover:opacity-100 group-hover:grayscale-0" style="--fill-w:100%; --fill-h:auto">
                <Image image={item.cover} ratio="6/5" fit="cover" />
            </div>
            <!-- title + dates -->
            <div class="lg:w-6/8 w-4/6 lg:py-main py-sm">
                <h3 class="text-md font-tz text-balance leading-none">{item.title}</h3>
                <div class="flex pt-sm items-start w-full flex-col">
                {#each item.periods as period, i (i)}
                    <time class="font-marfa font-bold text-base text-balance leading-snug text-black/35">
                        {formatPeriod(period)}
                    </time>
                {/each}
                </div>
            </div>
        </a>

        <!-- PROJECTS (hidden on mobile) -->
        <div class="w-[calc(var(--sidebar-w)-var(--spacing-main)*2)] shrink-0 lg:block hidden h-full pt-sm border-t-2">
            <ul>
                {#each item.activities as event, i (i)}
                <li class="font-tz leading-snug w-full not-first:border-t border-black/10">
                    <a href={resolve("/" + event.id)} class="flex justify-between gap-x-sm w-full items-center">
                        {event.title}
                        <span class="label">{event.eventtype}</span>
                    </a>
                </li>
                {/each}
            </ul>
        </div>


</figure>
