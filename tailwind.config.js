// Purpose: Tailwind CSS configuration with Amazon-like design system and custom theme
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
                // Amazon-inspired color palette
                amazon: {
                    orange: '#FF9900',
                    'orange-hover': '#FFAD33',
                    dark: '#131921',
                    'dark-secondary': '#232F3E',
                    light: '#EAEDED',
                    blue: '#007185',
                    'blue-hover': '#C7F4FD',
                },
                // Primary brand colors
                primary: {
                    50: '#E6F3FB',
                    100: '#CCE7F7',
                    200: '#99CFEF',
                    300: '#66B7E7',
                    400: '#339FDF',
                    500: '#0B74DE',
                    600: '#095DB2',
                    700: '#074685',
                    800: '#042F59',
                    900: '#02172C',
                },
                // Semantic colors
                success: '#067D62',
                warning: '#F7CA18',
                error: '#D13212',
                info: '#0073BB',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                'display-sm': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
            },
            boxShadow: {
                'amazon': '0 2px 5px 0 rgba(213,217,217,.5)',
                'amazon-hover': '0 0 3px 2px rgba(228,121,17,.5)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 40px rgba(11, 116, 222, 0.3)',
                'glow-orange': '0 0 40px rgba(255, 153, 0, 0.3)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'amazon-gradient': 'linear-gradient(to bottom, #232F3E, #131921)',
                'hero-gradient': 'linear-gradient(135deg, #0B74DE 0%, #074685 50%, #042F59 100%)',
                'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'glow-pulse': 'glowPulse 2s infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(11, 116, 222, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(11, 116, 222, 0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
        },
    },
    plugins: [],
}
