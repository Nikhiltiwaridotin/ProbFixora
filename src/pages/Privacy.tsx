// Purpose: Privacy Policy page with consistent Vercel-style design
export default function Privacy() {
    return (
        <main className="pt-24 pb-16">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="heading-lg text-geist-900 dark:text-white mb-3">Privacy Policy</h1>
                        <p className="text-geist-500 dark:text-geist-400">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">1</span>
                                Introduction
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                Welcome to ProbFixora. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy explains how we collect, use, and safeguard your information when you use our
                                AI-powered website generator service.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">2</span>
                                Information We Collect
                            </h2>
                            <ul className="space-y-3 text-geist-600 dark:text-geist-300">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span><strong className="text-geist-900 dark:text-white">Prompts:</strong> The website descriptions you enter are processed by OpenAI to generate websites.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span><strong className="text-geist-900 dark:text-white">Usage Data:</strong> We may collect anonymous usage statistics to improve our service.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span><strong className="text-geist-900 dark:text-white">API Keys:</strong> Stored locally in your browser and never sent to our servers.</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">3</span>
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-3 text-geist-600 dark:text-geist-300">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>To generate websites based on your prompts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>To improve our AI models and user experience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>To provide customer support</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">4</span>
                                Data Security
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                We implement industry-standard security measures to protect your data. Your prompts are processed
                                in real-time and are not stored on our servers. Generated website code is stored locally in your
                                browser's localStorage.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">5</span>
                                Third-Party Services
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                We use OpenAI's API to power our website generation. Your prompts are sent to OpenAI for processing.
                                Please review <a href="https://openai.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">OpenAI's Privacy Policy</a> for information on how they handle data.
                            </p>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">6</span>
                                Your Rights
                            </h2>
                            <ul className="space-y-3 text-geist-600 dark:text-geist-300">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>Access the data we hold about you</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>Request deletion of your data</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                    <span>Opt-out of analytics tracking</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-geist-50 dark:bg-geist-900 rounded-xl p-6 border border-geist-200 dark:border-geist-800">
                            <h2 className="text-xl font-semibold text-geist-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">7</span>
                                Contact Us
                            </h2>
                            <p className="text-geist-600 dark:text-geist-300 leading-relaxed">
                                If you have questions about this privacy policy, please contact us at
                                <a href="mailto:contact@probfixora.com" className="text-primary hover:underline ml-1">contact@probfixora.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
