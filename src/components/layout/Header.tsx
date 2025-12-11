// Purpose: Vercel-inspired header with Apple aesthetics
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

export default function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { label: 'Generator', href: '#generator' },
        { label: 'Templates', href: '#templates' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
    ]

    // Smooth scroll handler
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const targetId = href.replace('#', '')
        const element = document.getElementById(targetId)
        if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center gap-2.5 group"
                    >
                        {/* Vercel-style logo mark */}
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 bg-geist-900 dark:bg-white rounded-lg transform rotate-45 group-hover:rotate-[50deg] transition-transform duration-300" />
                            <div className="absolute inset-[3px] bg-white dark:bg-black rounded-[5px] transform rotate-45" />
                            <svg
                                className="absolute inset-0 w-full h-full text-geist-900 dark:text-white"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L2 19.5h20L12 2z" />
                            </svg>
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-geist-900 dark:text-white">
                            ProbFixora
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="px-3.5 py-2 text-sm font-medium text-geist-600 dark:text-geist-400 
                                           hover:text-geist-900 dark:hover:text-white 
                                           rounded-lg hover:bg-geist-50 dark:hover:bg-geist-900 
                                           transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={onToggleTheme}
                            className="p-2 rounded-lg text-geist-500 dark:text-geist-400 
                                       hover:text-geist-900 dark:hover:text-white
                                       hover:bg-geist-100 dark:hover:bg-geist-800 
                                       transition-colors duration-200"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <SunIcon className="w-5 h-5" />
                            ) : (
                                <MoonIcon className="w-5 h-5" />
                            )}
                        </button>

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/Nikhiltiwaridotin/ProbFixora"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex p-2 rounded-lg text-geist-500 dark:text-geist-400 
                                       hover:text-geist-900 dark:hover:text-white
                                       hover:bg-geist-100 dark:hover:bg-geist-800 
                                       transition-colors duration-200"
                            aria-label="View on GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                        </a>

                        {/* CTA Button */}
                        <a
                            href="#generator"
                            onClick={(e) => handleNavClick(e, '#generator')}
                            className="hidden sm:inline-flex btn-md btn-primary"
                        >
                            Get Started
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-geist-600 dark:text-geist-400 
                                       hover:bg-geist-100 dark:hover:bg-geist-800
                                       transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="w-5 h-5" />
                            ) : (
                                <Bars3Icon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-geist-200 dark:border-geist-800 animate-fade-down">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="px-4 py-3 text-sm font-medium text-geist-600 dark:text-geist-400 
                                               hover:text-geist-900 dark:hover:text-white 
                                               rounded-lg hover:bg-geist-50 dark:hover:bg-geist-900 
                                               transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#generator"
                                onClick={(e) => handleNavClick(e, '#generator')}
                                className="mt-3 btn-md btn-primary text-center"
                            >
                                Get Started
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
