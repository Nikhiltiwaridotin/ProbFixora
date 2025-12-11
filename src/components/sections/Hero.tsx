// Purpose: Hero section with headline, description, and CTA
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-amazon-dark-secondary dark:via-amazon-dark dark:to-amazon-dark -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/20 via-transparent to-transparent -z-10 blur-3xl" />

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-amazon-orange/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl animate-float animation-delay-500" />

            <div className="container-custom relative">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 animate-fade-in">
                        <SparklesIcon className="w-4 h-4" />
                        <span>AI-Powered Website Generation</span>
                        <span className="px-2 py-0.5 rounded-full bg-amazon-orange text-amazon-dark text-xs font-bold">
                            NEW
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="heading-xl mb-6 animate-slide-up">
                        <span className="block text-gray-900 dark:text-white">Create Stunning Websites</span>
                        <span className="block gradient-text">In Seconds, Not Hours</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100">
                        Transform your ideas into production-ready React + Vite + Tailwind websites
                        with a single prompt. Beautiful, responsive, and ready to deploy.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
                        <a
                            href="#generator"
                            className="btn-amazon text-lg px-8 py-4 group"
                        >
                            Start Creating Free
                            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#templates"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            View Templates
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in animation-delay-300">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>100% Free to Use</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>No Account Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>React + Vite + Tailwind</span>
                        </div>
                    </div>
                </div>

                {/* Preview Mockup */}
                <div className="mt-16 relative max-w-5xl mx-auto animate-scale-in animation-delay-300">
                    {/* Browser Window Frame */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                        {/* Browser Chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 mx-4">
                                <div className="max-w-md mx-auto px-4 py-1.5 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    probfixora.dev/preview
                                </div>
                            </div>
                        </div>
                        {/* Preview Content */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 flex items-center justify-center">
                            <div className="text-center text-white p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                                    <SparklesIcon className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-display font-bold mb-2">Your Website Preview</h2>
                                <p className="text-white/80">Enter a prompt below to see your generated website here</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-amazon-orange/20 to-primary-500/20 blur-3xl -z-10 rounded-3xl" />
                </div>
            </div>
        </section>
    )
}
