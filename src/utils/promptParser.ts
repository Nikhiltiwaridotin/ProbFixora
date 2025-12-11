// Purpose: Parse natural language prompts into structured intent objects
import { ParsedIntent, SectionType, FeatureItem, PricingTier } from '../types'

// Color palette generation utilities
const generateColorPalette = (primaryHex: string) => {
    // Convert hex to HSL for manipulation
    const hexToHsl = (hex: string): [number, number, number] => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        if (!result) return [210, 100, 50]

        let r = parseInt(result[1], 16) / 255
        let g = parseInt(result[2], 16) / 255
        let b = parseInt(result[3], 16) / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
                case g: h = ((b - r) / d + 2) / 6; break
                case b: h = ((r - g) / d + 4) / 6; break
            }
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
    }

    const hslToHex = (h: number, s: number, l: number): string => {
        s /= 100
        l /= 100
        const a = s * Math.min(l, 1 - l)
        const f = (n: number) => {
            const k = (n + h / 30) % 12
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
            return Math.round(255 * color).toString(16).padStart(2, '0')
        }
        return `#${f(0)}${f(8)}${f(4)}`
    }

    const [h, s, l] = hexToHsl(primaryHex)

    return {
        primary: primaryHex,
        primaryLight: hslToHex(h, s, Math.min(l + 20, 95)),
        primaryDark: hslToHex(h, s, Math.max(l - 20, 10)),
        secondary: hslToHex((h + 180) % 360, s * 0.8, l),
        accent: hslToHex((h + 45) % 360, s, l),
    }
}

// Extract section types from prompt
const extractSections = (prompt: string): SectionType[] => {
    const sectionKeywords: Record<SectionType, string[]> = {
        nav: ['nav', 'navigation', 'header', 'menu'],
        hero: ['hero', 'banner', 'landing', 'headline', 'main section'],
        features: ['feature', 'features', 'benefits', 'services', 'offerings'],
        pricing: ['pricing', 'price', 'plans', 'tiers', 'subscription'],
        gallery: ['gallery', 'portfolio', 'projects', 'showcase', 'work', 'products'],
        testimonials: ['testimonial', 'testimonials', 'reviews', 'feedback', 'clients'],
        contact: ['contact', 'contact form', 'get in touch', 'reach out', 'email'],
        about: ['about', 'about us', 'who we are', 'story', 'mission'],
        cta: ['cta', 'call to action', 'signup', 'get started', 'newsletter'],
        faq: ['faq', 'faqs', 'questions', 'frequently asked'],
        team: ['team', 'members', 'people', 'staff', 'employees'],
        stats: ['stats', 'statistics', 'numbers', 'metrics', 'achievements'],
        footer: ['footer', 'bottom'],
    }

    const foundSections: SectionType[] = []
    const lowerPrompt = prompt.toLowerCase()

    // Always include nav and footer
    foundSections.push('nav')

    for (const [section, keywords] of Object.entries(sectionKeywords)) {
        if (section === 'nav' || section === 'footer') continue

        for (const keyword of keywords) {
            if (lowerPrompt.includes(keyword)) {
                foundSections.push(section as SectionType)
                break
            }
        }
    }

    // Always include footer at the end
    foundSections.push('footer')

    // If no sections found, add defaults
    if (foundSections.length === 2) {
        foundSections.splice(1, 0, 'hero', 'features', 'cta')
    }

    return [...new Set(foundSections)]
}

// Extract features count from prompt
const extractFeatureCount = (prompt: string): number => {
    const matches = prompt.match(/(\d+)\s*features?/i) ||
        prompt.match(/features?\s*\((\d+)\)/i) ||
        prompt.match(/features?\s*:?\s*(\d+)/i)

    if (matches) {
        const count = parseInt(matches[1], 10)
        return Math.min(Math.max(count, 1), 8)
    }

    return 3 // Default feature count
}

