/// <reference types="vite/client" />

// Purpose: Vite environment types for TypeScript

interface ImportMetaEnv {
    readonly VITE_UNSPLASH_ACCESS_KEY?: string
    readonly VITE_PEXELS_API_KEY?: string
    readonly VITE_FORMSPREE_FORM_ID?: string
    readonly VITE_HUGGINGFACE_API_KEY?: string
    readonly VITE_OPENAI_API_KEY?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
