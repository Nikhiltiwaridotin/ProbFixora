// Purpose: Terms of Service page with consistent Vercel-style design
export default function Terms() {
    return (
        <main className="pt-24 pb-16">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="heading-lg text-geist-900 dark:text-white mb-3">Terms of Service</h1>
                        <p className="text-geist-500 dark:text-geist-400">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">1</span>
                                Acceptance of Terms
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                By accessing and using ProbFixora ("the Service"), you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">2</span>
                                Description of Service
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                ProbFixora is an AI-powered website generator that creates website code from natural language prompts.
                                The service uses OpenAI's API to generate React and Tailwind CSS code that can be downloaded and used
                                in your projects.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">3</span>
                                User Responsibilities
                            </h2>
                            <ul className="space-y-3 text-geist-600 dark:text-geist-300">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>You must provide your own API keys for AI generation features</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>You are responsible for any costs associated with API usage</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>You must not use the service to generate illegal, harmful, or offensive content</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>You must not attempt to circumvent any security measures</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">4</span>
                                Intellectual Property
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                The code generated by ProbFixora is yours to use. <strong className="text-geist-900 dark:text-white">You own full rights</strong> to any websites you create
                                using our service. However, the ProbFixora platform, branding, and underlying technology remain
                                our intellectual property.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">5</span>
                                Disclaimer of Warranties
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed mb-4">
                                The service is provided "as is" without warranties of any kind. We do not guarantee that:
                            </p>
                            <ul className="space-y-3 text-geist-600 dark:text-geist-300">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>The service will be uninterrupted or error-free</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>Generated code will be bug-free or suitable for production</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>The service will meet your specific requirements</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">6</span>
                                Third-Party APIs
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                When using third-party APIs (like OpenAI), you must comply with their terms of service.
                                We are not responsible for any issues arising from your use of third-party services.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">7</span>
                                Changes to Terms
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                We reserve the right to modify these terms at any time. Continued use of the service after
                                changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">8</span>
                                Contact
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                For questions about these terms, please contact us at
                                <a href="mailto:contact@probfixora.com" className="text-primary hover:underline ml-1">contact@probfixora.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
