<script lang="ts">
	import { links } from '$lib/siteData';
	import { useScrollToTop } from '$lib/utils';
</script>

<nav
	class="border/20 fixed bottom-0 z-50 w-full place-self-start justify-self-center bg-black/50 text-white backdrop-blur-sm sm:sticky sm:top-0 sm:py-4"
>
	<ul classes="sm:gap-4 flex-row flex justify-evenly sm:justify-center">
		{#each links as link}
			{@const buttonClassList =
				"btn btn-ghost relative text-xs px-1 sm:px-4 inherit sm:text-sm opacity-90 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-cyan-400 after:content-[''] hover:opacity-100 hover:after:scale-x-100 aria-selected:font-bold aria-selected:after:scale-x-100"}
			{#if link?.url}
				<a rel="noreferrer noopener" target="_blank" href={link.url} class={buttonClassList}>
					{link.label}
				</a>
			{:else if link?.hash}
				<a class={buttonClassList} href={link.hash}>
					{link.label}
				</a>
			{:else}
				<button class={buttonClassList} onclick={useScrollToTop}>
					<div class="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m18 15-6-6-6 6" />
						</svg>
						<span class="hidden sm:inline">{link.label}</span>
					</div>
				</button>
			{/if}
		{/each}
	</ul>
</nav>
