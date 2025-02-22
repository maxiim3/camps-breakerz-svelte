import IconEmail from '$lib/ui/atoms/icon-email.svelte';
import IconInstagram from '$lib/ui/atoms/icon-instagram.svelte';
import IconFacebook from '$lib/ui/atoms/icon-facebook.svelte';
import IconLink from '$lib/ui/atoms/icon-link.svelte';
import IconShoppingBag from '$lib/ui/atoms/icon-shopping-bag.svelte';
import IconYoutube from '$lib/ui/atoms/icon-youtube.svelte';
import type { ComponentType } from 'svelte';

interface Link {
	name: string;
	url: string;
	component: ComponentType;
}

export const contactLinks: Record<string, Link> = {
	Email: {
		name: 'Email',
		url: 'mailto:campsbreakerz@gmail.com',
		component: IconEmail
	},

	YouTube: {
		name: 'YouTube',
		url: 'https://www.youtube.com/@gazabboy',
		component: IconYoutube
	},

	Instagram: {
		name: 'Instagram',
		url: 'https://www.instagram.com/campsbreakerz/?hl=en',
		component: IconInstagram
	},

	Facebook: {
		name: 'Facebook',
		url: 'https://www.facebook.com/CampsBreakerz/',
		component: IconFacebook
	},

	Linktree: {
		name: 'Linktree',
		url: 'https://linktr.ee/cbcrewgf',
		component: IconLink
	},

	Shop: {
		name: 'Shop',
		url: 'https://www.etsy.com/shop/campsbreakerzshop/?etsrc=sdt#reviews',
		component: IconShoppingBag
	}
};

export const siteLinks = [
	{
		label: 'About us',
		hash: '#about-us',
		id: 'about-us'
	},
	{
		label: 'Food Baskets',
		hash: '#food-basket',
		id: 'food-basket'
	},
	{
		label: 'Contact',
		hash: '#contact',
		id: 'contact-page'
	},
	{
		label: 'Shop',
		url: 'https://www.etsy.com/shop/campsbreakerzshop/?etsrc=sdt#reviews',
		id: 'shop'
	},
	{
		label: 'Top',
		id: 'top-of-the-page'
	}
];
