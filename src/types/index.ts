// Purpose: TypeScript type definitions for ProbFixora

// ============================================
// Parsed Intent Types
// ============================================

export interface ParsedIntent {
    siteName: string;
    title: string;
    tone: 'professional' | 'casual' | 'playful' | 'confident' | 'formal' | 'friendly';
    theme: 'light' | 'dark' | 'amazon' | 'corporate';
    primaryColor: string;
    secondaryColor: string;
    sections: SectionType[];
    pages: string[];
    keywords: string[];
    industry?: string;
    targetAudience?: string;
    features?: FeatureItem[];
    pricingTiers?: PricingTier[];
    cta?: {
        primary: string;
        secondary?: string;
    };
}

export type SectionType =
    | 'hero'
    | 'features'
    | 'pricing'
    | 'gallery'
    | 'testimonials'
    | 'contact'
    | 'about'
    | 'cta'
    | 'faq'
    | 'team'
    | 'stats'
    | 'footer'
    | 'nav'
    | 'products'
    | 'articles'
    | 'newsletter'
    | 'services'
    | 'categories'
    | 'deals'
    | 'portfolio';

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface PricingTier {
    id: string;
    name: string;
    price: number;
    period: 'monthly' | 'yearly' | 'one-time';
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
}

// ============================================
// Generated Output Types
// ============================================

export interface GeneratedOutput {
    status: 'success' | 'error' | 'partial';
    siteName: string;
    templateUsed: string;
    parsedIntent: ParsedIntent;
    fileTree: FileTree;
    commands: {
        dev: string;
        build: string;
        exportZip: string;
    };
    downloadUrl: string | null;
    deploymentHints: string;
    qaChecklist: string[];
    notes: string;
    generatedAt: string;
}

export interface FileTree {
    [path: string]: string;
}

// ============================================
// Template Types
// ============================================

export interface Template {
    id: string;
    name: string;
    description: string;
    category: TemplateCategory;
    sections: SectionType[];
    preview: string;
    tags: string[];
}

export type TemplateCategory =
    | 'landing'
    | 'portfolio'
    | 'ecommerce'
    | 'saas'
    | 'blog'
    | 'agency'
    | 'startup';

// ============================================
// Component Props Types
// ============================================

export interface NavProps {
    siteName: string;
    links: NavLink[];
    theme: ParsedIntent['theme'];
    cta?: string;
}

export interface NavLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface HeroProps {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta?: string;
    backgroundImage?: string;
    theme: ParsedIntent['theme'];
}

export interface FeatureGridProps {
    title: string;
    subtitle?: string;
    features: FeatureItem[];
    columns?: 2 | 3 | 4;
    theme: ParsedIntent['theme'];
}

export interface PricingTableProps {
    title: string;
    subtitle?: string;
    tiers: PricingTier[];
    theme: ParsedIntent['theme'];
}

export interface CTAProps {
    title: string;
    subtitle?: string;
    primaryCta: string;
    secondaryCta?: string;
    theme: ParsedIntent['theme'];
}

export interface FooterProps {
    siteName: string;
    links: FooterSection[];
    socialLinks?: SocialLink[];
    theme: ParsedIntent['theme'];
}

export interface FooterSection {
    title: string;
    links: NavLink[];
}

export interface SocialLink {
    platform: 'twitter' | 'facebook' | 'linkedin' | 'github' | 'instagram';
    url: string;
}

export interface ContactFormProps {
    title: string;
    subtitle?: string;
    formspreeId?: string;
    theme: ParsedIntent['theme'];
}

// ============================================
// API Types
// ============================================

export interface ImageSearchResult {
    id: string;
    url: string;
    thumbnailUrl: string;
    alt: string;
    photographer?: string;
    source: 'unsplash' | 'pexels' | 'placeholder';
}

export interface AIGenerationRequest {
    prompt: string;
    model?: string;
    temperature?: number;
}

export interface AIGenerationResponse {
    success: boolean;
    content: string;
    model: string;
    tokens?: number;
}

// ============================================
// UI State Types
// ============================================

export interface GeneratorState {
    prompt: string;
    isGenerating: boolean;
    progress: number;
    currentStep: string;
    output: GeneratedOutput | null;
    error: string | null;
}

export interface ThemeConfig {
    mode: 'light' | 'dark';
    primaryColor: string;
    accentColor: string;
}

// ============================================
// Export/Deploy Types
// ============================================

export interface ExportOptions {
    format: 'zip' | 'github' | 'direct';
    includeNodeModules: boolean;
    minify: boolean;
}

export interface DeploymentConfig {
    platform: 'vercel' | 'netlify' | 'github-pages';
    projectName: string;
    envVars?: Record<string, string>;
}
