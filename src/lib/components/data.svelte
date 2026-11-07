<script lang="ts">
	let { sum = "Data", data = "{}", count = "" } = $props();
</script>

<details class="border-t my-0.5 w-full">
    <summary class="cursor-pointer">{ sum } {count ? '(' + count + ')' : ""}</summary>
    <pre class="text-[50%] bg-sky-100 p-1">{ data }</pre>
</details>
