// Purpose: Export utilities for ZIP download functionality
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { FileTree } from '../types'

/**
 * Export the generated file tree as a downloadable ZIP file
 */
export async function exportToZip(fileTree: FileTree, siteName: string): Promise<void> {
    const zip = new JSZip()

    // Add all files to the ZIP
    for (const [path, content] of Object.entries(fileTree)) {
        zip.file(path, content)
    }

    // Generate the ZIP blob
    const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 },
    })

    // Trigger download
    const fileName = `${siteName.toLowerCase().replace(/\s+/g, '-')}.zip`
    saveAs(blob, fileName)
}

/**
 * Generate a data URL for preview of the file tree structure
 */
export function generateFileTreePreview(fileTree: FileTree): string {
    const lines: string[] = []
    const paths = Object.keys(fileTree).sort()

    // Build tree structure
    const buildTree = (items: string[], prefix = ''): string[] => {
        const result: string[] = []
        const groups: Record<string, string[]> = {}
        const files: string[] = []

        items.forEach(item => {
            const parts = item.split('/')
            if (parts.length === 1) {
                files.push(item)
            } else {
                const folder = parts[0]
                if (!groups[folder]) groups[folder] = []
                groups[folder].push(parts.slice(1).join('/'))
            }
        })

        // Add folders
        const folders = Object.keys(groups).sort()
        folders.forEach((folder, i) => {
            const isLast = i === folders.length - 1 && files.length === 0
            result.push(`${prefix}${isLast ? '└──' : '├──'} 📁 ${folder}/`)
            result.push(...buildTree(groups[folder], prefix + (isLast ? '    ' : '│   ')))
        })

        // Add files
        files.sort().forEach((file, i) => {
            const isLast = i === files.length - 1
            const icon = getFileIcon(file)
            result.push(`${prefix}${isLast ? '└──' : '├──'} ${icon} ${file}`)
        })

        return result
    }

    return buildTree(paths).join('\n')
}

/**
 * Get an emoji icon for a file type
 */
function getFileIcon(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase()

    const icons: Record<string, string> = {
        tsx: '⚛️',
        ts: '📘',
        js: '📒',
        jsx: '⚛️',
        json: '📋',
        css: '🎨',
        html: '🌐',
        md: '📝',
        yml: '⚙️',
        yaml: '⚙️',
        env: '🔒',
        gitignore: '🙈',
        svg: '🖼️',
        png: '🖼️',
        jpg: '🖼️',
    }

    return icons[ext || ''] || '📄'
}

/**
 * Calculate the total size of the project in bytes
 */
export function calculateProjectSize(fileTree: FileTree): number {
    return Object.values(fileTree).reduce((total, content) => {
        return total + new Blob([content]).size
    }, 0)
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Generate a shareable JSON output of the project
 */
export function generateJsonOutput(fileTree: FileTree, siteName: string): string {
    const output = {
        status: 'success',
        siteName,
        generatedAt: new Date().toISOString(),
        fileCount: Object.keys(fileTree).length,
        totalSize: formatBytes(calculateProjectSize(fileTree)),
        fileTree,
    }

    return JSON.stringify(output, null, 2)
}
