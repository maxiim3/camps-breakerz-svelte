export type GalleryImage = {
    path: string
    alt: string
}

export function indexOfImage(images: GalleryImage[], item: GalleryImage): number {
    const index = images.findIndex((image) => image.path === item.path)
    return index < 0 ? 0 : index
}

export function nextIndex(length: number, current: number): number {
    if (length <= 0) return 0
    return (current + 1) % length
}

export function prevIndex(length: number, current: number): number {
    if (length <= 0) return 0
    return (current - 1 + length) % length
}

export function swipeDirection(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    threshold = 40,
): 'next' | 'prev' | null {
    const dx = endX - startX
    const dy = endY - startY
    if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return null
    return dx < 0 ? 'next' : 'prev'
}
