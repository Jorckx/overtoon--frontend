<script lang="ts">
    import Image from '#lib/components/Image.svelte'
   	import { formatPeriod } from '#lib/utils/formatPeriod.js';
   	import { formatDate, DATE_FORMATS } from '#lib/utils/formatDate.js';
	import { resolve } from '$app/paths';

    let {item} = $props()
</script>


<div class="flex gap-x-main">

    <!-- CARD -->
    <a href={item.id}>
        <article class="group h-full w-full gap-x-main flex lg:flex-row flex-row justify-between border-t-2">
            <!-- cover -->
            <figure class="card-image lg:w-2/8 w-2/6 shrink-0 grow-0 grayscale-100 duration-300 opacity-80 group-hover:opacity-100 group-hover:grayscale-0" style="--fill-w:100%; --fill-h:auto">
                <figcaption class="group-hover:opacity-100 opacity-0 duration-300 absolute top-sm border-b-2 left-sm bg-white font-bold px-main py-sm">{item.eventtype}</figcaption>
                <Image image={item.cover} ratio="6/5" fit="cover" />
            </figure>
            <!-- title + dates -->
            <header class="lg:w-6/8 w-4/6 lg:py-main py-sm grid grid-cols-[minmax(0,1fr)_auto] lg:pr-main">
                <div>
                    <h3 class="text-md font-tz text-balance leading-tight">{item.title}</h3>
                    <h2 class="text-md text-black/35 font-tz text-balance leading-tight mb-main">{item.subtitle}</h2>
                </div>
                <!-- Date -->
                <div class="flex justify-end">
                    {#if item.end}
                    <time class="font-marfa w-full text-right font-bold text-base text-balance leading-snug text-black">
                        {formatPeriod(item)}
                    </time>
                    {:else if item.start}
                    <time class="font-marfa w-full text-right font-bold text-base text-balance leading-snug text-black">
                        {formatDate(item.start, DATE_FORMATS.compact)}
                    </time>
                    {/if}
                </div>
            </header>
        </article>
    </a>

    <!-- PROJECTS (hidden on mobile) -->
    <div class="w-[calc(var(--sidebar-w)-var(--spacing-main)*2)] flex-col shrink-0 lg:flex hidden h-full pt-sm border-t-2">


        <!-- artists -->
        {#if item.artists.length}
        <ul>
            {#each item.artists as link, i (i)}
            <li class="font-tz leading-snug w-full not-first:border-t border-black/10">
                <a href={resolve("/" + link.id)} class="flex justify-between gap-x-sm w-full items-center">
                    {link.title}
                </a>
            </li>
            {/each}
        </ul>
        {/if}

        <!-- links -->
        {#if item.links.length}
        <ul>
            {#each item.links as link, i (i)}
            <li class="font-tz leading-snug w-full not-first:border-t border-black/10">
                <a href={resolve("/" + link.id)} class="flex justify-between gap-x-sm w-full items-center">
                    {link.label}
                </a>
            </li>
            {/each}
        </ul>
        {/if}
    </div>
</div>
