// Purpose: Vercel-inspired Footer with Apple aesthetics

// Smooth scroll to section handler
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerSections = [
        {
            title: 'Product',
            links: [
                { label: 'Generator', action: () => scrollToSection('generator') },
                { label: 'Templates', action: () => scrollToSection('templates') },
                { label: 'Features', action: () => scrollToSection('features') },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'GitHub', href: 'https://github.com/Nikhiltiwaridotin/ProbFixora', external: true },
                { label: 'Documentation', href: 'https://github.com/Nikhiltiwaridotin/ProbFixora#readme', external: true },
                { label: 'Report Issue', href: 'https://github.com/Nikhiltiwaridotin/ProbFixora/issues', external: true },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About', action: () => scrollToSection('about') },
                { label: 'Contact', href: 'mailto:contact@probfixora.com', external: false },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: 'https://github.com/Nikhiltiwaridotin/ProbFixora/blob/main/PRIVACY.md', external: true },
                { label: 'Terms of Service', href: 'https://github.com/Nikhiltiwaridotin/ProbFixora/blob/main/TERMS.md', external: true },
            ],
        },
    ]

    const socialLinks = [
        {
            name: 'Twitter',
            href: 'https://twitter.com/nikhiltiwari',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: 'https://github.com/Nikhiltiwaridotin/ProbFixora',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/nikhiltiwari',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                                {section.links.map((link: { label: string; action?: () => void; href?: string; external?: boolean }) => (
                                    <li key={link.label}>
                                        {link.action ? (
                                            <button
                                                onClick={link.action}
                                                className="text-sm text-geist-500 dark:text-geist-500 
                                                           hover:text-geist-900 dark:hover:text-white 
                                                           transition-colors duration-200 text-left"
                                            >
                                                {link.label}
                                            </button>
                                        ) : (
                                            <a
                                                href={link.href}
                                                target={link.external ? '_blank' : undefined}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                                className="text-sm text-geist-500 dark:text-geist-500 
                                                           hover:text-geist-900 dark:hover:text-white 
                                                           transition-colors duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        )}
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
