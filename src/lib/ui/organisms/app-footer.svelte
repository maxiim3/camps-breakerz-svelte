<script lang="ts">
    import {contactLinks} from '$lib/siteData'
</script>

<footer class="relative bg-stone-900 py-12 text-white">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
                <h3 class="mb-4 text-xl font-bold">Camps Breakerz</h3>
                <p class="text-stone-300">Breaking barriers through dance since 2004</p>
            </div>

            <div>
                <h3 class="mb-4 text-xl font-bold">Follow Us</h3>
                <div class="space-y-2">
                    {#each Object.entries(contactLinks) as [linkName, link]}
                        {#if linkName !== 'Email' && linkName !== 'Shop'}
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener"
                                class="block hover:text-lime-300">{link.name}</a
                            >
                        {/if}
                    {/each}
                </div>
            </div>

            <div>
                <h3 class="mb-4 text-xl font-bold">Contact</h3>
                <a
                    href="mailto:campsbreakerz@gmail.com"
                    class="block hover:text-lime-300">campsbreakerz@gmail.com</a
                >
                <a
                    href="https://campsbreakerzshop.etsy.com"
                    target="_blank"
                    rel="noopener"
                    class="mt-2 block hover:text-lime-300">CB Crew Store</a
                >
            </div>
        </div>

        <div class="mt-8 border-t border-stone-700 pt-8 text-center text-stone-300">
            <p>&copy; {new Date().getFullYear()} Camps Breakerz. All rights reserved.</p>
        </div>
    </div>
</footer>
