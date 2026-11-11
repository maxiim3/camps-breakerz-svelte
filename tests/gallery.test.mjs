import {describe, it} from 'node:test'
import assert from 'node:assert/strict'
import {indexOfImage, nextIndex, prevIndex, swipeDirection} from '../src/lib/gallery.ts'

describe('gallery navigation', () => {
    const images = [
        {path: '/a.webp', alt: 'A'},
        {path: '/b.webp', alt: 'B'},
        {path: '/c.webp', alt: 'C'},
    ]

    it('finds the opened image in its group', () => {
        assert.equal(indexOfImage(images, images[1]), 1)
    })

    it('falls back to the first image when the item is not in the group', () => {
        assert.equal(indexOfImage(images, {path: '/missing.webp', alt: 'X'}), 0)
    })

    it('loops to the next and previous photo inside the group', () => {
        assert.equal(nextIndex(3, 0), 1)
        assert.equal(nextIndex(3, 2), 0)
        assert.equal(prevIndex(3, 0), 2)
        assert.equal(prevIndex(3, 1), 0)
    })

    it('stays at zero when the group is empty', () => {
        assert.equal(nextIndex(0, 0), 0)
        assert.equal(prevIndex(0, 0), 0)
    })

    it('detects a horizontal swipe and ignores a vertical one', () => {
        assert.equal(swipeDirection(100, 100, 40, 105), 'next')
        assert.equal(swipeDirection(100, 100, 160, 102), 'prev')
        assert.equal(swipeDirection(100, 100, 110, 180), null)
        assert.equal(swipeDirection(100, 100, 120, 100), null)
    })
})
