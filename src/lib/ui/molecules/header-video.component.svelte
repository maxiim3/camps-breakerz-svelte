<script lang="ts">
    import {useVideoManager} from '$lib/use-video-manager.svelte'
    import {onMount} from 'svelte'
    const {videoManager} = useVideoManager()
    const initVideoPlay = async () => {
        videoManager.toggleAutoplay()
        await videoManager.startVideo()
    }

    onMount(() => {
        const pauseId = setTimeout(initVideoPlay, 1000)

        return () => {
            clearTimeout(pauseId)
        }
    })
</script>

<!-- <svelte:document
    onmousemove={initVideoPlay}
    ontouchstart={initVideoPlay}
    onclick={initVideoPlay}
    onscroll={initVideoPlay}
/> -->

<div class="animation-video fixed h-screen w-screen">
    <!-- TODO Update the video -->
    <!-- <iframe
        src={videoManager.videoSrc}
        title="Camp Breakrz Crew"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full select-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe> -->
    <video
        bind:this={videoManager.video}
        controls={false}
        disablepictureinpicture={true}
        disableremoteplayback={true}
        autoplay={videoManager.autoplay}
        playsinline={videoManager.autoplay}
        preload="auto"
        poster={videoManager.imagePlaceholder}
        loop
        muted
        class="pointer-events-none absolute inset-0 z-0 h-screen w-screen border object-cover select-none"
    >
        <track kind="captions" />
        <source
            src={`${videoManager.videoSourcePath}.webm`}
            type="video/webm"
        />
        <source
            src={`${videoManager.videoSourcePath}.mp4`}
            type="video/mp4"
        />
    </video>
</div>
