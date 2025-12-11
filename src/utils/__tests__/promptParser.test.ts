// Purpose: Tests for the prompt parser module
import { describe, it, expect } from 'vitest'
import { parsePrompt } from '../promptParser'

describe('parsePrompt', () => {
    describe('Site Name Extraction', () => {
        it('extracts site name from quoted text', () => {
            const result = parsePrompt("Create a website for 'My Awesome Company'")
            expect(result.siteName).toBe('My Awesome Company')
        })

        it('extracts site name from double quotes', () => {
            const result = parsePrompt('Build a landing page for "TechStartup Labs"')
            expect(result.siteName).toBe('TechStartup Labs')
        })

        it('extracts site name from "for X" pattern', () => {
            const result = parsePrompt('Create a website for CloudSync Pro — a SaaS product')
            expect(result.siteName).toBe('CloudSync Pro')
        })

        it('uses default name when none found', () => {
            const result = parsePrompt('Create a simple landing page')
            expect(result.siteName).toBe('My Website')
        })
    })

    describe('Color Extraction', () => {
        it('extracts hex color from prompt', () => {
            const result = parsePrompt('Create a website with color #FF5733')
            expect(result.primaryColor).toBe('#FF5733')
        })

        it('extracts 6-digit hex colors', () => {
            const result = parsePrompt('Use #0B74DE as primary color')
            expect(result.primaryColor).toBe('#0B74DE')
        })

        it('uses default blue when no color specified', () => {
            const result = parsePrompt('Create a simple website')
            expect(result.primaryColor).toBe('#0B74DE')
        })
    })

    describe('Section Extraction', () => {
        it('always includes nav and footer', () => {
            const result = parsePrompt('Create a website')
            expect(result.sections).toContain('nav')
            expect(result.sections).toContain('footer')
        })

        it('extracts hero section', () => {
            const result = parsePrompt('Create a landing page with hero banner')
            expect(result.sections).toContain('hero')
        })

        it('extracts features section', () => {
            const result = parsePrompt('Include a features section')
            expect(result.sections).toContain('features')
        })

        it('extracts pricing section', () => {
            const result = parsePrompt('Add pricing plans')
            expect(result.sections).toContain('pricing')
        })

        it('extracts contact section', () => {
            const result = parsePrompt('Include a contact form')
            expect(result.sections).toContain('contact')
        })

        it('extracts multiple sections', () => {
            const result = parsePrompt('Include hero, features, pricing, and contact form')
            expect(result.sections).toContain('hero')
            expect(result.sections).toContain('features')
            expect(result.sections).toContain('pricing')
            expect(result.sections).toContain('contact')
        })
    })

    describe('Tone Extraction', () => {
        it('extracts professional tone', () => {
            const result = parsePrompt('Create a professional business website')
            expect(result.tone).toBe('professional')
        })

        it('extracts casual tone', () => {
            const result = parsePrompt('Make it casual and relaxed')
            expect(result.tone).toBe('casual')
        })

        it('extracts playful tone', () => {
            const result = parsePrompt('Design something playful and fun')
            expect(result.tone).toBe('playful')
        })

        it('extracts confident tone', () => {
            const result = parsePrompt('Tone should be confident and bold')
            expect(result.tone).toBe('confident')
        })

        it('defaults to professional when no tone specified', () => {
            const result = parsePrompt('Create a website')
            expect(result.tone).toBe('professional')
        })
    })

    describe('Theme Extraction', () => {
        it('extracts light theme', () => {
            const result = parsePrompt('Use a light, bright theme')
            expect(result.theme).toBe('light')
        })

        it('extracts dark theme', () => {
            const result = parsePrompt('Use a dark theme')
            expect(result.theme).toBe('dark')
        })

        it('extracts amazon theme', () => {
            const result = parsePrompt('Amazon-like theme for e-commerce')
            expect(result.theme).toBe('amazon')
        })

        it('extracts corporate theme', () => {
            const result = parsePrompt('Corporate enterprise theme')
            expect(result.theme).toBe('corporate')
        })

        it('defaults to light when no theme specified', () => {
            const result = parsePrompt('Create a website')
            expect(result.theme).toBe('light')
        })
    })

    describe('Feature Count Extraction', () => {
        it('extracts feature count from "X features"', () => {
            const result = parsePrompt('Include 4 features')
            expect(result.features).toHaveLength(4)
        })

        it('extracts feature count from "features (X)"', () => {
            const result = parsePrompt('Add features (3) to the page')
            expect(result.features).toHaveLength(3)
        })

        it('limits feature count to 8', () => {
            const result = parsePrompt('Include 20 features')
            expect(result.features?.length).toBeLessThanOrEqual(8)
        })

        it('defaults to 3 features when count not specified', () => {
            const result = parsePrompt('Include features section')
            expect(result.features).toHaveLength(3)
        })
    })

    describe('Industry Detection', () => {
        it('detects tech industry', () => {
            const result = parsePrompt('Create a SaaS software platform')
            expect(result.industry).toBe('tech')
        })

        it('detects ecommerce industry', () => {
            const result = parsePrompt('Build an e-commerce store')
            expect(result.industry).toBe('ecommerce')
        })

        it('detects agency industry', () => {
            const result = parsePrompt('Design agency portfolio')
            expect(result.industry).toBe('agency')
        })

        it('returns undefined for unknown industry', () => {
            const result = parsePrompt('Create a simple website')
            expect(result.industry).toBeUndefined()
        })
    })

    describe('Full Prompt Parsing', () => {
        it('parses complex prompt correctly', () => {
            const prompt = "Create a professional landing page for 'ProbFixora Labs' — AI developer tools, color #0B74DE, include hero, features (3), pricing, contact form, tone: confident, theme: amazon-like"

            const result = parsePrompt(prompt)

            expect(result.siteName).toBe('ProbFixora Labs')
            expect(result.primaryColor).toBe('#0B74DE')
            expect(result.tone).toBe('confident')
            expect(result.theme).toBe('amazon')
            expect(result.sections).toContain('hero')
            expect(result.sections).toContain('features')
            expect(result.sections).toContain('pricing')
            expect(result.sections).toContain('contact')
            expect(result.features).toHaveLength(3)
            expect(result.industry).toBe('tech')
        })
    })

    describe('CTA Generation', () => {
        it('generates appropriate CTA based on tone', () => {
            const casual = parsePrompt('Create a casual website')
            expect(casual.cta?.primary).toBe('Get Started')

            const confident = parsePrompt('Tone: confident')
            expect(confident.cta?.primary).toBe('Start Now')
        })

        it('always includes secondary CTA', () => {
            const result = parsePrompt('Create a website')
            expect(result.cta?.secondary).toBe('Learn More')
        })
    })

    describe('Pricing Tiers', () => {
        it('generates pricing tiers when pricing section included', () => {
            const result = parsePrompt('Include pricing plans')

            expect(result.pricingTiers).toBeDefined()
            expect(result.pricingTiers).toHaveLength(3)
            expect(result.pricingTiers?.[0].name).toBe('Starter')
            expect(result.pricingTiers?.[1].name).toBe('Professional')
            expect(result.pricingTiers?.[2].name).toBe('Enterprise')
        })

        it('marks middle tier as highlighted', () => {
            const result = parsePrompt('Add pricing')
            expect(result.pricingTiers?.[1].highlighted).toBe(true)
        })
    })

    describe('Keyword Extraction', () => {
        it('extracts relevant keywords from prompt', () => {
            const result = parsePrompt('Create a professional SaaS dashboard for analytics')

            expect(result.keywords).toContain('professional')
            expect(result.keywords).toContain('saas')
            expect(result.keywords).toContain('dashboard')
            expect(result.keywords).toContain('analytics')
        })

        it('filters out stop words', () => {
            const result = parsePrompt('Create a website for the company')

            expect(result.keywords).not.toContain('create')
            expect(result.keywords).not.toContain('website')
            expect(result.keywords).not.toContain('the')
            expect(result.keywords).not.toContain('for')
        })

        it('limits keywords to 10', () => {
            const result = parsePrompt('This is a very long prompt with many different words about various topics including technology innovation design development marketing sales business growth strategy planning')

            expect(result.keywords.length).toBeLessThanOrEqual(10)
        })
    })
})
