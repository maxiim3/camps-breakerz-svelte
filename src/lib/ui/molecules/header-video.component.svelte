<script>
	import { useVideoManager } from '$lib/use-video-manager.svelte';
	const { videoManager } = useVideoManager();
</script>

<div class="animation-video fixed h-screen w-screen">
	<!-- TODO Update the video -->
	<iframe
		src={videoManager.videoSrc}
		title="Camp Breakrz Crew"
		class="pointer-events-none absolute inset-0 z-0 h-full w-full select-none"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</div>
