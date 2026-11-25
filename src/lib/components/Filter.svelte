<script lang="ts" module>
  const buttonClass =
    ' leading-normal cursor-pointer lowercase focus-visible:outline-2 focus-visible:outline-offset-2 font-bold aria-pressed:text-black/35';
</script>

<script lang="ts">
  type Props = {
    options: string[];
    selected?: string[];
    label: string;
    allLabel: string;
    hideAll?: boolean,
    single?: boolean;
  };

  let { options, selected = $bindable([]), label, allLabel, hideAll, single = false }: Props = $props();

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      selected = selected.filter((item) => item !== option);
    } else {
      selected = single ? [option] : [...selected, option];
    }
  };

  const handleReset = () => {
    selected = [];
  };
</script>

{#if options.length > 1}
<legend class="sr-only">{label}</legend>
<ul class="flex justify-center flex-wrap gap-main ">
    {#if !hideAll}
    <li>
    <button type="button" class={buttonClass} aria-pressed={selected.length === 0} onclick={handleReset}>
        {allLabel}
    </button>
    </li>
    {/if}
    {#each options as option (option)}
    <li>
        <button
        type="button"
        class={buttonClass}
        aria-pressed={selected.includes(option)}
        onclick={() => handleToggle(option)}
        >
        {option}
        </button>
    </li>
    {/each}
</ul>
{/if}
