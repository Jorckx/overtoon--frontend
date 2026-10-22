<script lang="ts">
  import { onMount } from 'svelte';

  let {
    color = '#000',
    range = [0.4, .8]
  }: { color?: string; range?: [number, number] } = $props();

  // Base sizes in vmin units, plus how each shape reacts to the cursor.
  //  invW / invH: reverse the direction for counter-motion
  //  stiff / damp: spring feel (lower damp = more wobble)
  const config = [
    { w: 4.3, h: 4.3, invW: false, invH: false, stiff: 0.04,  damp: 0.82 }, // dot
    { w: 22,  h: 10,  invW: false, invH: true,  stiff: 0.035, damp: 0.84 }, // wide ring
    { w: 9,   h: 33,  invW: true,  invH: false, stiff: 0.028, damp: 0.86 }, // mid ring
    { w: 9,   h: 60,  invW: false, invH: false, stiff: 0.02,  damp: 0.88 }  // tall ring
  ];

  // spring state lives outside Svelte reactivity (it changes every frame)
  const sim = config.map(() => ({ cw: 0, ch: 0, vw: 0, vh: 0, init: false }));

  // only the rendered sizes are reactive
  let sizes = $state(config.map(() => ({ w: 0, h: 0 })));
  let ready = $state(false);

  let nx = 0.5;
  let ny = 0.5;
  let running = false;
  let frame = 0;
  let reduceMotion = false;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  function tick() {
    const u = Math.min(innerWidth, innerHeight) / 100; // 1 vmin in px
    const maxH = innerHeight * 0.88;
    let moving = false;

    config.forEach((c, i) => {
      const s = sim[i];
      const tx = c.invW ? 1 - nx : nx;
      const ty = c.invH ? ny : 1 - ny; // cursor higher = taller
      const targetW = c.w * u * lerp(range[0], range[1], tx);
      const targetH = Math.min(c.h * u * lerp(range[0], range[1], ty), maxH);

      if (!s.init || reduceMotion) {
        s.cw = targetW;
        s.ch = targetH;
        s.vw = s.vh = 0;
        s.init = true;
      } else {
        s.vw = (s.vw + (targetW - s.cw) * c.stiff) * c.damp;
        s.vh = (s.vh + (targetH - s.ch) * c.stiff) * c.damp;
        s.cw += s.vw;
        s.ch += s.vh;
        if (
          Math.abs(s.vw) > 0.01 || Math.abs(s.vh) > 0.01 ||
          Math.abs(targetW - s.cw) > 0.1 || Math.abs(targetH - s.ch) > 0.1
        ) moving = true;
      }

      sizes[i].w = s.cw;
      sizes[i].h = s.ch;
    });

    ready = true;
    if (moving) frame = requestAnimationFrame(tick);
    else running = false;
  }

  function wake() {
    if (!running) {
      running = true;
      frame = requestAnimationFrame(tick);
    }
  }

  function onPointerMove(e: PointerEvent) {
    nx = e.clientX / innerWidth;
    ny = e.clientY / innerHeight;
    wake();
  }

  onMount(() => {
    reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    wake();
    return () => cancelAnimationFrame(frame);
  });
</script>

<!-- pointermove covers mouse, pen and touch -->
<svelte:window onpointermove={onPointerMove} onresize={wake} />

<div class="resonance" class:ready aria-hidden="true" style:--color={color}>
  {#each sizes as s, i (i)}
    <div
      class="shape"
      class:ring={i > 0}
      style:width="{s.w}px"
      style:height="{s.h}px"
    ></div>
  {/each}
</div>

<style>
    @reference "../../app.css";
    .resonance {
        @apply left-main z-300 fixed flex justify-end gap-[1.6vmin] items-end right-(--sidebar-w) pr-main bottom-main pointer-events-none opacity-80;
        transition: opacity 0.4s;
    }

  .resonance.ready {
    opacity: 80%;
  }

  .shape {
    flex: none;
    background: var(--color);
    border-radius: 50%;
  }

  /* ring: ellipse with a transparent elliptical hole, so the wall thickness
     changes naturally with the proportions */
  .ring {
    --mask: radial-gradient(ellipse 27.5% 30.5% at 50% 50%, transparent 98%, #000 100%);
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }
</style>
