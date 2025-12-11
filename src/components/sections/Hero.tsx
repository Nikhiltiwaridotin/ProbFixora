// Purpose: Vercel-inspired Hero section with Apple aesthetics
import { ArrowRightIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background - Subtle gradient glow */}
            <div className="absolute inset-0 bg-hero-glow dark:bg-hero-glow-dark -z-10" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="container-custom relative">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                    bg-geist-100 dark:bg-geist-900 
                                    border border-geist-200 dark:border-geist-800
                                    text-sm text-geist-600 dark:text-geist-400 
                                    mb-8 animate-fade-up">
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                        </span>
                        <span>AI-Powered Website Generation</span>
                    </div>

                    {/* Main Heading - Apple-style */}
                    <h1 className="heading-xl mb-6 animate-fade-up animation-delay-100">
                        <span className="block text-geist-900 dark:text-white">
                            Create websites with
                        </span>
                        <span className="block gradient-text-accent bg-[length:200%_auto] animate-gradient">
                            a single prompt.
                        </span>
                    </h1>

                    {/* Subheading - Clean and minimal */}
                    <p className="text-lg md:text-xl text-geist-500 dark:text-geist-400 mb-10 
                                  max-w-xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
                        Transform your ideas into production-ready React websites
                        in seconds. Beautiful, responsive, and ready to deploy.
                    </p>

                    {/* CTA Buttons - Vercel style */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 
                                    animate-fade-up animation-delay-300">
                        <a
                            href="#generator"
                            className="btn-lg btn-primary group w-full sm:w-auto"
                        >
                            Start Building
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                            href="#templates"
                            className="btn-lg btn-secondary w-full sm:w-auto"
                        >
                            <CommandLineIcon className="w-4 h-4" />
                            View Templates
                        </a>
                    </div>

                    {/* Trust Indicators - Minimal */}
                    <div className="mt-14 flex flex-wrap items-center justify-center gap-8 
                                    text-sm text-geist-500 dark:text-geist-400 
                                    animate-fade-up animation-delay-400">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Free to use</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>No account required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Export to Vercel</span>
                        </div>
                    </div>
                </div>

                {/* Preview Mockup - Vercel-style terminal window */}
                <div className="mt-20 relative max-w-4xl mx-auto animate-fade-up animation-delay-500">
                    {/* Terminal Window */}
                    <div className="rounded-xl overflow-hidden border border-geist-200 dark:border-geist-800 
                                    shadow-vercel-lg dark:shadow-none bg-white dark:bg-geist-950">
                        {/* Terminal Chrome */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-geist-50 dark:bg-geist-900 
                                        border-b border-geist-200 dark:border-geist-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-geist-300 dark:bg-geist-700" />
                                <div className="w-3 h-3 rounded-full bg-geist-300 dark:bg-geist-700" />
                                <div className="w-3 h-3 rounded-full bg-geist-300 dark:bg-geist-700" />
                            </div>
                            <div className="flex-1">
                                <div className="max-w-sm mx-auto px-4 py-1.5 rounded-md 
                                                bg-white dark:bg-geist-950 
                                                border border-geist-200 dark:border-geist-800
                                                text-xs text-geist-500 dark:text-geist-500 text-center 
                                                font-mono">
                                    probfixora.dev
                                </div>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="bg-geist-950 p-6 min-h-[200px] font-mono text-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-geist-500 select-none">$</span>
                                <div>
                                    <span className="text-geist-300">probfixora generate</span>
                                    <span className="text-accent-cyan ml-2">"Create a modern SaaS landing page"</span>
                                </div>
                            </div>
                            <div className="mt-4 text-geist-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    <span>Analyzing prompt...</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <svg className="w-4 h-4 text-success animate-pulse animation-delay-200" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    <span>Generating React components...</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <svg className="w-4 h-4 text-success animate-pulse animation-delay-400" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    <span>Styling with Tailwind CSS...</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-geist-800">
                                <span className="text-success">✓</span>
                                <span className="text-geist-300 ml-2">Website generated successfully!</span>
                                <span className="text-geist-500 ml-2">Ready to deploy →</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-pink/10 
                                    blur-3xl -z-10 rounded-3xl opacity-50" />
                </div>
            </div>
        </section>
    )
}