// Generate default features
const generateDefaultFeatures = (count: number, industry?: string): FeatureItem[] => {
    const featureTemplates: Record<string, FeatureItem[]> = {
        tech: [
            { id: '1', title: 'Lightning Fast', description: 'Built for speed with modern architecture', icon: 'BoltIcon' },
            { id: '2', title: 'Secure & Reliable', description: 'Enterprise-grade security built-in', icon: 'ShieldCheckIcon' },
            { id: '3', title: 'Easy Integration', description: 'Connect with your favorite tools', icon: 'PuzzlePieceIcon' },
            { id: '4', title: '24/7 Support', description: 'Always here when you need us', icon: 'ChatBubbleLeftRightIcon' },
            { id: '5', title: 'Analytics Dashboard', description: 'Real-time insights at your fingertips', icon: 'ChartBarIcon' },
            { id: '6', title: 'Cloud Native', description: 'Scale effortlessly as you grow', icon: 'CloudIcon' },
        ],
        default: [
            { id: '1', title: 'Premium Quality', description: 'Uncompromising quality in everything we do', icon: 'StarIcon' },
            { id: '2', title: 'Expert Team', description: 'Professionals dedicated to your success', icon: 'UserGroupIcon' },
            { id: '3', title: 'Fast Delivery', description: 'Quick turnaround without sacrificing quality', icon: 'RocketLaunchIcon' },
            { id: '4', title: 'Best Value', description: 'Competitive pricing for premium services', icon: 'CurrencyDollarIcon' },
            { id: '5', title: 'Custom Solutions', description: 'Tailored to your unique needs', icon: 'WrenchScrewdriverIcon' },
            { id: '6', title: 'Ongoing Support', description: 'Long-term partnership and support', icon: 'LifebuoyIcon' },
        ],
    }

    const templates = featureTemplates[industry?.toLowerCase() === 'tech' ? 'tech' : 'default']
    return templates.slice(0, count).map((f, i) => ({ ...f, id: String(i + 1) }))
}

// Generate default pricing tiers
const generateDefaultPricing = (): PricingTier[] => [
    {
        id: 'starter',
        name: 'Starter',
        price: 0,
        period: 'monthly',
        description: 'Perfect for getting started',
        features: ['Up to 3 projects', 'Basic analytics', 'Community support', '1GB storage'],
        cta: 'Get Started Free',
    },
    {
        id: 'pro',
        name: 'Professional',
        price: 29,
        period: 'monthly',
        description: 'For growing teams',
        features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '10GB storage', 'Team collaboration', 'Custom integrations'],
        highlighted: true,
        cta: 'Start Pro Trial',
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        period: 'monthly',
        description: 'For large organizations',
        features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'Custom contracts', 'SLA guarantee', 'White-label options'],
        cta: 'Contact Sales',
    },
]

// Extract tone from prompt
type ToneType = ParsedIntent['tone']
const extractTone = (prompt: string): ToneType => {
    const toneKeywords: Record<ToneType, string[]> = {
        professional: ['professional', 'business', 'enterprise', 'corporate'],
        casual: ['casual', 'relaxed', 'friendly', 'approachable'],
        playful: ['playful', 'fun', 'creative', 'quirky', 'colorful'],
        confident: ['confident', 'bold', 'strong', 'assertive'],
        formal: ['formal', 'serious', 'traditional', 'classic'],
        friendly: ['friendly', 'warm', 'welcoming', 'inviting'],
    }

    const lowerPrompt = prompt.toLowerCase()

    for (const [tone, keywords] of Object.entries(toneKeywords)) {
        for (const keyword of keywords) {
            if (lowerPrompt.includes(keyword)) {
                return tone as ToneType
            }
        }
    }

    return 'professional' // Default
}

// Extract theme from prompt
type ThemeType = ParsedIntent['theme']
const extractTheme = (prompt: string): ThemeType => {
    const themeKeywords: Record<ThemeType, string[]> = {
        light: ['light', 'bright', 'white', 'clean'],
        dark: ['dark', 'night', 'black'],
        amazon: ['amazon', 'amazon-like', 'e-commerce', 'shopping'],
        corporate: ['corporate', 'enterprise', 'business'],
    }

    const lowerPrompt = prompt.toLowerCase()

    for (const [theme, keywords] of Object.entries(themeKeywords)) {
        for (const keyword of keywords) {
            if (lowerPrompt.includes(keyword)) {
                return theme as ThemeType
            }
        }
    }

    return 'light' // Default
}

