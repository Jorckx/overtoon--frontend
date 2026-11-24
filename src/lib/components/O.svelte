<script lang="ts">
import { localizeHref } from '#lib/paraglide/runtime.js';
import { resolve } from '$app/paths';

interface Props {
  /** true once the full wordmark is out of view: the o becomes the home link */
  active?: boolean;
  /** scale applied to the o when active */
  scale?: number;
}

let { active = false, scale = 1.3 }: Props = $props();
</script>

<a
  href={resolve(localizeHref('/'))}
  class="o fixed top-main"
  class:active
  style:--o-scale={scale}
  aria-label="Home"
  aria-hidden={active ? undefined : 'true'}
  tabindex={active ? undefined : -1}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.12 42.7" role="img" aria-hidden="true">
    <g fill="currentColor">
      <path
        d="M33.62,36.33c-12.14,0-18.78-4.55-18.78-10.54s7.51-8.61,16.77-8.61c12.02,0,18.65,4.55,18.65,10.54s-7.39,8.61-16.65,8.61M65.12,26.55c0-8.6-12.23-15.78-31.97-15.78S0,18.01,0,26.98C0,35.57,12.37,42.7,31.83,42.7s33.28-7.18,33.28-16.15"
      />
    </g>
  </svg>
</a>

<style>
  .o {
    /* same width the o had as part of the full-width logo svg (65.12 / 762.8) */
    width: calc(
      (100vw - var(--sidebar-w) - var(--spacing-main) * 3) * 0.08537
    );
    display: block;
    pointer-events: none; /* full wordmark link handles clicks until scrolled */
    transform-origin: left top;
    transition: transform 300ms;
  }
  .o.active {
    pointer-events: auto;
    transform: scale(var(--o-scale)) translateY(-0.8rem);
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  @media (prefers-reduced-motion: reduce) {
    .o {
      transition: none;
    }
  }
</style>
