import {readFileSync} from 'node:fs'
import {describe, it} from 'node:test'
import assert from 'node:assert/strict'
import {contactPageHeadline, contactPageTitle} from '../src/lib/contact-copy.ts'

describe('contact and navigation copy', () => {
    const siteData = readFileSync(new URL('../src/lib/siteData.ts', import.meta.url), 'utf8')
    const contactSection = readFileSync(
        new URL('../src/lib/ui/sections/contact-us.svelte', import.meta.url),
        'utf8',
    )

    it('uses the partner title on the contact section and in the nav', () => {
        assert.equal(contactPageTitle, 'Contact / Partner with us')
        assert.match(siteData, /label:\s*contactPageTitle/)
        assert.match(contactSection, /contactPageTitle/)
    })

    it('uses the requested headline with only the grammar fix', () => {
        assert.equal(
            contactPageHeadline,
            'Partner with the team on the ground to make our community stronger through future programs.',
        )
        assert.doesNotMatch(contactPageHeadline, /partner and with/i)
        assert.match(contactSection, /contactPageHeadline/)
    })

    it('keeps the contact hash and does not change donate or shop destinations', () => {
        assert.match(siteData, /hash: '#contact'/)
        assert.match(siteData, /hash: '#healing-programs'/)
        assert.match(
            siteData,
            /url: 'https:\/\/www\.etsy\.com\/shop\/campsbreakerzshop\/\?etsrc=sdt#reviews'/,
        )
    })
})
