<script lang="ts">
    import TheButton from '$lib/ui/atoms/the-button.svelte'
    import {contactLinks} from '$lib/siteData'
    import HeaderTitle from '../atoms/header-title.svelte'
</script>

<section
    id="contact"
    class="relative bg-neutral-50/90 pt-48 pb-8 text-black backdrop-blur-sm"
>
    <div class="container mx-auto">
        <HeaderTitle
            marginBottom="SM"
            alignCenter={true}
            level={2}
            colorContext="light"
        >
            Contact Us
        </HeaderTitle>
        <div class="mb-8 flex items-center justify-center gap-2">
            <TheButton
                to={contactLinks.Email.url}
                style="soft"
            >
                <contactLinks.Email.component />
                Contact us
            </TheButton>
        </div>

        <HeaderTitle
            marginBottom="SM"
            alignCenter={true}
            level={2}
            colorContext="light"
        >
            Follow us
        </HeaderTitle>
        <div class="flex flex-wrap items-center justify-center gap-4">
            {#each Object.entries(contactLinks) as [linkName, link]}
                {#if linkName !== 'Email' && linkName !== 'Shop'}
                    <TheButton
                        vertical
                        modifier="square"
                        style="dash"
                        to={link.url}
                        classes="hover:border-none hover:scale-105"
                    >
                        <link.component></link.component>
                        {linkName}
                    </TheButton>
                {/if}
            {/each}
        </div>
    </div>
</section>
