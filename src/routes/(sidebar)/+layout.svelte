<script>
    import { page } from '$app/state';
    let {children} = $props()
</script>

<!-- this wraps all children inside (sidebar) grouped routes -->
<article class="w-full min-w-0 grid grid-cols-1 grid-rows-[auto_auto] lg:grid-cols-(--interface-cols) h-full">
    {@render children()}
</article>
