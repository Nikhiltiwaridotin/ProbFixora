// Purpose: Main App component - Vercel-inspired with Apple aesthetics
import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import PromptInput from './components/generator/PromptInput'
import TemplateGallery from './components/generator/TemplateGallery'
import GeneratorOutput from './components/generator/GeneratorOutput'
import LivePreview from './components/preview/LivePreview'
import APIStatus from './components/generator/APIStatus'
import Footer from './components/layout/Footer'
import { GeneratorState } from './types'
import { generateWebsite } from './utils/generator'

function App() {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    })

    // Generator state
    const [generatorState, setGeneratorState] = useState<GeneratorState>({
        prompt: '',
        isGenerating: false,
        progress: 0,
        currentStep: '',
        output: null,
        error: null,
    })

    // Show preview panel
    const [showPreview, setShowPreview] = useState(false)

    // Apply dark mode class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    // Handle prompt submission
    const handleGenerate = async (prompt: string) => {
        setGeneratorState({
            prompt,
            isGenerating: true,
            progress: 0,
            currentStep: 'Analyzing prompt...',
            output: null,
            error: null,
        })

        try {
            const output = await generateWebsite(prompt, (progress, step) => {
                setGeneratorState(prev => ({
                    ...prev,
                    progress,
                    currentStep: step,
                }))
            })

            setGeneratorState(prev => ({
                ...prev,
                isGenerating: false,
                progress: 100,
                currentStep: 'Complete!',
                output,
            }))

            setShowPreview(true)
        } catch (error) {
            setGeneratorState(prev => ({
                ...prev,
                isGenerating: false,
                error: error instanceof Error ? error.message : 'Generation failed',
            }))
        }
    }

    // Handle template selection
    const handleTemplateSelect = (templatePrompt: string) => {
        setGeneratorState(prev => ({
            ...prev,
            prompt: templatePrompt,
        }))
    }

    // Feature data - Vercel-style minimal
    const features = [
        {
            icon: '⚡',
            title: 'Instant Generation',
            description: 'Generate complete React + Vite + Tailwind projects in seconds.',
        },
        {
            icon: '🎨',
            title: 'Beautiful Design',
            description: 'Modern UI with professional typography and subtle animations.',
        },
        {
            icon: '📦',
            title: 'Export & Deploy',
            description: 'Download as ZIP or deploy directly to Vercel with one click.',
        },
        {
            icon: '🖼️',
            title: 'Free Images',
            description: 'Automatic image integration from Unsplash and Pexels.',
        },
        {
            icon: '🎯',
            title: 'Smart Parsing',
            description: 'Intelligent prompt parsing extracts tone, colors, and sections.',
        },
        {
            icon: '🌙',
            title: 'Theme Support',
            description: 'Light and dark themes with automatic system detection.',
        },
    ]

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {/* Header */}
            <Header
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            />

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero />

                {/* Prompt Input Section */}
                <section id="generator" className="section bg-geist-50 dark:bg-geist-950">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            <PromptInput
                                value={generatorState.prompt}
                                onChange={(prompt) => setGeneratorState(prev => ({ ...prev, prompt }))}
                                onGenerate={handleGenerate}
                                isGenerating={generatorState.isGenerating}
                                progress={generatorState.progress}
                                currentStep={generatorState.currentStep}
                            />

                            {/* API Status Panel */}
                            <APIStatus className="mt-8" />
                        </div>
                    </div>
                </section>

                {/* Template Gallery */}
                <section id="templates" className="section bg-white dark:bg-black">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="heading-lg text-geist-900 dark:text-white mb-4">
                                Start with a template
                            </h2>
                            <p className="text-geist-500 dark:text-geist-400 max-w-lg mx-auto">
                                Choose a pre-built template or describe your own custom design.
                            </p>
                        </div>
                        <TemplateGallery onSelect={handleTemplateSelect} />
                    </div>
                </section>

                {/* Output & Preview Section */}
                {generatorState.output && (
                    <section id="output" className="section bg-geist-50 dark:bg-geist-950">
                        <div className="container-custom">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Generated Output */}
                                <GeneratorOutput output={generatorState.output} />

                                {/* Live Preview */}
                                {showPreview && (
                                    <LivePreview
                                        output={generatorState.output}
                                        onClose={() => setShowPreview(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Features Section */}
                <section id="features" className="section bg-white dark:bg-black">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="heading-lg text-geist-900 dark:text-white mb-4">
                                Powerful features
                            </h2>
                            <p className="text-geist-500 dark:text-geist-400 max-w-lg mx-auto">
                                Everything you need to create stunning websites in seconds.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="card-hover p-5 animate-fade-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-geist-100 dark:bg-geist-800 
                                                    flex items-center justify-center text-xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold text-geist-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-geist-500 dark:text-geist-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="section bg-geist-50 dark:bg-geist-950">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="heading-lg text-geist-900 dark:text-white mb-6">
                                About ProbFixora
                            </h2>
                            <p className="text-lg text-geist-500 dark:text-geist-400 mb-6 leading-relaxed">
                                ProbFixora is an AI-powered website generator that transforms natural language
                                prompts into production-ready React applications. Built with modern technologies
                                like Vite, Tailwind CSS, and TypeScript.
                            </p>
                            <p className="text-geist-500 dark:text-geist-400 mb-8">
                                Our mission is to democratize web development by making it accessible to everyone.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-geist-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Open Source
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Free to Use
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    No Account Required
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default App
