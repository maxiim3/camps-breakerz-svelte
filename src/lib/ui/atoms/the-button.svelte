<script lang="ts">
    import type {Snippet} from 'svelte'
    import Iconify from '../molecules/iconify.svelte'

    type Props = {
        /** @name vertical @type boolean @description stacked vertically if true. Default horizontally */
        vertical?: boolean
        /** @name to @type string @description Url to redirecto to (optional) */
        to?: string
        children?: Snippet
        style?: 'soft' | 'ghost' | 'link' | 'outline' | 'dash'
        modifier?: 'square' | 'wide' | 'circle' | 'block'
        icon?: App.IconType
        classes?: string
        action?: () => void
        /** Is external link : opens in new tab */
        external?: boolean
        [key: string]: unknown
    }

    const {
        vertical,
        to,
        action,
        children,
        modifier,
        style,
        icon,
        otherProps,
        classes,
        external,
    }: Props = $props()
</script>

<svelte:element
    this={to ? 'a' : 'button'}
    href={to}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    onclick={action}
    class={[
        'btn flex',
        vertical ? 'flex-col' : 'flex-row',
        modifier === 'square' ? 'btn-square aspect-square h-24 w-24 p-4' : '',
        modifier === 'wide' ? 'btn-wide' : '',
        modifier === 'circle' ? 'btn-circle' : '',
        modifier === 'block' ? 'btn-block' : '',
        style === 'soft' ? 'btn-soft' : '',
        style === 'outline' ? 'btn-outline' : '',
        style === 'link' ? 'btn-link' : '',
        style === 'ghost' ? 'btn-ghost' : '',
        style === 'dash' ? 'btn-dash' : '',
        classes,
    ]}
    {...otherProps as any}
>
    {#if icon}
        <Iconify {icon} />
    {/if}
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
