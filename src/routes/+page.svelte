<script lang="ts">
	import StickyNavbar from '$lib/components/StickyNavbar.svelte';
	import AboutUs from '$lib/page-sections/about-us/AboutUs.svelte';
	import FoodBaskets from '$lib/page-sections/food-baskets/FoodBaskets.svelte';
	import LandingSection from '$lib/page-sections/landing-section/LandingSection.svelte';
</script>

<!-- TODO update bg video -->
<main id="#" class="min-h-screen bg-black text-white">
	<LandingSection />
	<!-- TODO add social medias and mobile responsivness -->
	<StickyNavbar />
	<!-- TODO add some pics each node event -->
	<AboutUs />
	<FoodBaskets />
	<!-- <ContactSection /> -->
	<!-- TODO add some pics to the merch -->
	<!-- <ShopSection /> -->
</main>

<!-- <TheFooter /> -->
