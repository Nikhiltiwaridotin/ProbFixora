// Purpose: Main website generation engine that creates file trees from parsed intents
import { ParsedIntent, GeneratedOutput, FileTree } from '../types'
import { parsePrompt } from './promptParser'
import {
    generatePackageJson,
    generateViteConfig,
    generateTailwindConfig,
    generateMainTsx,
    generateIndexCss,
    generateAppTsx,
    generateIndexHtml,
} from './templates/config'
import {
    generateNavComponent,
    generateHeroComponent,
    generateFeaturesComponent,
    generatePricingComponent,
    generateContactComponent,
    generateCTAComponent,
    generateFooterComponent,
} from './templates/components'

// Progress callback type
type ProgressCallback = (progress: number, step: string) => void

/**
 * Generate a complete website from a natural language prompt
 */
export async function generateWebsite(
    prompt: string,
    onProgress?: ProgressCallback
): Promise<GeneratedOutput> {
    const updateProgress = (progress: number, step: string) => {
        onProgress?.(progress, step)
    }

    try {
        // Step 1: Parse the prompt
        updateProgress(10, 'Parsing your prompt...')
        await simulateDelay(300)
        const parsedIntent = parsePrompt(prompt)

        // Step 2: Generate configuration files
        updateProgress(25, 'Generating project configuration...')
        await simulateDelay(400)
        const configFiles = generateConfigFiles(parsedIntent)

        // Step 3: Generate component files
        updateProgress(50, 'Building React components...')
        await simulateDelay(500)
        const componentFiles = generateComponentFiles(parsedIntent)

        // Step 4: Generate utility files
        updateProgress(70, 'Creating utilities and helpers...')
        await simulateDelay(300)
        const utilityFiles = generateUtilityFiles(parsedIntent)

        // Step 5: Generate documentation
        updateProgress(85, 'Generating documentation...')
        await simulateDelay(200)
        const docFiles = generateDocFiles(parsedIntent)

        // Step 6: Compile file tree
        updateProgress(95, 'Finalizing project structure...')
        await simulateDelay(200)

        const fileTree: FileTree = {
            ...configFiles,
            ...componentFiles,
            ...utilityFiles,
            ...docFiles,
        }

        // Create output
        const output: GeneratedOutput = {
            status: 'success',
            siteName: parsedIntent.siteName,
            templateUsed: detectTemplate(parsedIntent),
            parsedIntent,
            fileTree,
            commands: {
                dev: 'npm install && npm run dev',
                build: 'npm run build',
                exportZip: 'node scripts/export-zip.js',
            },
            downloadUrl: null,
            deploymentHints: `To deploy your site:\n1. Push to GitHub\n2. Connect to Vercel/Netlify\n3. Set environment variables if using APIs\n4. Deploy!`,
            qaChecklist: [
                'Verify all sections render correctly',
                'Test responsive design on mobile',
                'Check color contrast for accessibility',
                'Validate contact form functionality',
                'Test dark mode toggle',
                'Verify all links work',
            ],
            notes: generateNotes(parsedIntent),
            generatedAt: new Date().toISOString(),
        }

        updateProgress(100, 'Complete!')
        return output
    } catch (error) {
        throw new Error(`Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

// Helper to simulate async work
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Detect template type from parsed intent
function detectTemplate(intent: ParsedIntent): string {
    if (intent.sections.includes('pricing') && intent.sections.includes('features')) {
        return 'saas-landing'
    }
    if (intent.sections.includes('gallery')) {
        return 'portfolio'
    }
    if (intent.theme === 'amazon') {
        return 'ecommerce'
    }
    return 'landing-page'
}

// Generate notes about the generation
function generateNotes(intent: ParsedIntent): string {
    const notes: string[] = []

    // Check for API dependencies
    if (intent.sections.includes('contact')) {
        notes.push('Contact form uses Formspree. Add VITE_FORMSPREE_FORM_ID to .env.local for email delivery, otherwise submissions are logged to console.')
    }

    // Image API notes
    notes.push('Images use placeholder gradients by default. Add VITE_UNSPLASH_ACCESS_KEY for real images from Unsplash.')

    return notes.join(' ')
}

// Generate configuration files
function generateConfigFiles(intent: ParsedIntent): FileTree {
    return {
        'package.json': generatePackageJson(intent),
        'vite.config.ts': generateViteConfig(),
        'tailwind.config.js': generateTailwindConfig(intent),
        'postcss.config.js': `// Purpose: PostCSS configuration
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
        'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
        'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,
        '.env.example': `# Purpose: Environment variables template

# Image APIs (Optional)
VITE_UNSPLASH_ACCESS_KEY=
VITE_PEXELS_API_KEY=

# Contact Form (Optional)
VITE_FORMSPREE_FORM_ID=

# AI APIs (Optional - premium)
VITE_HUGGINGFACE_API_KEY=
`,
        '.gitignore': `# Dependencies
node_modules
.pnp
.pnp.js

# Build
dist
dist-ssr
*.local

# IDE
.vscode/*
!.vscode/extensions.json
.idea

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db
`,
        'index.html': generateIndexHtml(intent),
        'src/main.tsx': generateMainTsx(),
        'src/index.css': generateIndexCss(intent),
        'src/App.tsx': generateAppTsx(intent),
    }
}

// Generate component files
function generateComponentFiles(intent: ParsedIntent): FileTree {
    const files: FileTree = {}

    // Always generate Nav
    files['src/components/Nav.tsx'] = generateNavComponent(intent)

    // Generate sections based on parsed intent
    if (intent.sections.includes('hero')) {
        files['src/components/Hero.tsx'] = generateHeroComponent(intent)
    }

    if (intent.sections.includes('features') && intent.features) {
        files['src/components/Features.tsx'] = generateFeaturesComponent(intent)
    }

    if (intent.sections.includes('pricing') && intent.pricingTiers) {
        files['src/components/Pricing.tsx'] = generatePricingComponent(intent)
    }

    if (intent.sections.includes('contact')) {
        files['src/components/Contact.tsx'] = generateContactComponent(intent)
    }

    if (intent.sections.includes('cta')) {
        files['src/components/CTA.tsx'] = generateCTAComponent(intent)
    }

    // Always generate Footer
    files['src/components/Footer.tsx'] = generateFooterComponent(intent)

    return files
}

// Generate utility files
function generateUtilityFiles(intent: ParsedIntent): FileTree {
    return {
        'src/utils/cn.ts': `// Purpose: Classname utility for conditional styling
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}`,
        'src/utils/images.ts': `// Purpose: Image utilities with Unsplash/Pexels fallback to gradients
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface ImageResult {
  url: string
  alt: string
  photographer?: string
  source: 'unsplash' | 'pexels' | 'placeholder'
}

export async function getImage(query: string): Promise<ImageResult> {
  // If Unsplash key is available, fetch from API
  if (UNSPLASH_KEY) {
    try {
      const response = await fetch(
        \`https://api.unsplash.com/photos/random?query=\${encodeURIComponent(query)}&client_id=\${UNSPLASH_KEY}\`
      )
      if (response.ok) {
        const data = await response.json()
        return {
          url: data.urls.regular,
          alt: data.alt_description || query,
          photographer: data.user.name,
          source: 'unsplash',
        }
      }
    } catch (error) {
      console.warn('Unsplash API unavailable, using placeholder')
    }
  }

  // Fallback to gradient placeholder
  return getPlaceholderImage(query)
}

export function getPlaceholderImage(query: string): ImageResult {
  // Generate a unique gradient based on query
  const hash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue1 = hash % 360
  const hue2 = (hue1 + 40) % 360

  return {
    url: \`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:hsl(\${hue1},70%25,50%25)"/><stop offset="100%25" style="stop-color:hsl(\${hue2},70%25,40%25)"/></linearGradient></defs><rect fill="url(%23g)" width="800" height="600"/></svg>\`,
    alt: query,
    source: 'placeholder',
  }
}

export function getGradientBg(seed: string): string {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue1 = hash % 360
  const hue2 = (hue1 + 40) % 360
  return \`linear-gradient(135deg, hsl(\${hue1}, 70%, 50%), hsl(\${hue2}, 70%, 40%))\`
}`,
        'src/hooks/useTheme.ts': `// Purpose: Theme hook for dark/light mode toggle
import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggle = () => setIsDark(prev => !prev)

  return { isDark, toggle }
}`,
    }
}

// Generate documentation files
function generateDocFiles(intent: ParsedIntent): FileTree {
    const readmeContent = `# ${intent.siteName}

> Generated by ProbFixora - AI Website Generator

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
${intent.siteName.toLowerCase().replace(/\s+/g, '-')}/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
\`\`\`

## 🎨 Customization

### Colors
Primary color: \`${intent.primaryColor}\`
Edit \`tailwind.config.js\` to customize the color palette.

### Sections
This site includes:
${intent.sections.map(s => `- ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')}

### Theme
Current theme: \`${intent.theme}\`
Toggle dark mode with the theme button in the header.

## 🔌 API Keys (Optional)

Copy \`.env.example\` to \`.env.local\` and add your keys:

- **VITE_UNSPLASH_ACCESS_KEY**: For real images from Unsplash
- **VITE_FORMSPREE_FORM_ID**: For contact form email delivery

## 🚢 Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Deploy!

### Netlify
1. Push to GitHub
2. Connect to Netlify
3. Deploy!

## 📝 License

MIT License - feel free to use this for any project!

---

Made with ❤️ by [ProbFixora](https://probfixora.dev)
`

    return {
        'README.md': readmeContent,
        'LICENSE': `MIT License

Copyright (c) ${new Date().getFullYear()} ${intent.siteName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
        'CODE_OF_CONDUCT.md': `# Code of Conduct

## Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported.
All complaints will be reviewed and investigated.
`,
        '.github/workflows/ci.yml': `# Purpose: GitHub Actions CI workflow
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Test
        run: npm run test --if-present
`,
        'scripts/export-zip.js': `// Purpose: Export project as ZIP file
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const projectName = '${intent.siteName.toLowerCase().replace(/\s+/g, '-')}';
const outputPath = path.join(__dirname, '..', \`\${projectName}.zip\`);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(\`✅ Exported \${archive.pointer()} bytes to \${projectName}.zip\`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add files
archive.glob('**/*', {
  cwd: path.join(__dirname, '..'),
  ignore: ['node_modules/**', '*.zip', '.git/**'],
});

archive.finalize();
`,
    }
}
