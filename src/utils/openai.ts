// Purpose: OpenAI integration for AI-powered website generation
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Check if OpenAI is available
 */
export function isOpenAIAvailable(): boolean {
    return !!OPENAI_API_KEY && OPENAI_API_KEY.length > 0
}

/**
 * PREMIUM System prompt for website generation - Creates stunning, modern websites
 */
const SYSTEM_PROMPT = `You are an elite web developer and UI/UX designer creating STUNNING, PREMIUM websites.

DESIGN PHILOSOPHY:
- Create designs that WOW users instantly - like Apple, Vercel, Linear, or Stripe websites
- Use bold typography, striking gradients, and smooth animations
- Every element should feel intentional and premium
- Dark themes with vibrant accents are preferred unless specified otherwise

VISUAL REQUIREMENTS:
1. TYPOGRAPHY: Use elegant font stacks (Inter, SF Pro, system-ui). Large headlines (4xl-7xl), generous letter-spacing
2. COLORS: Use rich gradients (purple→blue, cyan→pink, orange→red), glassmorphism effects, subtle glows
3. SPACING: Generous whitespace, section padding (py-24 or more), breathing room
4. ANIMATIONS: Smooth transitions (transition-all duration-500), hover transforms, fade-ins
5. EFFECTS: Backdrop blur, box shadows, gradient borders, animated backgrounds

SECTIONS TO INCLUDE (based on prompt):
- HERO: Full-screen with animated gradient background, large headline, glowing CTA buttons
- FEATURES: Icon cards with hover effects, gradient icons, clean grid layout
- TESTIMONIALS: Quote cards with avatars, star ratings, subtle animations
- PRICING: 3-tier cards, highlighted popular plan, feature checkmarks
- CTA: Bold gradient background, compelling copy
- FOOTER: Clean, organized links, social icons

TECHNICAL REQUIREMENTS:
1. Single HTML file with embedded React and Tailwind via CDN
2. Use <script type="text/babel"> for React JSX
3. Include all CDN links: React 18, ReactDOM, Babel, Tailwind CSS
4. Mobile-responsive design (use md:, lg: breakpoints)
5. Use Heroicons or Lucide icons via CDN or inline SVGs
6. Add realistic, engaging placeholder content

OUTPUT: Return ONLY the complete HTML code starting with <!DOCTYPE html>. No markdown blocks or explanations.`

/**
 * System prompt for enhancing user prompts
 */
const ENHANCE_PROMPT_SYSTEM = `You are an expert prompt engineer for AI website generation.

Your job is to take a simple website request and transform it into a detailed, specific prompt that will generate an AMAZING, STUNNING website.

RULES:
1. Keep the user's core idea but add rich details
2. Suggest specific color schemes (use modern palettes like purple/cyan, blue/pink)
3. Specify design style (glassmorphism, neumorphism, minimalist, bold)
4. Add specific sections (hero, features, testimonials, pricing, footer)
5. Include animations and interactions
6. Suggest a compelling tagline or headline
7. Keep the enhanced prompt under 200 words
8. Make it specific and actionable

OUTPUT: Return ONLY the enhanced prompt text. No explanations or markdown.`

export interface AIGenerationResult {
    success: boolean
    html: string
    error?: string
    tokensUsed?: number
}

export interface StreamCallbacks {
    onStart?: () => void
    onToken?: (token: string) => void
    onComplete?: (html: string) => void
    onError?: (error: string) => void
}

export interface EnhanceResult {
    success: boolean
    enhancedPrompt: string
    error?: string
}

/**
 * Enhance a user's prompt to generate better websites
 */
export async function enhancePrompt(userPrompt: string): Promise<EnhanceResult> {
    if (!isOpenAIAvailable()) {
        return {
            success: false,
            enhancedPrompt: userPrompt,
            error: 'OpenAI not available'
        }
    }

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: ENHANCE_PROMPT_SYSTEM },
                    { role: 'user', content: `Enhance this website request: "${userPrompt}"` }
                ],
                max_tokens: 500,
                temperature: 0.8,
            }),
        })

        if (!response.ok) {
            return {
                success: false,
                enhancedPrompt: userPrompt,
                error: 'Failed to enhance prompt'
            }
        }

        const data = await response.json()
        const enhanced = data.choices?.[0]?.message?.content?.trim() || userPrompt

        return {
            success: true,
            enhancedPrompt: enhanced
        }
    } catch {
        return {
            success: false,
            enhancedPrompt: userPrompt,
            error: 'Network error'
        }
    }
}

/**
 * Generate a complete website using OpenAI GPT-4
 */
export async function generateWebsiteWithOpenAI(
    prompt: string,
    callbacks?: StreamCallbacks
): Promise<AIGenerationResult> {
    if (!isOpenAIAvailable()) {
        return {
            success: false,
            html: '',
            error: 'OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env.local file.'
        }
    }

    callbacks?.onStart?.()

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Create a website: ${prompt}` }
                ],
                max_tokens: 8000,
                temperature: 0.7,
                stream: true,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            const errorMessage = errorData.error?.message || `API error: ${response.status}`
            callbacks?.onError?.(errorMessage)
            return {
                success: false,
                html: '',
                error: errorMessage
            }
        }

        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let fullHtml = ''
        let tokensUsed = 0

        if (reader) {
            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n').filter(line => line.trim() !== '')

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6)
                        if (data === '[DONE]') continue

                        try {
                            const parsed = JSON.parse(data)
                            const content = parsed.choices?.[0]?.delta?.content || ''
                            if (content) {
                                fullHtml += content
                                callbacks?.onToken?.(content)
                            }
                            if (parsed.usage?.total_tokens) {
                                tokensUsed = parsed.usage.total_tokens
                            }
                        } catch {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        }

        // Clean up the HTML if it has markdown code blocks
        let cleanHtml = fullHtml.trim()
        if (cleanHtml.startsWith('```html')) {
            cleanHtml = cleanHtml.slice(7)
        }
        if (cleanHtml.startsWith('```')) {
            cleanHtml = cleanHtml.slice(3)
        }
        if (cleanHtml.endsWith('```')) {
            cleanHtml = cleanHtml.slice(0, -3)
        }
        cleanHtml = cleanHtml.trim()

        callbacks?.onComplete?.(cleanHtml)

        return {
            success: true,
            html: cleanHtml,
            tokensUsed
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        callbacks?.onError?.(errorMessage)
        return {
            success: false,
            html: '',
            error: errorMessage
        }
    }
}

/**
 * Generate website without streaming (simpler, for fallback)
 */
export async function generateWebsiteSimple(prompt: string): Promise<AIGenerationResult> {
    if (!isOpenAIAvailable()) {
        return {
            success: false,
            html: '',
            error: 'OpenAI API key not configured'
        }
    }

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Create a website: ${prompt}` }
                ],
                max_tokens: 8000,
                temperature: 0.7,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return {
                success: false,
                html: '',
                error: errorData.error?.message || `API error: ${response.status}`
            }
        }

        const data = await response.json()
        let html = data.choices?.[0]?.message?.content || ''

        // Clean up markdown code blocks
        if (html.startsWith('```html')) html = html.slice(7)
        if (html.startsWith('```')) html = html.slice(3)
        if (html.endsWith('```')) html = html.slice(0, -3)
        html = html.trim()

        return {
            success: true,
            html,
            tokensUsed: data.usage?.total_tokens
        }
    } catch (error) {
        return {
            success: false,
            html: '',
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export default {
    isOpenAIAvailable,
    generateWebsiteWithOpenAI,
    generateWebsiteSimple,
}
