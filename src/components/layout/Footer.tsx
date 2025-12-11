// Purpose: Vercel-inspired Footer with Apple aesthetics
export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerSections = [
        {
            title: 'Product',
            links: [
                { label: 'Generator', href: '#generator' },
                { label: 'Templates', href: '#templates' },
                { label: 'Features', href: '#features' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', href: '#docs' },
                { label: 'API', href: '#api' },
                { label: 'Examples', href: '#examples' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About', href: '#about' },
                { label: 'Blog', href: '#blog' },
                { label: 'Careers', href: '#careers' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy', href: '#privacy' },
                { label: 'Terms', href: '#terms' },
            ],
        },
    ]

    const socialLinks = [
        {
            name: 'Twitter',
            href: 'https://twitter.com/probfixora',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: 'https://github.com/probfixora',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
            ),
        },
    ]

    return (
        <footer className="border-t border-geist-200 dark:border-geist-800 bg-geist-50 dark:bg-geist-950">
            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <a href="/" className="flex items-center gap-2.5 mb-4">
                            {/* Logo */}
                            <div className="relative w-7 h-7">
                                <svg
                                    className="w-full h-full text-geist-900 dark:text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2L2 19.5h20L12 2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-geist-900 dark:text-white">
                                ProbFixora
                            </span>
                        </a>
                        <p className="text-sm text-geist-500 dark:text-geist-500 mb-6 max-w-xs">
                            Generate stunning, production-ready websites from natural language prompts.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-geist-400 
                                               hover:text-geist-900 dark:hover:text-white 
                                               hover:bg-geist-100 dark:hover:bg-geist-800 
                                               transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-medium text-geist-900 dark:text-white text-sm mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-geist-500 dark:text-geist-500 
                                                       hover:text-geist-900 dark:hover:text-white 
                                                       transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-geist-200 dark:border-geist-800">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-geist-400">
                            © {currentYear} ProbFixora Labs. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1 text-sm text-geist-400">
                            <span>Built with</span>
                            <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>using AI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
