<script>
    let {children} = $props()
</script>
<!-- this wraps all children inside (sidebar) grouped routes -->
<article class="w-full min-w-0 grid grid-cols-2 lg:grid-cols-(--interface-cols) h-full" >
    {@render children()}
</article>
