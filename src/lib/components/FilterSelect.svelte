<script lang="ts">
  type Props = {
    options: string[];
    selected?: string[];
    label: string;
    allLabel: string;
    hideAll?: boolean;
    single?: boolean;
  };

  let { options, selected = $bindable([]), label, allLabel, hideAll, single = false }: Props = $props();

  const selectClass = 'lowercase font-bold leading-normal px-lg cursor-pointer bg-transparent border-none focus-visible:outline-none ';
  const handleReset = () => {
    selected = [];
  };
</script>

{#if options.length > 1}
{#if !hideAll}
    <!-- reset -->
    <button type="button" class={[selectClass, "border-r-2"]} style:border-right="solid 2px" aria-pressed={selected.length === 0} onclick={handleReset}>
        {allLabel}
    </button>
    <!-- select -->
    <label class="flex justify-center py-sm">
        <span class="sr-only">{label}</span>
        {#if single}
            <select
            class={selectClass}
            value={selected[0] ?? ''}
            onchange={(e) => {
                const v = e.currentTarget.value;
                selected = v ? [v] : [];
            }}
            >
            <option value="" disabled selected>{label}</option>
            {#each options as option (option)}
                <option value={option}>{option}</option>
            {/each}
            </select>
        {:else}
            <select class={selectClass} multiple size={Math.min(options.length, 6)} bind:value={selected}>
            {#each options as option (option)}
                <option value={option}>{option}</option>
            {/each}
            </select>
        {/if}
    </label>
{/if}
{/if}
