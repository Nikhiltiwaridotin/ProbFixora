// Purpose: Component to display API configuration status and setup instructions
import { useState } from 'react'
import {
    CheckCircleIcon,
    XCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    KeyIcon,
} from '@heroicons/react/24/outline'

interface APIStatusProps {
    className?: string
}

export default function APIStatus({ className = '' }: APIStatusProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Check which APIs are configured
    const apis = {
        unsplash: {
            name: 'Unsplash',
            description: 'High-quality free images',
            configured: !!import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            url: 'https://unsplash.com/developers',
            icon: '🖼️',
        },
        pexels: {
            name: 'Pexels',
            description: 'Free stock photos',
            configured: !!import.meta.env.VITE_PEXELS_API_KEY,
            url: 'https://www.pexels.com/api/',
            icon: '📷',
        },
        huggingface: {
            name: 'Hugging Face',
            description: 'AI content generation',
            configured: !!import.meta.env.VITE_HUGGINGFACE_API_KEY,
            url: 'https://huggingface.co/settings/tokens',
            icon: '🤖',
        },
        formspree: {
            name: 'Formspree',
            description: 'Contact form emails',
            configured: !!import.meta.env.VITE_FORMSPREE_FORM_ID,
            url: 'https://formspree.io/',
            icon: '📧',
        },
    }

    const configuredCount = Object.values(apis).filter(api => api.configured).length
    const totalCount = Object.keys(apis).length

    return (
        <div className={`card ${className}`}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-xl"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <KeyIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            API Configuration
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {configuredCount}/{totalCount} APIs configured
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {configuredCount === totalCount ? (
                        <span className="badge-success">All Set!</span>
                    ) : configuredCount > 0 ? (
                        <span className="badge-primary">Partial</span>
                    ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            Using Fallbacks
                        </span>
                    )}
                    {isExpanded ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 space-y-3 animate-slide-down">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add API keys to <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">.env.local</code> for enhanced features.
                        All APIs are <span className="font-semibold text-green-600 dark:text-green-400">free to use</span>!
                    </p>

                    {Object.entries(apis).map(([key, api]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{api.icon}</span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {api.name}
                                        </span>
                                        {api.configured ? (
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <XCircleIcon className="w-4 h-4 text-gray-400" />
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {api.description}
                                    </span>
                                </div>
                            </div>
                            {!api.configured && (
                                <a
                                    href={api.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    Get Free Key →
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Setup Instructions */}
                    <div className="mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                        <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
                            Quick Setup:
                        </h4>
                        <ol className="text-sm text-primary-700 dark:text-primary-300 space-y-1 list-decimal list-inside">
                            <li>Copy <code>.env.example</code> to <code>.env.local</code></li>
                            <li>Get free API keys from links above</li>
                            <li>Paste keys in <code>.env.local</code></li>
                            <li>Restart dev server (<code>npm run dev</code>)</li>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    )
}
