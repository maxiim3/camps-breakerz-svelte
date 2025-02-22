<script lang="ts">
    import TheButton from '$lib/ui/atoms/the-button.svelte'
    import {useVideoManager} from '$lib/use-video-manager.svelte.js'
    const {videoManager} = useVideoManager()

    const iconType = $derived(videoManager?.videoPlaying ? 'play' : 'pause')

    const {forwardClasses}: {forwardClasses: string} = $props()
</script>

<TheButton
    class="w-12"
    action={async () => await videoManager.togglePlay()}
    modifier="block"
    style="ghost"
    icon={iconType}
    classes={`w-12 ${forwardClasses}`}
></TheButton>
