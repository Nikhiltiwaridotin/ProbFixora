// Purpose: Vercel-inspired API Status component
import { useState } from 'react'
import {
    CheckCircleIcon,
    XCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline'

interface APIStatusProps {
    className?: string
}

export default function APIStatus({ className = '' }: APIStatusProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Check which APIs are configured
    const apis = {
        openai: {
            name: 'OpenAI',
            description: 'AI Generation',
            configured: !!import.meta.env.VITE_OPENAI_API_KEY,
            url: 'https://platform.openai.com/api-keys',
        },
        gemini: {
            name: 'Gemini',
            description: 'AI Generation (Google)',
            configured: !!import.meta.env.VITE_GEMINI_API_KEY,
            url: 'https://makersuite.google.com/app/apikey',
        },
        unsplash: {
            name: 'Unsplash',
            description: 'Free images',
            configured: !!import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            url: 'https://unsplash.com/developers',
        },
        pexels: {
            name: 'Pexels',
            description: 'Stock photos',
            configured: !!import.meta.env.VITE_PEXELS_API_KEY,
            url: 'https://www.pexels.com/api/',
        },
        formspree: {
            name: 'Formspree',
            description: 'Form handling',
            configured: !!import.meta.env.VITE_FORMSPREE_FORM_ID,
            url: 'https://formspree.io/',
        },
    }

    const configuredCount = Object.values(apis).filter(api => api.configured).length
    const totalCount = Object.keys(apis).length

    return (
        <div className={`card ${className}`}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 
                           hover:bg-geist-50 dark:hover:bg-geist-800 
                           transition-colors rounded-xl"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-geist-100 dark:bg-geist-800 
                                    flex items-center justify-center">
                        <svg className="w-4 h-4 text-geist-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <h3 className="font-medium text-geist-900 dark:text-white text-sm">
                            API Configuration
                        </h3>
                        <p className="text-xs text-geist-500">
                            {configuredCount}/{totalCount} configured
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {configuredCount === totalCount ? (
                        <span className="badge-success text-xs">Ready</span>
                    ) : configuredCount > 0 ? (
                        <span className="badge-primary text-xs">Partial</span>
                    ) : (
                        <span className="badge-default text-xs">Fallback</span>
                    )}
                    {isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4 text-geist-400" />
                    ) : (
                        <ChevronDownIcon className="w-4 h-4 text-geist-400" />
                    )}
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 space-y-2 animate-fade-down">
                    <p className="text-xs text-geist-500 mb-3">
                        Add API keys to <code className="px-1.5 py-0.5 rounded bg-geist-100 dark:bg-geist-800 font-mono">.env.local</code> for enhanced features.
                    </p>

                    {Object.entries(apis).map(([key, api]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg 
                                       bg-geist-50 dark:bg-geist-800"
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-geist-900 dark:text-white text-sm">
                                    {api.name}
                                </span>
                                {api.configured ? (
                                    <CheckCircleIcon className="w-4 h-4 text-success" />
                                ) : (
                                    <XCircleIcon className="w-4 h-4 text-geist-300 dark:text-geist-600" />
                                )}
                            </div>
                            {!api.configured && (
                                <a
                                    href={api.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-accent-blue hover:underline"
                                >
                                    Get key →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
