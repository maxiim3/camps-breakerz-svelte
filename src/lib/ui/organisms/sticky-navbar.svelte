<script lang="ts">
    import {siteLinks} from '$lib/siteData'
    import {useScrollToTop} from '$lib/utils'
    import TheButton from '../atoms/the-button.svelte'
    import ToggleVideoButton from './toggle-video-button.svelte'

    export function handlerClick() {
        console.log('handle')
    }
</script>

<nav
    class="border/20 fixed bottom-0 z-50 w-full place-self-start justify-self-center bg-black/50 py-3 text-white backdrop-blur-sm sm:sticky sm:top-0 sm:py-4"
>
    <ul class="flex flex-row justify-evenly sm:justify-center sm:gap-4">
        {#each siteLinks as link}
            <TheButton
                to={link.url || link.hash}
                style="ghost"
                external={!!link?.url}
                icon={link.icon}
                action={() => (!link.url && !link.hash ? useScrollToTop() : undefined)}
            >
                <span class="hidden md:inline">{link.label}</span>
            </TheButton>
        {/each}
    </ul>

    <ToggleVideoButton forwardClasses="absolute hidden sm:top-4 sm:right-8 sm:block" />
</nav>
