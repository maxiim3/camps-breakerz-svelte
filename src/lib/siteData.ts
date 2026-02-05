import IconEmail from '$lib/ui/atoms/icon-email.svelte'
import IconInstagram from '$lib/ui/atoms/icon-instagram.svelte'
import IconFacebook from '$lib/ui/atoms/icon-facebook.svelte'
import IconShoppingBag from '$lib/ui/atoms/icon-shopping-bag.svelte'
import IconYoutube from '$lib/ui/atoms/icon-youtube.svelte'
import IconTiktok from '$lib/ui/atoms/icon-tiktok.svelte'
import type {Component} from 'svelte'

interface Link {
    name: string
    url: string
    component: Component
}

export const contactLinks: Record<string, Link> = {
    Email: {
        name: 'Email',
        url: 'mailto:campsbreakerz@gmail.com',
        component: IconEmail,
    },

    YouTube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/@campsbreakerz',
        component: IconYoutube,
    },

    Instagram: {
        name: 'Instagram',
        url: 'https://www.instagram.com/campsbreakerz/?hl=en',
        component: IconInstagram,
    },

    TikTok: {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@campsbreakerz',
        component: IconTiktok,
    },

    Facebook: {
        name: 'Facebook',
        url: 'https://www.facebook.com/CampsBreakerz/',
        component: IconFacebook,
    },

    Shop: {
        name: 'Shop',
        url: 'https://www.etsy.com/shop/campsbreakerzshop/?etsrc=sdt#reviews',
        component: IconShoppingBag,
    },
}

export const siteLinks: {
    label: string
    hash?: string
    url?: string
    id: string
    icon: App.IconType
}[] = [
    {
        label: 'About',
        hash: '#about-us',
        id: 'about-us',
        icon: 'information',
    },
    {
        label: 'Donate',
        hash: '#healing-programs',
        id: 'healing-programs',
        icon: 'donate',
    },
    {
        label: 'Contact',
        hash: '#contact',
        id: 'contact-page',
        icon: 'mail',
    },
    {
        label: 'Shop',
        url: 'https://www.etsy.com/shop/campsbreakerzshop/?etsrc=sdt#reviews',
        id: 'shop',
        icon: 'shopping-bag',
    },
    {
        label: 'Top',
        id: 'top-of-the-page',
        icon: 'arrow-top',
    },
]
