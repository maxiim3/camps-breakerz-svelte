<script lang="ts">
    import {type Img, events} from '../../about-us.data'
    import {indexOfImage, nextIndex, prevIndex, swipeDirection} from '$lib/gallery'
    import EnhancedImage from '../atoms/enhanced-image.svelte'
    import HeaderTitle from '../atoms/header-title.svelte'

    let modal: HTMLDialogElement | null = $state(null)
    let closeButton: HTMLButtonElement | null = $state(null)
    let showModal: boolean = $state(false)
    let gallery: Img[] = $state([])
    let currentIndex: number = $state(0)
    let sortReverse: boolean = $state(false)
    let lastTrigger: HTMLElement | null = $state(null)
    let swipeStart: {x: number; y: number} | null = null

    const selectedItem = $derived(gallery[currentIndex] ?? null)
    const hasSeveralPhotos = $derived(gallery.length > 1)
    const photoPosition = $derived(gallery.length ? `${currentIndex + 1} of ${gallery.length}` : '')

    function openImg(item: Img, images: Img[], trigger: EventTarget | null) {
        gallery = images
        currentIndex = indexOfImage(images, item)
        lastTrigger = trigger instanceof HTMLElement ? trigger : null
        showModal = true
    }

    $effect(() => {
        if (showModal && closeButton) {
            closeButton.focus()
        }
    })

    function closeModal() {
        showModal = false
        gallery = []
        currentIndex = 0
        const trigger = lastTrigger
        lastTrigger = null
        queueMicrotask(() => trigger?.focus())
    }

    function showNext() {
        if (!hasSeveralPhotos) return
        currentIndex = nextIndex(gallery.length, currentIndex)
    }

    function showPrev() {
        if (!hasSeveralPhotos) return
        currentIndex = prevIndex(gallery.length, currentIndex)
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (!showModal) return
        if (event.key === 'Escape') {
            closeModal()
            return
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault()
            showNext()
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            showPrev()
        }
    }

    function handlePointerDown(event: PointerEvent) {
        if ((event.target as HTMLElement | null)?.closest('button')) return
        swipeStart = {x: event.clientX, y: event.clientY}
    }

    function handlePointerUp(event: PointerEvent) {
        if (!swipeStart) return
        const direction = swipeDirection(swipeStart.x, swipeStart.y, event.clientX, event.clientY)
        swipeStart = null
        if (direction === 'next') showNext()
        if (direction === 'prev') showPrev()
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<section
    id="about-us"
    class="relative min-h-screen bg-black/90 pt-20 pb-8 backdrop-blur-sm"
>
    <header class="mb-12 flex flex-col items-center justify-center gap-12">
        <HeaderTitle
            level={2}
            alignCenter
        >
            History of Camps Breakerz
        </HeaderTitle>
        <button
            class="btn-outlined btn mx-auto text-white"
            onclick={() => (sortReverse = !sortReverse)}
        >
            {sortReverse ? 'View latest first' : 'View oldest first'}
        </button>
    </header>

    <ul class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact w-screen">
        {#each events.sort( (a, b) => (sortReverse ? a.dateStart - b.dateStart : b.dateStart - a.dateStart), ) as event, key}
            <li>
                <div class="timeline-middle">
                    <div class="h-5 w-5 rounded-full bg-neutral-600"></div>
                </div>
                <div
                    class="timeline-box max-w-xl bg-neutral-900/40 text-white backdrop-blur-lg"
                    class:timeline-start={key % 2 === 0}
                    class:timeline-end={key % 2 !== 0}
                    class:text-start={key % 2 !== 0}
                    class:text-end={key % 2 === 0}
                >
                    <time>{`${event.dateStart}${event?.dateEnd ? ` - ${event.dateEnd}` : ''}`}</time
                    >
                    <HeaderTitle
                        level={3}
                        marginBottom="SM">{event.status}</HeaderTitle
                    >
                    <p>{event.description}</p>
                    {#if event?.images && event.images.length}
                        <div
                            class="flex flex-row-reverse flex-wrap gap-4 px-2 py-3"
                            class:flex-row-reverse={key % 2 === 0}
                        >
                            {#each event.images as img}
                                <div class="relative">
                                    <button
                                        type="button"
                                        class="absolute inset-0 cursor-pointer"
                                        onclick={(clickEvent) =>
                                            openImg(
                                                img,
                                                event.images ?? [],
                                                clickEvent.currentTarget,
                                            )}
                                        aria-label="Open photo: {img.alt}"
                                    ></button>
                                    <EnhancedImage
                                        src={img.path}
                                        alt={img.alt}
                                        width="60"
                                        height="60"
                                        loading="lazy"
                                    />
                                </div>
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
    <dialog
        bind:this={modal}
        open
        onclose={closeModal}
        aria-label="Photo viewer"
        class="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
        <div
            class="modal-box relative max-w-2xl bg-neutral-800/90 p-2"
            onpointerdown={handlePointerDown}
            onpointerup={handlePointerUp}
        >
            {#if hasSeveralPhotos}
                <button
                    type="button"
                    class="btn btn-circle btn-ghost absolute top-1/2 left-2 z-10 -translate-y-1/2 text-white"
                    onclick={showPrev}
                    aria-label="Previous photo"
                >
                    ←
                </button>
                <button
                    type="button"
                    class="btn btn-circle btn-ghost absolute top-1/2 right-2 z-10 -translate-y-1/2 text-white"
                    onclick={showNext}
                    aria-label="Next photo"
                >
                    →
                </button>
            {/if}
            <EnhancedImage
                src={selectedItem.path}
                alt={selectedItem.alt}
                class="aspect-square w-full overflow-hidden object-contain"
            />
            <!-- quality="50" -->
            <h3 class="text-base font-bold text-pretty text-white">{selectedItem.alt}</h3>
            <p
                class="font-brandMono text-xs text-white/70 italic"
                aria-live="polite"
            >
                {#if hasSeveralPhotos}
                    {photoPosition}. Swipe, use the arrows, or press the left and right keys to see
                    the next photo. Press Escape or click outside to close
                {:else}
                    Press Escape or click outside to close
                {/if}
            </p>
            <div class="modal-action">
                <button
                    bind:this={closeButton}
                    type="button"
                    class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2 text-white"
                    onclick={closeModal}
                    aria-label="Close photo viewer"
                >
                    ✕
                </button>
            </div>
        </div>
        <form
            method="dialog"
            class="modal-backdrop"
        >
            <button>close</button>
        </form>
    </dialog>
{/if}
