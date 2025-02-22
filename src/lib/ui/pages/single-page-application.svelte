<script lang="ts">
	import StickyNavbar from '$lib/ui/organisms/sticky-navbar.svelte';
	import TimeLine from '$lib/ui/sections/time-line.svelte';
	import ContactUs from '$lib/ui/sections/contact-us.svelte';
	import FoodBaskets from '$lib/ui/sections/food-baskets.svelte';
	import LandingSection from '$lib/ui/sections/landing-section.svelte';
	import ShopSection from '$lib/ui/sections/shop-section.svelte';
</script>

<!-- TODO update bg video -->

<main id="#" class="min-h-screen bg-black text-white">
	<LandingSection />
	<!-- TODO add social medias and mobile responsivness -->
	<StickyNavbar />
	<!-- TODO add some pics each node event -->
	<TimeLine />
	<FoodBaskets />
	<ContactUs />
	<!-- TODO add some pics to the merch -->
	<ShopSection />
</main>
