// Purpose: Google Gemini integration for AI-powered website generation
import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIGenerationResult, EnhanceResult, StreamCallbacks } from './openai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

/**
 * Check if Gemini is available
 */
export function isGeminiAvailable(): boolean {
    return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 0
}

/**
 * PREMIUM System prompt for website generation - Creates stunning, modern websites
 * (Reused from OpenAI implementation for consistency)
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
 * Enhance a user's prompt to generate better websites
 */
export async function enhancePrompt(userPrompt: string): Promise<EnhanceResult> {
    if (!isGeminiAvailable()) {
        return {
            success: false,
            enhancedPrompt: userPrompt,
            error: 'Gemini API not available'
        }
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `You are an expert prompt engineer for AI website generation.
        
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

OUTPUT: Return ONLY the enhanced prompt text. No explanations or markdown.

User request: "${userPrompt}"`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return {
            success: true,
            enhancedPrompt: text.trim()
        }
    } catch (error) {
        return {
            success: false,
            enhancedPrompt: userPrompt,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Generate a complete website using Google Gemini
 */
export async function generateWebsiteWithGemini(
    prompt: string,
    callbacks?: StreamCallbacks
): Promise<AIGenerationResult> {
    if (!isGeminiAvailable()) {
        return {
            success: false,
            html: '',
            error: 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.'
        }
    }

    callbacks?.onStart?.()

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        // Using gemini-1.5-pro for better code generation capabilities
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

        const fullPrompt = `${SYSTEM_PROMPT}\n\nCreate a website: ${prompt}`

        const result = await model.generateContentStream(fullPrompt)

        let fullText = ''

        for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            fullText += chunkText
            callbacks?.onToken?.(chunkText)
        }

        // Clean up the HTML if it has markdown code blocks
        let cleanHtml = fullText.trim()
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
            // Gemini doesn't report tokens in the stream easily, leaving undefined
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
