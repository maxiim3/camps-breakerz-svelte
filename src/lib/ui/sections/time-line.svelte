<script lang="ts">
    import {type Img, events} from '../../about-us.data'
    import EnhancedImage from '../atoms/enhanced-image.svelte'
    import HeaderTitle from '../atoms/header-title.svelte'

    let modal: HTMLDialogElement | null = $state(null)
    let showModal: boolean = $state(false)
    let selectedItem: Img | null = $state(null)
    let sortReverse: boolean = $state(false)

    function openImg(item: Img) {
        selectedItem = item
        showModal = true
        modal?.showModal()
    }

    function closeModal() {
        selectedItem = null
        showModal = false
        modal?.close()
    }

    function handleKeyDown(event: KeyboardEvent) {
        console.log(event.key)
        if (event.key === 'Escape') {
            closeModal()
        }
    }

    $effect(() => {
        if (showModal && selectedItem) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })
</script>

<section
    id="about-us"
    class="relative min-h-screen bg-black/90 pt-20 pb-8 backdrop-blur-sm"
>
    <header class="mb-12 flex flex-col items-center justify-center gap-12">
        <HeaderTitle
            level={2}
            alignCenter
        >
            History of Camp Breakers
        </HeaderTitle>
        <button
            class="btn-outlined btn mx-auto text-white"
            onclick={() => (sortReverse = !sortReverse)}
        >
            {sortReverse ? 'View latest first' : 'View oldest first'}
        </button>
    </header>

    <section class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact w-screen">
        {#each events.sort( (a, b) => (sortReverse ? a.date - b.date : b.date - a.date), ) as event, key}
            <div>
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
                                        class="absolute inset-0 cursor-pointer"
                                        onclick={() => openImg(img)}
                                        aria-label={event.description}
                                    ></button>
                                    <EnhancedImage
                                        src={img.path}
                                        alt={img.alt}
                                        width="90"
                                        height="90"
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
            </div>
        {/each}
    </section>
</section>
{#if showModal && selectedItem}
    <dialog
        open
        onclose={closeModal}
        class="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
        <div class="modal-box relative max-w-2xl bg-neutral-800/90 p-2">
            <EnhancedImage
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
        <form
            method="dialog"
            class="modal-backdrop"
        >
            <button>close</button>
        </form>
    </dialog>
{/if}
