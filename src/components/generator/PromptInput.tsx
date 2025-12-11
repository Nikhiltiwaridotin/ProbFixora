// Purpose: Vercel-inspired prompt input with Apple aesthetics
import { useState } from 'react'
import { SparklesIcon, ArrowUpIcon, LightBulbIcon } from '@heroicons/react/24/outline'
import { enhancePrompt, isOpenAIAvailable } from '../../utils/openai'

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
    const [isEnhancing, setIsEnhancing] = useState(false)

    const examplePrompts = [
        {
            title: 'SaaS Landing',
            description: 'Professional product page',
            prompt: "Create a professional landing page for 'CloudSync Pro' — a cloud storage SaaS, color #0070f3, include hero, features (4), pricing, testimonials, contact form",
        },
        {
            title: 'Portfolio',
            description: 'Creative showcase',
            prompt: "Build a minimalist portfolio for 'Alex Designer' — UI/UX designer, color #00b894, include hero, projects gallery, about, skills, contact",
        },
        {
            title: 'Startup',
            description: 'Launch page',
            prompt: "Create a startup page for 'InnovateTech AI' — AI developer tools, color #7928ca, include hero, features (3), pricing, team, FAQ",
        },
        {
            title: 'E-commerce',
            description: 'Product store',
            prompt: "Create an e-commerce landing for 'TechGadgets' — electronics store, color #f5a623, include hero, featured products, categories, deals, newsletter",
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

    const handleEnhancePrompt = async () => {
        if (!value.trim() || isEnhancing || isGenerating) return

        setIsEnhancing(true)
        const result = await enhancePrompt(value)
        if (result.success) {
            onChange(result.enhancedPrompt)
        }
        setIsEnhancing(false)
    }

    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="heading-lg text-geist-900 dark:text-white mb-4">
                    Describe your website
                </h2>
                <p className="text-geist-500 dark:text-geist-400 max-w-lg mx-auto">
                    Tell us what you want to build. Be specific about colors, sections, and style.
                </p>
            </div>

            {/* Main Input Form - Vercel terminal style */}
            <form onSubmit={handleSubmit} className="relative">
                <div
                    className={`
                        relative rounded-xl transition-all duration-300
                        ${isFocused ? 'ring-2 ring-accent-blue/20' : ''}
                        ${isGenerating ? 'opacity-75' : ''}
                    `}
                >
                    {/* Textarea */}
                    <div className="relative bg-geist-50 dark:bg-geist-900 
                                    border border-geist-200 dark:border-geist-800 
                                    rounded-xl overflow-hidden">
                        <textarea
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Create a professional landing page for 'ProbFixora Labs' — AI developer tools, color #0070f3, include hero, features, pricing, contact form..."
                            rows={4}
                            disabled={isGenerating}
                            className="w-full px-5 py-4 bg-transparent
                                       text-geist-900 dark:text-white 
                                       placeholder:text-geist-400 dark:placeholder:text-geist-600
                                       focus:outline-none resize-none text-base"
                        />

                        {/* Bottom Bar */}
                        <div className="flex items-center justify-between px-5 py-3 
                                        border-t border-geist-200 dark:border-geist-800
                                        bg-white dark:bg-geist-950">
                            {/* Character Count */}
                            <div className="text-sm text-geist-400">
                                {value.length} characters
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-2">
                                {/* Enhance Prompt Button */}
                                {isOpenAIAvailable() && value.trim() && !isGenerating && (
                                    <button
                                        type="button"
                                        onClick={handleEnhancePrompt}
                                        disabled={isEnhancing}
                                        className="btn-md bg-gradient-to-r from-purple-500 to-pink-500 
                                                   text-white hover:from-purple-600 hover:to-pink-600
                                                   disabled:opacity-50 transition-all duration-300"
                                    >
                                        {isEnhancing ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span>Enhancing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <LightBulbIcon className="w-4 h-4" />
                                                <span>Enhance</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Generate Button */}
                                <button
                                    type="submit"
                                    disabled={!value.trim() || isGenerating}
                                    className="btn-md btn-primary disabled:opacity-40 group"
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-4 h-4" />
                                            <span>Generate</span>
                                            <ArrowUpIcon className="w-3 h-3 opacity-50" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                {isGenerating && (
                    <div className="mt-6 animate-fade-up">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-geist-600 dark:text-geist-400">
                                {currentStep}
                            </span>
                            <span className="text-sm font-mono text-accent-blue">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full h-1 bg-geist-100 dark:bg-geist-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple 
                                           rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </form>

            {/* Example Prompts */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-geist-400">
                    <span>Try an example:</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {examplePrompts.map((example) => (
                        <button
                            key={example.title}
                            onClick={() => handleExampleClick(example.prompt)}
                            disabled={isGenerating}
                            className="text-left p-4 rounded-xl 
                                       border border-geist-200 dark:border-geist-800 
                                       bg-white dark:bg-geist-900
                                       hover:border-geist-300 dark:hover:border-geist-700 
                                       hover:bg-geist-50 dark:hover:bg-geist-800
                                       transition-all duration-200 
                                       disabled:opacity-50 disabled:cursor-not-allowed 
                                       group"
                        >
                            <div className="font-medium text-geist-900 dark:text-white 
                                            group-hover:text-accent-blue transition-colors mb-1">
                                {example.title}
                            </div>
                            <div className="text-sm text-geist-500 dark:text-geist-500">
                                {example.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tips - Minimal */}
            <div className="p-4 rounded-xl bg-geist-50 dark:bg-geist-900 
                            border border-geist-200 dark:border-geist-800">
                <h4 className="font-medium text-geist-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tips for better results
                </h4>
                <ul className="text-sm text-geist-500 dark:text-geist-400 space-y-1.5">
                    <li className="flex items-start gap-2">
                        <span className="text-geist-300 dark:text-geist-600">•</span>
                        Include a site name in quotes (e.g., 'My Company')
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-geist-300 dark:text-geist-600">•</span>
                        Specify a primary color with hex code (e.g., #0070f3)
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-geist-300 dark:text-geist-600">•</span>
                        List sections: hero, features, pricing, contact, etc.
                    </li>
                </ul>
            </div>
        </div>
    )
}
