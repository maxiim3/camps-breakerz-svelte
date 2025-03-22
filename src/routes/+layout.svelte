<script lang="ts">
    import '../app.css'
    import AppFooter from '$lib/ui/organisms/app-footer.svelte'
    let {children} = $props()
</script>

{@render children()}

<AppFooter />
