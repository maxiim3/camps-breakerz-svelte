<script lang="ts">
	import { type Img, events } from './aboutUs.data';

	let modal: HTMLDialogElement | null = $state(null);
	let showModal: boolean = $state(false);
	let selectedItem: Img | null = $state(null);
	let sortReverse: boolean = $state(false);

	function openImg(item: Img) {
		selectedItem = item;
		showModal = true;
		modal?.showModal();
	}

	function closeModal() {
		selectedItem = null;
		showModal = false;
		modal?.close();
	}
</script>

<section id="about-us" class="relative min-h-screen bg-black/90 pt-20 pb-8 backdrop-blur-sm">
	<header class="mb-12 flex flex-col items-center justify-center gap-12">
		<h2 class="text-center text-xl font-black text-white">History of Camp Breakerz</h2>
		<button
			class="btn-outlined btn mx-auto text-white"
			onclick={() => (sortReverse = !sortReverse)}
		>
			{sortReverse ? 'View latest first' : 'View oldest first'}
		</button>
	</header>

	<ul class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
		{#each events.sort((a, b) => (sortReverse ? a.date - b.date : b.date - a.date)) as event, key}
			<li>
				<div class="timeline-middle">
					<div class="h-5 w-5 rounded-full bg-neutral-600"></div>
				</div>
				<div
					class="timeline-box max-w-xl text-white"
					class:timeline-start={key % 2 === 0}
					class:text-end={key % 2 === 0}
					class:timeline-end={key % 2 !== 0}
					class:text-start={key % 2 !== 0}
					class:bg-red-900-20={key % 3 === 2}
					class:bg-green-900-20={key % 3 === 1}
				>
					<time class="font-mono italic">{event.date}</time>
					<h3 class="text-lg font-black">{event.status}</h3>
					<p>{event.description}</p>
					{#if event?.images && event.images.length}
						<div
							class="flex flex-row-reverse flex-wrap gap-4 px-2 py-3"
							class:flex-row-reverse={key % 2 === 0}
						>
							{#each event.images as img}
								<img
									class="cursor-pointer"
									src={img.path}
									alt={img.alt}
									width="60"
									height="60"
									loading="lazy"
								/>
								<!-- Check for Svelte images optimisation -->
								<!-- quality="30" -->
								<!-- onclick={() => openImg(img)} -->
							{/each}
						</div>
					{/if}
				</div>
				<hr />
			</li>
		{/each}
	</ul>
</section>
{#if showModal && selectedItem}
	<dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
		<div class="modal-box relative max-w-2xl bg-neutral-800/80 p-2">
			<img
				src={selectedItem.path}
				alt={selectedItem.alt}
				class="aspect-square w-full overflow-hidden object-contain"
			/>
			<!-- quality="50" -->
			<h3 class="text-base font-bold text-pretty text-white">{selectedItem.alt}</h3>
			<p class="font-brandMono float-right text-xs text-white/70 italic">
				Press ESC key or click outside to close
			</p>
			<div class="modal-action">
				<button
					class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2 text-white"
					onclick={closeModal}
				>
					✕
				</button>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
