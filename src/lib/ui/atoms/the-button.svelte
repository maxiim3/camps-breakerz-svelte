<script lang="ts">
    import type {Snippet} from 'svelte'

    type Props = {
        /** @name vertical @type boolean @description stacked vertically if true. Default horizontally */
        vertical?: boolean
        /** @name to @type string @description Url to redirecto to (optional) */
        to?: string
        action?: () => void
        children: Snippet
        style?: 'soft' | 'ghost' | 'link' | 'outline' | 'dash'
        modifier?: 'square' | 'wide' | 'circle' | 'block'
        icon?: Snippet
        classes?: string
        [key: string]: unknown
    }

    const {vertical, to, action, children, modifier, style, icon, otherProps, classes}: Props =
        $props()
</script>

<svelte:element
    this={to ? 'a' : 'button'}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
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
    {...otherProps as Object}
>
    {#if icon}
        {@render icon()}
    {/if}
    {@render children()}
</svelte:element>
