// Purpose: AI service for enhanced content generation using free Hugging Face API
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY

// Hugging Face Inference API endpoint
const HF_API_URL = 'https://api-inference.huggingface.co/models/'

// Free models available on Hugging Face
const MODELS = {
    textGeneration: 'microsoft/DialoGPT-large',
    textToText: 'google/flan-t5-base',
    summarization: 'facebook/bart-large-cnn',
}

interface AIGenerationOptions {
    maxLength?: number
    temperature?: number
    topP?: number
}

/**
 * Check if AI features are available (API key is set)
 */
export function isAIAvailable(): boolean {
    return !!HUGGINGFACE_API_KEY && HUGGINGFACE_API_KEY.length > 0
}

/**
 * Generate enhanced content using Hugging Face API
 */
export async function generateAIContent(
    prompt: string,
    options: AIGenerationOptions = {}
): Promise<string | null> {
    if (!isAIAvailable()) {
        console.log('AI not available - using template-based generation')
        return null
    }

    const { maxLength = 150, temperature = 0.7 } = options

    try {
        const response = await fetch(`${HF_API_URL}${MODELS.textToText}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: maxLength,
                    temperature: temperature,
                    do_sample: true,
                },
            }),
        })

        if (!response.ok) {
            console.warn('AI API error:', response.status)
            return null
        }

        const data = await response.json()

        // Handle different response formats
        if (Array.isArray(data) && data[0]?.generated_text) {
            return data[0].generated_text
        }
        if (data.generated_text) {
            return data.generated_text
        }
        if (Array.isArray(data) && data[0]?.summary_text) {
            return data[0].summary_text
        }

        return null
    } catch (error) {
        console.warn('AI generation failed:', error)
        return null
    }
}

/**
 * Generate a tagline for a website
 */
export async function generateTagline(
    siteName: string,
    industry: string,
    tone: string
): Promise<string> {
    const prompt = `Generate a short, catchy tagline for a ${tone} ${industry} website called "${siteName}". The tagline should be under 10 words.`

    const aiResult = await generateAIContent(prompt, { maxLength: 50 })

    if (aiResult) {
        return aiResult.trim()
    }

    // Fallback taglines based on tone
    const fallbacks: Record<string, string[]> = {
        professional: [
            'Excellence in every detail',
            'Your success, our mission',
            'Trusted solutions for modern businesses',
        ],
        casual: [
            'Making life easier, one click at a time',
            'Simple solutions for everyday challenges',
            'Welcome to something awesome',
        ],
        playful: [
            "Let's build something amazing together!",
            'Where creativity meets innovation',
            'The fun way to get things done',
        ],
        confident: [
            'The future starts here',
            'Leading the way forward',
            'Bold solutions for bold ideas',
        ],
        formal: [
            'Setting the standard for excellence',
            'Precision and professionalism',
            'Your trusted partner in success',
        ],
        friendly: [
            "We're here to help you succeed",
            'Together, we achieve more',
            'Your journey to success starts here',
        ],
    }

    const toneTaglines = fallbacks[tone] || fallbacks.professional
    return toneTaglines[Math.floor(Math.random() * toneTaglines.length)]
}

/**
 * Generate feature descriptions
 */
export async function generateFeatureDescription(
    featureTitle: string,
    siteName: string,
    industry: string
): Promise<string> {
    const prompt = `Write a one-sentence description for a ${industry} product feature called "${featureTitle}". Keep it under 20 words.`

    const aiResult = await generateAIContent(prompt, { maxLength: 80 })

    if (aiResult) {
        return aiResult.trim()
    }

    // Fallback descriptions
    const fallbacks: Record<string, string> = {
        'Lightning Fast': 'Built for speed with modern architecture and optimized performance.',
        'Secure & Reliable': 'Enterprise-grade security with 99.9% uptime guarantee.',
        'Easy Integration': 'Connect seamlessly with your existing tools and workflows.',
        '24/7 Support': 'Our dedicated team is always here when you need help.',
        'Analytics Dashboard': 'Real-time insights and metrics at your fingertips.',
        'Cloud Native': 'Scale effortlessly as your business grows.',
        'Premium Quality': 'Uncompromising quality in everything we deliver.',
        'Expert Team': 'Skilled professionals dedicated to your success.',
        'Fast Delivery': 'Quick turnaround without sacrificing quality.',
        'Best Value': 'Premium features at competitive pricing.',
        'Custom Solutions': 'Tailored specifically to your unique needs.',
        'Ongoing Support': 'Long-term partnership and continuous improvement.',
    }

    return fallbacks[featureTitle] || 'Designed to help you achieve your goals faster and more efficiently.'
}

/**
 * Generate CTA text based on context
 */
export async function generateCTAText(
    siteName: string,
    tone: string,
    isPrimary: boolean
): Promise<string> {
    if (!isAIAvailable()) {
        // Fallback CTAs
        const primaryCTAs: Record<string, string> = {
            professional: 'Get Started Today',
            casual: 'Get Started',
            playful: "Let's Go! 🚀",
            confident: 'Start Now',
            formal: 'Begin Your Journey',
            friendly: 'Join Us Today',
        }

        const secondaryCTAs: Record<string, string> = {
            professional: 'Learn More',
            casual: 'See How It Works',
            playful: 'Explore More ✨',
            confident: 'Discover More',
            formal: 'Request Information',
            friendly: 'Find Out More',
        }

        return isPrimary
            ? (primaryCTAs[tone] || 'Get Started')
            : (secondaryCTAs[tone] || 'Learn More')
    }

    const ctaType = isPrimary ? 'primary call-to-action button' : 'secondary call-to-action link'
    const prompt = `Generate a short ${ctaType} text for a ${tone} website. Maximum 3 words.`

    const result = await generateAIContent(prompt, { maxLength: 20 })
    return result || (isPrimary ? 'Get Started' : 'Learn More')
}

export default {
    isAIAvailable,
    generateAIContent,
    generateTagline,
    generateFeatureDescription,
    generateCTAText,
}
