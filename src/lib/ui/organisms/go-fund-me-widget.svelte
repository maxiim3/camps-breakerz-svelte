<script lang="ts">
    import {onMount} from 'svelte'

    let isClient = $state(false)
    let widgeturl =
        'https://www.gofundme.com/f/basketsforgaza/widget/large?sharesheet=fundraiser+story&attribution_id=sl:46a0bd09-cc57-4d02-b629-9ad8c5225a43'
    let scriptElement: HTMLScriptElement | undefined = $state(undefined)
    let count = $state(0)

    const createScript = () => {
        const script = document.createElement('script') // Create a script element
        script.src = 'https://www.gofundme.com/static/js/embed.js' // Set the GoFundMe embed script URL
        script.defer = true // Defer script execution until after the page has loaded
        return script
    }

    onMount(() => {
        scriptElement = createScript()
        document.body.appendChild(scriptElement) // Add the script to the document body

        isClient = true

        return () => {
            if (scriptElement) return

            const injectedScript: HTMLScriptElement = scriptElement!
            const parentElement = injectedScript.parentNode
            if (parentElement) {
                parentElement.removeChild(scriptElement!)
            }
        }
    })
</script>

{#if isClient}
    <div
        class="gfm-embed"
        data-url={widgeturl}
    ></div>
{/if}
