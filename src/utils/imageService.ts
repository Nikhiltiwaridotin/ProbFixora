// Purpose: Image service for fetching images from Unsplash/Pexels with gradient fallbacks

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

export interface ImageResult {
    id: string
    url: string
    thumbnailUrl: string
    alt: string
    photographer?: string
    photographerUrl?: string
    source: 'unsplash' | 'pexels' | 'placeholder'
    width: number
    height: number
}

/**
 * Check if image APIs are available
 */
export function isImageAPIAvailable(): boolean {
    return !!(UNSPLASH_ACCESS_KEY || PEXELS_API_KEY)
}

/**
 * Get status of available image APIs  
 */
export function getImageAPIStatus(): { unsplash: boolean; pexels: boolean } {
    return {
        unsplash: !!UNSPLASH_ACCESS_KEY,
        pexels: !!PEXELS_API_KEY,
    }
}

/**
 * Search for images using available APIs
 */
export async function searchImages(
    query: string,
    count: number = 1
): Promise<ImageResult[]> {
    // Try Unsplash first
    if (UNSPLASH_ACCESS_KEY) {
        try {
            const results = await searchUnsplash(query, count)
            if (results.length > 0) return results
        } catch (error) {
            console.warn('Unsplash API error:', error)
        }
    }

    // Try Pexels as fallback
    if (PEXELS_API_KEY) {
        try {
            const results = await searchPexels(query, count)
            if (results.length > 0) return results
        } catch (error) {
            console.warn('Pexels API error:', error)
        }
    }

    // Return placeholder images
    return generatePlaceholderImages(query, count)
}

/**
 * Search Unsplash API
 */
async function searchUnsplash(query: string, count: number): Promise<ImageResult[]> {
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
        {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        }
    )

    if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()

    return data.results.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.regular,
        thumbnailUrl: photo.urls.thumb,
        alt: photo.alt_description || query,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        source: 'unsplash' as const,
        width: photo.width,
        height: photo.height,
    }))
}

/**
 * Search Pexels API
 */
async function searchPexels(query: string, count: number): Promise<ImageResult[]> {
    const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
        {
            headers: {
                Authorization: PEXELS_API_KEY!,
            },
        }
    )

    if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`)
    }

    const data = await response.json()

    return data.photos.map((photo: any) => ({
        id: String(photo.id),
        url: photo.src.large,
        thumbnailUrl: photo.src.tiny,
        alt: photo.alt || query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        source: 'pexels' as const,
        width: photo.width,
        height: photo.height,
    }))
}

/**
 * Generate placeholder images with gradients
 */
function generatePlaceholderImages(query: string, count: number): ImageResult[] {
    const images: ImageResult[] = []

    for (let i = 0; i < count; i++) {
        const hash = (query + i).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const hue1 = (hash * 37) % 360
        const hue2 = (hue1 + 40) % 360

        // Create SVG gradient placeholder
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue1},70%,50%)"/>
          <stop offset="100%" style="stop-color:hsl(${hue2},70%,40%)"/>
        </linearGradient>
      </defs>
      <rect fill="url(#g${i})" width="1200" height="800"/>
      <text x="600" y="400" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="48" font-family="sans-serif">${query}</text>
    </svg>`

        const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`

        images.push({
            id: `placeholder-${i}`,
            url: dataUrl,
            thumbnailUrl: dataUrl,
            alt: query,
            source: 'placeholder',
            width: 1200,
            height: 800,
        })
    }

    return images
}

/**
 * Get a single random image
 */
export async function getRandomImage(query: string): Promise<ImageResult> {
    const images = await searchImages(query, 1)
    return images[0]
}

/**
 * Get hero image for a specific industry/topic
 */
export async function getHeroImage(industry: string, keywords: string[]): Promise<ImageResult> {
    const query = keywords.length > 0
        ? `${industry} ${keywords.slice(0, 2).join(' ')}`
        : industry

    return getRandomImage(query)
}

/**
 * Generate gradient background CSS
 */
export function generateGradientBg(seed: string): string {
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const hue1 = hash % 360
    const hue2 = (hue1 + 40) % 360
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 40%))`
}

/**
 * Get curated image categories for different industries
 */
export function getSuggestedQueries(industry?: string): string[] {
    const queries: Record<string, string[]> = {
        tech: ['technology', 'coding', 'startup office', 'software development', 'digital'],
        ecommerce: ['shopping', 'products', 'retail store', 'packaging', 'delivery'],
        agency: ['creative team', 'design studio', 'modern office', 'collaboration', 'workspace'],
        healthcare: ['medical', 'healthcare professional', 'hospital', 'wellness', 'care'],
        finance: ['business meeting', 'finance', 'investment', 'corporate', 'banking'],
        education: ['learning', 'students', 'classroom', 'books', 'education'],
        realestate: ['modern house', 'architecture', 'interior design', 'property', 'home'],
    }

    return queries[industry || 'tech'] || queries.tech
}

export default {
    isImageAPIAvailable,
    getImageAPIStatus,
    searchImages,
    getRandomImage,
    getHeroImage,
    generateGradientBg,
    getSuggestedQueries,
}
