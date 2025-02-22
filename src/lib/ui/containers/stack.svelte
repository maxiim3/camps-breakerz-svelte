<script lang="ts">
    import type {Snippet} from 'svelte'

    type VOStackElement =
        | 'div'
        | 'section'
        | 'article'
        | 'aside'
        | 'footer'
        | 'header'
        | 'main'
        | 'nav'
    type VOStackDirection = 'horizontal' | 'vertical'
    type VOSpace = 'NONE' | 'SMALL' | 'MEDIUM' | 'LARGE'
    type VODisplosition = 'start' | 'center' | 'end' | 'stretch'
    type VOWrapping = Boolean

    interface Props {
        element?: VOStackElement
        direction?: VOStackDirection
        spaceBottom?: VOSpace
        gap?: VOSpace
        align?: VODisplosition
        justify?: VODisplosition
        children: Snippet
        wrap?: VOWrapping
    }

    const props: Props = $props()

    const computeFlexDirection = () => (props.direction === 'horizontal' ? 'flex-row' : 'flex-col')

    const computeFlexJustify = () => {
        switch (props.justify) {
            case 'start':
                return 'justify-start'
            case 'center':
                return 'justify-center'
            case 'end':
                return 'justify-end'
            case 'stretch':
                return 'justify-stretch'
            default:
                return 'justify-start'
        }
    }

    const computeFlexAlign = () => {
        switch (props.align) {
            case 'start':
                return 'items-start'
            case 'center':
                return 'items-center'
            case 'end':
                return 'items-end'
            case 'stretch':
                return 'items-stretch'
            default:
                return 'items-start'
        }
    }

    const computeFlexGap = () => {
        switch (props.gap) {
            case 'NONE':
                return 'gap-0'
            case 'SMALL':
                return 'gap-2'
            case 'MEDIUM':
                return 'gap-4'
            case 'LARGE':
                return 'gap-8'
            default:
                return 'gap-0'
        }
    }

    const computeBottomSpace = () => {
        switch (props.spaceBottom) {
            case 'NONE':
                return 'mb-0'
            case 'SMALL':
                return 'mb-2'
            case 'MEDIUM':
                return 'mb-4'
            case 'LARGE':
                return 'mb-8'
            default:
                return 'mb-0'
        }
    }
</script>

<svelte:element
    this={props?.element || 'div'}
    class={[
        'flex',
        computeFlexDirection(),
        computeFlexJustify(),
        computeFlexAlign(),
        computeFlexGap(),
        computeBottomSpace(),
    ]}
    class:flex-wrap={props.wrap}
>
    {@render props.children()}
</svelte:element>
