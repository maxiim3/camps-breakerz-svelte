<script lang="ts">
    import TheButton from '$lib/ui/atoms/the-button.svelte'
    import LogoBrand from '$lib/ui/atoms/logo-brand.svelte'
    import {contactLinks} from '$lib/siteData'
    import HeaderTitle from '../atoms/header-title.svelte'
</script>

<section
    id="shop"
    class="relative bg-neutral-50/90 pt-8 pb-48 backdrop-blur-sm"
>
    <div class="container mx-auto">
        <HeaderTitle
            marginBottom="SM"
            colorContext="light"
            alignCenter={true}
            level={2}
        >
            Shop
        </HeaderTitle>
        <div class="flex flex-col items-center justify-center gap-4 text-black">
            <p class="flex flex-col items-center justify-center gap-2 font-normal sm:flex-row">
                <span> Support Camps Breakerz Crew </span>
                <LogoBrand classes="inline w-8" />
                <span> by purshasing our merch </span>
            </p>
            <TheButton
                to={contactLinks.Shop.url}
                style="soft"
            >
                <contactLinks.Shop.component />
                Visit our shop
            </TheButton>
        </div>
    </div>
</section>
