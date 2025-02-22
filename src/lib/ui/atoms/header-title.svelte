<script lang="ts">
    import type {Snippet} from 'svelte'

    // Value Object color contexts

    type VOColorContext = 'light' | 'dark'
    type VOSizeContext = 'LG' | 'XL' | 'MD'
    type VOSro = boolean
    type VOLevel = 1 | 2 | 3
    type VOSpacing = 'NONE' | 'SM' | 'MD'
    type VOTextCenter = boolean
    type VOPrettify = boolean

    interface Props {
        colorContext?: VOColorContext
        size?: VOSizeContext
        /** Screen ready only */
        sro?: VOSro
        level: VOLevel
        /** default 0 */
        marginBottom?: VOSpacing
        prettify?: VOPrettify
        alignCenter?: VOTextCenter
        children: Snippet
    }

    const props: Props = $props()

    const computeSizeContext = () => {
        if (props.size) {
            switch (props.size) {
                case 'MD':
                    return 'text-base'
                case 'LG':
                    return 'text-lg'
                case 'XL':
                    return 'text-xl'
            }
        } else {
            switch (props.level) {
                case 1:
                    return 'text-3xl'
                case 2:
                    return 'text-xl'
                case 3:
                    return 'text-lg'
            }
        }
    }

    const computeColorContext = () => {
        if (props.colorContext) {
            switch (props.colorContext) {
                case 'light':
                    return 'text-black'
                case 'dark':
                    return 'text-white'
            }
        } else return 'text-white'
    }

    const computeMarginContext = () => {
        if (props.marginBottom && props.marginBottom === 'SM') return 'mb-4'
        if (props.marginBottom && props.marginBottom === 'MD') return 'mb-8'
        return 'mb-0'
    }

    const computeFontWeightContext = () => {
        if (props.level >= 3) return 'font-bold'
        return 'font-black'
    }
</script>

<svelte:element
    this={`h${props.level}`}
    class={[
        computeMarginContext(),
        computeColorContext(),
        computeSizeContext(),
        computeFontWeightContext(),
    ]}
    class:sr-only={props?.sro}
    class:text-pretty={props.prettify}
    class:text-center={props.alignCenter}
>
    {@render props.children()}
</svelte:element>
