<script lang="ts">
    import TheButton from '$lib/ui/atoms/the-button.svelte'
    import LogoBrand from '$lib/ui/atoms/logo-brand.svelte'
    import HeaderVideo from '$lib/ui/molecules/header-video.component.svelte'
    import {useVideoManager} from '$lib/use-video-manager.svelte.js'
    import HeaderTitle from '$lib/ui/atoms/header-title.svelte'
    import ToggleVideoButton from '../organisms/toggle-video-button.svelte'
</script>

<HeaderTitle
    level={1}
    sro={true}>Camps Breakerz</HeaderTitle
>

<HeaderVideo />

<!-- FIRST VIEW: HERO -->
<section
    class="relative grid h-[90dvh] grid-cols-[1fr] gap-x-0 gap-y-0 bg-black/50 sm:grid-rows-[repeat(2,1fr)]"
>
    <header
        class="flex w-auto flex-col items-center justify-center gap-3 justify-self-center lg:gap-4"
    >
        <LogoBrand classes="animation-logo w-1/2 pt-12 sm:w-36" />
        <p
            class="prose animation-title text-md text-center font-mono text-pretty text-neutral-50 italic sm:text-lg"
        >
            Art from the refugee camp to you
        </p>
    </header>

    <article class="animation-heroText hidden justify-self-center px-4 py-20 sm:block">
        <div class="container mx-auto text-center">
            <HeaderTitle
                level={2}
                sro={true}>Our Mission</HeaderTitle
            >
            <p class="mx-auto max-w-3xl text-xl text-neutral-50">
                Camps Breakerz takes us back to the origins of hip-hop, using dance as a powerful
                tool for expression and healing. With more than 20 years of experience in
                humanitarian programming, we're committed to bringing positive change through art.
            </p>
        </div>
    </article>

    <ToggleVideoButton forwardClasses="absolute sm:hidden bottom-0 right-4 block" />
</section>
