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
 * System prompt for website generation - optimized for React + Tailwind
 */
const SYSTEM_PROMPT = `You are an expert web developer specialized in creating beautiful, modern websites using React and Tailwind CSS.

When given a prompt, you will generate a COMPLETE, SINGLE-FILE React component that can be rendered directly in a browser.

REQUIREMENTS:
1. Generate a complete, self-contained HTML page with inline React and Tailwind
2. Use CDN links for React, ReactDOM, Babel, and Tailwind CSS
3. The design should be modern, beautiful, and responsive
4. Use a cohesive color scheme based on the user's request
5. Include appropriate sections like hero, features, pricing, testimonials, contact, footer
6. Add smooth animations and hover effects
7. Make it mobile-responsive
8. Include realistic placeholder content

OUTPUT FORMAT:
Return ONLY valid HTML code starting with <!DOCTYPE html>. Do not include any markdown code blocks or explanations.

The HTML should:
- Use <script type="text/babel"> for React components
- Include Tailwind CSS via CDN
- Include React, ReactDOM, and Babel via CDN
- Render the main App component to root div
- Be immediately renderable in a browser`

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
