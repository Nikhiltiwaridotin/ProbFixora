// Purpose: Vercel-inspired Template Gallery with Apple aesthetics
import { Template } from '../../types'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface TemplateGalleryProps {
    onSelect: (prompt: string) => void;
}

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
    const templates: (Template & { prompt: string; gradient: string })[] = [
        {
            id: 'saas-landing',
            name: 'SaaS Landing',
            description: 'Perfect for software products and services',
            category: 'saas',
            sections: ['hero', 'features', 'pricing', 'testimonials', 'cta'],
            preview: '🚀',
            tags: ['startup', 'tech'],
            gradient: 'from-accent-blue to-accent-cyan',
            prompt: "Create a professional SaaS landing page with hero section, 4 feature cards with icons, 3-tier pricing table, customer testimonials, and contact form. Use color #0070f3",
        },
        {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'Showcase your work with style',
            category: 'portfolio',
            sections: ['hero', 'gallery', 'about', 'contact'],
            preview: '🎨',
            tags: ['creative', 'personal'],
            gradient: 'from-accent-green to-accent-cyan',
            prompt: "Build a creative portfolio website with animated hero, project gallery with filters, about section, skills showcase, and contact form. Use color #00b894",
        },
        {
            id: 'ecommerce',
            name: 'E-commerce',
            description: 'Modern shopping experience',
            category: 'ecommerce',
            sections: ['hero', 'products', 'categories', 'deals'],
            preview: '🛒',
            tags: ['shopping', 'retail'],
            gradient: 'from-accent-orange to-accent-pink',
            prompt: "Create an e-commerce landing page with product hero, featured products grid, category showcase, deals section, and newsletter signup. Use color #f5a623",
        },
        {
            id: 'agency',
            name: 'Agency',
            description: 'Professional agency showcase',
            category: 'agency',
            sections: ['hero', 'services', 'portfolio', 'team'],
            preview: '💼',
            tags: ['business', 'services'],
            gradient: 'from-accent-purple to-accent-pink',
            prompt: "Build a digital agency website with services hero, case studies grid, team section, client testimonials, and contact form. Use color #7928ca",
        },
        {
            id: 'startup',
            name: 'Startup',
            description: 'Launch your next idea',
            category: 'startup',
            sections: ['hero', 'features', 'pricing', 'faq'],
            preview: '💡',
            tags: ['launch', 'product'],
            gradient: 'from-accent-pink to-accent-purple',
            prompt: "Create a startup launch page with bold hero, key features, early access pricing, FAQ accordion, and email capture. Use color #ff0080",
        },
        {
            id: 'blog',
            name: 'Blog',
            description: 'Content-focused reading',
            category: 'blog',
            sections: ['hero', 'articles', 'categories', 'newsletter'],
            preview: '📰',
            tags: ['content', 'writing'],
            gradient: 'from-accent-cyan to-accent-blue',
            prompt: "Build a blog landing page with featured articles hero, category grid, recent posts, newsletter signup, and author profiles. Use color #00d4ff",
        },
    ]

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.prompt)}
                    className="group text-left card-hover p-5 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    {/* Icon with gradient background */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} 
                                     flex items-center justify-center text-2xl mb-4 
                                     group-hover:scale-105 transition-transform duration-300`}>
                        {template.preview}
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-geist-900 dark:text-white 
                                   group-hover:text-accent-blue transition-colors mb-1">
                        {template.name}
                    </h3>
                    <p className="text-sm text-geist-500 dark:text-geist-500 mb-4">
                        {template.description}
                    </p>

                    {/* Sections */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {template.sections.slice(0, 4).map((section) => (
                            <span
                                key={section}
                                className="px-2 py-0.5 text-xs rounded-md 
                                           bg-geist-100 dark:bg-geist-800 
                                           text-geist-500 dark:text-geist-400"
                            >
                                {section}
                            </span>
                        ))}
                    </div>

                    {/* Hover indicator */}
                    <div className="flex items-center text-accent-blue text-sm font-medium 
                                    opacity-0 group-hover:opacity-100 
                                    transform translate-x-0 group-hover:translate-x-1 
                                    transition-all duration-200">
                        Use template
                        <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
                    </div>
                </button>
            ))}
        </div>
    )
}
