<script lang="ts">
let { data } = $props();
import Image from "#lib/components/Image.svelte"
// import cover from "#lib/assets/cover2.jpg"

</script>
<div>
    <figure class="h-full">
        <Image image={ data.pageData.highlights[0].cover} />
        <figcaption class="bg-white px-2 z-100 absolute bottom-5 left-5">
            { data.pageData.highlights[0].title}, { data.pageData.highlights[0].artists}, { data.pageData.highlights[0].startdate}
        </figcaption>
    </figure>
</div>
