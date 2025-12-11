// Purpose: Main App component with routing and layout
import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import PromptInput from './components/generator/PromptInput'
import TemplateGallery from './components/generator/TemplateGallery'
import GeneratorOutput from './components/generator/GeneratorOutput'
import LivePreview from './components/preview/LivePreview'
import APIStatus from './components/generator/APIStatus'
import Footer from './components/layout/Footer'
import { GeneratorState, GeneratedOutput } from './types'
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
            currentStep: 'Parsing prompt...',
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-amazon-dark dark:to-amazon-dark-secondary transition-colors duration-300">
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
                <section id="generator" className="section bg-white dark:bg-amazon-dark-secondary">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
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
                <section id="templates" className="section bg-gray-50 dark:bg-amazon-dark">
                    <div className="container-custom">
                        <h2 className="heading-lg text-center mb-4">
                            <span className="gradient-text">Start with a Template</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                            Choose from our pre-built templates or customize with your own prompt
                        </p>
                        <TemplateGallery onSelect={handleTemplateSelect} />
                    </div>
                </section>

                {/* Output & Preview Section */}
                {generatorState.output && (
                    <section id="output" className="section bg-white dark:bg-amazon-dark-secondary">
                        <div className="container-custom">
                            <div className="grid lg:grid-cols-2 gap-8">
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
                <section id="features" className="section bg-gradient-to-b from-gray-50 to-white dark:from-amazon-dark dark:to-amazon-dark-secondary">
                    <div className="container-custom">
                        <h2 className="heading-lg text-center mb-4">
                            <span className="gradient-text">Powerful Features</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                            Everything you need to create stunning websites in seconds
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="card-hover p-6 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
                                        <span className="text-2xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="heading-sm mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="section bg-white dark:bg-amazon-dark-secondary">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="heading-lg mb-6">
                                    <span className="gradient-text">About ProbFixora</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                                    ProbFixora is an AI-powered website generator that transforms natural language
                                    prompts into production-ready React applications. Built with modern technologies
                                    like Vite, Tailwind CSS, and TypeScript.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Our mission is to democratize web development by making it accessible to everyone.
                                    Whether you're a seasoned developer or just starting out, ProbFixora helps you
                                    create stunning websites in seconds, not hours.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="text-green-500">✓</span> Open Source
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="text-green-500">✓</span> Free to Use
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="text-green-500">✓</span> No Account Required
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-amazon-orange p-1">
                                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
                                                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">
                                                <span className="gradient-text">Prob</span>
                                                <span className="text-amazon-orange">Fixora</span>
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">AI Website Generator</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-amazon-orange/20 blur-3xl -z-10 rounded-3xl" />
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

// Feature data
const features = [
    {
        icon: '⚡',
        title: 'Instant Generation',
        description: 'Generate complete React + Vite + Tailwind projects in seconds from natural language prompts.',
    },
    {
        icon: '🎨',
        title: 'Beautiful Designs',
        description: 'Amazon-inspired UI with modern aesthetics, gradients, and professional typography.',
    },
    {
        icon: '📦',
        title: 'Export & Deploy',
        description: 'Download as ZIP or deploy directly to Vercel/Netlify with one click.',
    },
    {
        icon: '🖼️',
        title: 'Free Images',
        description: 'Automatic image integration from Unsplash and Pexels APIs.',
    },
    {
        icon: '🎯',
        title: 'Smart Parsing',
        description: 'Intelligent prompt parsing extracts tone, colors, sections, and keywords.',
    },
    {
        icon: '🌙',
        title: 'Theme Support',
        description: 'Light, dark, and corporate themes with automatic detection.',
    },
]

export default App
