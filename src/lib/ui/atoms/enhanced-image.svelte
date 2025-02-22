<script lang="ts">
    const {
        src,
        alt,
        ...rest
    }: {
        src: string
        alt: string
        [key: string]: unknown
    } = $props()

    // const imageModule = import.meta.glob(src, {
    //     eager: true,
    //     query: {
    //         enhanced: true,
    //     },
    // })

    // const srcImage = Object.values(imageModule)[1]
    // console.log(imageModule, srcImage)
</script>

<img
    {src}
    {alt}
    {...rest}
/>

<!-- <enhanced:img
    {src}
    {alt}
    {...props}
/> -->
