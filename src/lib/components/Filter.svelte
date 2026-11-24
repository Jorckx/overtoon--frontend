<script lang="ts" module>
  const buttonClass =
    ' leading-normal cursor-pointer lowercase focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:font-black';
</script>

<script lang="ts">
  type Props = {
    options: string[];
    selected?: string[];
    label: string;
    allLabel: string;
    single?: boolean;
  };

  let { options, selected = $bindable([]), label, allLabel, single = false }: Props = $props();

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
  <fieldset class="m-0 border-0 p-0 ">
    <legend class="sr-only">{label}</legend>
    <ul class="fw-full p-main flex justify-center flex-wrap gap-main border-b">
      <li>
        <button type="button" class={buttonClass} aria-pressed={selected.length === 0} onclick={handleReset}>
          {allLabel}
        </button>
      </li>
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
  </fieldset>
{/if}