// Extract color from prompt
const extractColor = (prompt: string): string => {
    // Match hex colors
    const hexMatch = prompt.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/)
    if (hexMatch) {
        return hexMatch[0]
    }

    // Match color names
    const colorNames: Record<string, string> = {
        blue: '#0B74DE',
        red: '#DC2626',
        green: '#10B981',
        purple: '#8B5CF6',
        orange: '#F59E0B',
        pink: '#EC4899',
        teal: '#14B8A6',
        indigo: '#6366F1',
        cyan: '#06B6D4',
        yellow: '#EAB308',
    }

    const lowerPrompt = prompt.toLowerCase()
    for (const [name, hex] of Object.entries(colorNames)) {
        if (lowerPrompt.includes(`color ${name}`) || lowerPrompt.includes(`${name} color`)) {
            return hex
        }
    }

    return '#0B74DE' // Default blue
}

// Extract site name from prompt
const extractSiteName = (prompt: string): string => {
    // Match quoted names
    const quotedMatch = prompt.match(/['"]([^'"]+)['"]/);
    if (quotedMatch) {
        return quotedMatch[1]
    }

    // Match "for X" pattern
    const forMatch = prompt.match(/for\s+([A-Z][A-Za-z0-9\s]+?)(?:\s*[-—–]|\s*,|\s*$)/);
    if (forMatch) {
        return forMatch[1].trim()
    }

    return 'My Website'
}

// Extract keywords from prompt
const extractKeywords = (prompt: string): string[] => {
    // Common stop words to exclude
    const stopWords = new Set([
        'a', 'an', 'the', 'and', 'or', 'but', 'for', 'with', 'to', 'of', 'in', 'on',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
        'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
        'create', 'build', 'make', 'include', 'use', 'add', 'want', 'need',
        'page', 'website', 'site', 'landing', 'section', 'color', 'theme', 'tone',
    ])

    const words = prompt.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word))

    // Get unique keywords
    return [...new Set(words)].slice(0, 10)
}

// Detect industry from keywords
const detectIndustry = (prompt: string): string | undefined => {
    const industries: Record<string, string[]> = {
        tech: ['software', 'saas', 'ai', 'tech', 'developer', 'api', 'cloud', 'app'],
        ecommerce: ['shop', 'store', 'products', 'ecommerce', 'e-commerce', 'buy', 'sell'],
        agency: ['agency', 'design', 'creative', 'marketing', 'digital'],
        healthcare: ['health', 'medical', 'healthcare', 'doctor', 'clinic'],
        finance: ['finance', 'financial', 'banking', 'investment', 'trading'],
        education: ['education', 'learning', 'course', 'school', 'training'],
        realestate: ['real estate', 'property', 'homes', 'apartments', 'realty'],
    }

    const lowerPrompt = prompt.toLowerCase()

    for (const [industry, keywords] of Object.entries(industries)) {
        for (const keyword of keywords) {
            if (lowerPrompt.includes(keyword)) {
                return industry
            }
        }
    }

    return undefined
}

/**
 * Main function to parse a natural language prompt into a structured intent
 */
export function parsePrompt(prompt: string): ParsedIntent {
    const siteName = extractSiteName(prompt)
    const primaryColor = extractColor(prompt)
    const palette = generateColorPalette(primaryColor)
    const sections = extractSections(prompt)
    const featureCount = extractFeatureCount(prompt)
    const industry = detectIndustry(prompt)

    const parsedIntent: ParsedIntent = {
        siteName,
        title: siteName,
        tone: extractTone(prompt),
        theme: extractTheme(prompt),
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        sections,
        pages: ['Home'],
        keywords: extractKeywords(prompt),
        industry,
    }

    // Add features if the features section is included
    if (sections.includes('features')) {
        parsedIntent.features = generateDefaultFeatures(featureCount, industry)
    }

    // Add pricing tiers if pricing section is included
    if (sections.includes('pricing')) {
        parsedIntent.pricingTiers = generateDefaultPricing()
    }

    // Set CTA based on tone
    parsedIntent.cta = {
        primary: parsedIntent.tone === 'casual' ? 'Get Started' :
            parsedIntent.tone === 'playful' ? "Let's Go!" :
                parsedIntent.tone === 'confident' ? 'Start Now' :
                    'Get Started Today',
        secondary: 'Learn More',
    }

    return parsedIntent
}

export { generateColorPalette, extractSections, extractTone, extractTheme }
