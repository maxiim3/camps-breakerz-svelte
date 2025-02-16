<script lang="ts">
	import TheLogo from '$lib/components/TheLogo.svelte';
	import HeaderVideo from './HeaderVideo.svelte';
	import { useVideoManager } from './useVideoManager.svelte.ts';
	const { videoManager } = useVideoManager();
</script>

<HeaderVideo />

<!-- FIRST VIEW: HERO -->
<section
	class="relative grid h-[90dvh] grid-cols-[1fr] gap-x-0 gap-y-0 bg-black/50 sm:grid-rows-[repeat(2,1fr)]"
>
	<button
		class="btn btn-ghost absolute top-12 right-12 z-50 hover:bg-transparent hover:text-white/60 hover:outline-none"
		onclick={() => videoManager.toggleAutoplay()}
	>
		Auto Play {videoManager.autoplay ? 'on' : 'off'}
	</button>
	<header
		class="flex w-auto flex-col items-center justify-center gap-3 justify-self-center lg:gap-8"
	>
		<TheLogo classes="animation-logo w-3/4 pt-12 sm:w-48" />
		<p class="prose animation-title text-center font-mono text-pretty text-neutral-50 italic">
			Art from the refugee camp to you
		</p>
	</header>

	<article class="animation-heroText hidden justify-self-center px-4 py-20 sm:block">
		<div class="container mx-auto text-center">
			<h2 class="sr-only mb-6 text-3xl font-bold text-neutral-50">Our Mission</h2>
			<p class="mx-auto max-w-3xl text-xl text-neutral-50">
				Camps Breakerz takes us back to the origins of hip-hop, using dance as a powerful tool for
				expression and healing. With more than 20 years of experience in humanitarian programming,
				we're committed to bringing positive change through art.
			</p>
		</div>
	</article>
</section>
