// Purpose: Tailwind CSS configuration - Vercel-inspired with Apple aesthetics
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Vercel-inspired color palette
                geist: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
                // Accent colors
                accent: {
                    cyan: '#00d4ff',
                    blue: '#0070f3',
                    purple: '#7928ca',
                    pink: '#ff0080',
                    orange: '#f5a623',
                    green: '#00b894',
                    red: '#ff4757',
                },
                // Semantic colors for Vercel style
                success: '#00b894',
                warning: '#f5a623',
                error: '#ff4757',
                info: '#0070f3',
            },
            fontFamily: {
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif'
                ],
                display: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'system-ui',
                    'Segoe UI',
                    'sans-serif'
                ],
                mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                // Apple-style typography scale
                'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
                'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
                'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
                '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],
                '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.025em' }],
                '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.025em' }],
                '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.03em' }],
            },
            boxShadow: {
                'vercel': '0 0 0 1px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)',
                'vercel-hover': '0 0 0 1px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.08)',
                'vercel-lg': '0 0 0 1px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.12)',
                'vercel-dark': '0 0 0 1px rgba(255,255,255,.08), 0 1px 2px rgba(0,0,0,.4)',
                'vercel-dark-hover': '0 0 0 1px rgba(255,255,255,.12), 0 4px 8px rgba(0,0,0,.4)',
                'glow-sm': '0 0 10px rgba(0, 112, 243, 0.2)',
                'glow': '0 0 20px rgba(0, 112, 243, 0.3)',
                'glow-lg': '0 0 40px rgba(0, 112, 243, 0.4)',
                'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'vercel-gradient': 'linear-gradient(180deg, #000 0%, #111 100%)',
                'vercel-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                'apple-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 112, 243, 0.15), transparent)',
                'hero-glow-dark': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 112, 243, 0.25), transparent)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-down': 'fadeDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'gradient': 'gradient 8s ease infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeDown: {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.96)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(16px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 112, 243, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 112, 243, 0.4)' },
                },
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
            },
            transitionTimingFunction: {
                'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}
