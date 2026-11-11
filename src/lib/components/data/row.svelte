<script lang="ts">
	let { sum = "Data", data = "{}", count = "" } = $props();
</script>

<details class="w-full px-2">
    <summary class="text-[70%] uppercase py-0.5 font-black cursor-pointer text-blue-500">{ sum } {count ? '(' + count + ')' : ""}</summary>
    <pre class="text-[50%] bg-gray-200 p-2 max-h-[50vh] w-full overflow-scroll">{ data }</pre>
</details>
