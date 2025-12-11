// Purpose: Template gallery showing pre-built website templates
import { Template } from '../../types'

interface TemplateGalleryProps {
    onSelect: (prompt: string) => void;
}

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
    const templates: (Template & { prompt: string })[] = [
        {
            id: 'saas-landing',
            name: 'SaaS Landing',
            description: 'Perfect for software products and services',
            category: 'saas',
            sections: ['nav', 'hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'],
            preview: '🚀',
            tags: ['startup', 'tech', 'modern'],
            prompt: "Create a professional SaaS landing page with hero section, 4 feature cards with icons, 3-tier pricing table, customer testimonials, and contact form. Use color #6366F1, tone: professional, theme: dark",
        },
        {
            id: 'portfolio',
            name: 'Creative Portfolio',
            description: 'Showcase your work with style',
            category: 'portfolio',
            sections: ['nav', 'hero', 'gallery', 'about', 'contact', 'footer'],
            preview: '🎨',
            tags: ['creative', 'personal', 'minimal'],
            prompt: "Build a creative portfolio website with animated hero, project gallery with filters, about section, skills showcase, and contact form. Use color #10B981, tone: creative, theme: light",
        },
        {
            id: 'ecommerce',
            name: 'E-commerce Store',
            description: 'Amazon-inspired shopping experience',
            category: 'ecommerce',
            sections: ['nav', 'hero', 'features', 'gallery', 'cta', 'footer'],
            preview: '🛒',
            tags: ['shopping', 'retail', 'amazon'],
            prompt: "Create an e-commerce landing page with product hero, featured products grid, category showcase, deals section, and newsletter signup. Use color #F59E0B, tone: exciting, theme: amazon-like",
        },
        {
            id: 'agency',
            name: 'Digital Agency',
            description: 'Professional agency showcase',
            category: 'agency',
            sections: ['nav', 'hero', 'features', 'gallery', 'team', 'contact', 'footer'],
            preview: '💼',
            tags: ['business', 'corporate', 'services'],
            prompt: "Build a digital agency website with services hero, case studies grid, team section, client testimonials, and contact form. Use color #8B5CF6, tone: professional, theme: corporate",
        },
        {
            id: 'startup',
            name: 'Startup Launch',
            description: 'Launch your next big idea',
            category: 'startup',
            sections: ['nav', 'hero', 'features', 'pricing', 'faq', 'cta', 'footer'],
            preview: '💡',
            tags: ['launch', 'product', 'innovation'],
            prompt: "Create a startup launch page with bold hero, key features, early access pricing, FAQ accordion, and email capture. Use color #EC4899, tone: confident, theme: dark",
        },
        {
            id: 'blog',
            name: 'Blog & Magazine',
            description: 'Content-focused reading experience',
            category: 'blog',
            sections: ['nav', 'hero', 'features', 'gallery', 'cta', 'footer'],
            preview: '📰',
            tags: ['content', 'news', 'articles'],
            prompt: "Build a blog landing page with featured articles hero, category grid, recent posts, newsletter signup, and author profiles. Use color #14B8A6, tone: friendly, theme: light",
        },
    ]

    return (
        <div id="templates" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.prompt)}
                    className="group text-left card-hover p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Preview Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {template.preview}
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                        {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {template.description}
                    </p>

                    {/* Sections Preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {template.sections.slice(0, 5).map((section) => (
                            <span
                                key={section}
                                className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                                {section}
                            </span>
                        ))}
                        {template.sections.length > 5 && (
                            <span className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                +{template.sections.length - 5}
                            </span>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {template.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                        Use this template
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            ))}
        </div>
    )
}
