// Purpose: Main prompt input component with example prompts and generation progress
import { useState } from 'react'
import { SparklesIcon, LightBulbIcon } from '@heroicons/react/24/outline'

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
    progress: number;
    currentStep: string;
}

export default function PromptInput({
    value,
    onChange,
    onGenerate,
    isGenerating,
    progress,
    currentStep,
}: PromptInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    const examplePrompts = [
        {
            title: 'SaaS Landing',
            prompt: "Create a professional landing page for 'CloudSync Pro' — a cloud storage SaaS, color #6366F1, include hero, features (4), pricing, testimonials, contact form, tone: professional, theme: dark",
        },
        {
            title: 'Portfolio',
            prompt: "Build a creative portfolio for 'Alex Designer' — UI/UX designer, color #10B981, include hero, projects gallery, about, skills, contact, tone: creative, theme: light",
        },
        {
            title: 'E-commerce',
            prompt: "Create an e-commerce landing for 'TechGadgets' — electronics store, color #F59E0B, include hero, featured products, categories, deals, newsletter, tone: exciting, theme: amazon-like",
        },
        {
            title: 'Startup',
            prompt: "Build a startup page for 'InnovateTech AI' — AI developer tools, color #0B74DE, include hero, features (3), pricing, team, FAQ, tone: confident, theme: corporate",
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim() && !isGenerating) {
            onGenerate(value)
        }
    }

    const handleExampleClick = (prompt: string) => {
        onChange(prompt)
    }

    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center mb-8">
                <h2 className="heading-lg mb-3">
                    <span className="gradient-text">Describe Your Website</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Tell us what you want to build. Include details like colors, sections,
                    tone, and theme for the best results.
                </p>
            </div>

            {/* Main Input Form */}
            <form onSubmit={handleSubmit} className="relative">
                <div
                    className={`
            relative rounded-2xl transition-all duration-300
            ${isFocused ? 'ring-4 ring-primary-100 dark:ring-primary-900' : ''}
            ${isGenerating ? 'opacity-75' : ''}
          `}
                >
                    {/* Textarea */}
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Create a professional landing page for 'ProbFixora Labs' — AI developer tools, color #0B74DE, include hero, features (3), pricing, contact form, tone: confident, theme: amazon-like..."
                        rows={5}
                        disabled={isGenerating}
                        className="w-full px-6 py-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none text-lg transition-colors duration-200"
                    />

                    {/* Character Count */}
                    <div className="absolute bottom-4 left-6 text-sm text-gray-400">
                        {value.length} characters
                    </div>

                    {/* Generate Button */}
                    <button
                        type="submit"
                        disabled={!value.trim() || isGenerating}
                        className="absolute bottom-4 right-4 btn-amazon disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                Generate Website
                            </>
                        )}
                    </button>
                </div>

                {/* Progress Bar (when generating) */}
                {isGenerating && (
                    <div className="mt-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {currentStep}
                            </span>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-amazon-orange rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </form>

            {/* Example Prompts */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <LightBulbIcon className="w-4 h-4" />
                    <span>Try an example prompt:</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {examplePrompts.map((example) => (
                        <button
                            key={example.title}
                            onClick={() => handleExampleClick(example.prompt)}
                            disabled={isGenerating}
                            className="text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                                {example.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {example.prompt.slice(0, 60)}...
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                    💡 Tips for better results:
                </h4>
                <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
                    <li>• Include a site name in quotes (e.g., 'My Company')</li>
                    <li>• Specify a primary color with hex code (e.g., #0B74DE)</li>
                    <li>• List sections you want: hero, features, pricing, contact, etc.</li>
                    <li>• Set a tone: professional, casual, playful, confident, formal</li>
                    <li>• Choose a theme: light, dark, amazon-like, corporate</li>
                </ul>
            </div>
        </div>
    )
}
