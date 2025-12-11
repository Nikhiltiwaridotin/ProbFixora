// Purpose: Vercel-inspired Generator Output with Apple aesthetics
import { useState } from 'react'
import {
    FolderIcon,
    ClipboardDocumentIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { GeneratedOutput } from '../../types'
import { exportToZip } from '../../utils/export'

interface GeneratorOutputProps {
    output: GeneratedOutput;
}

export default function GeneratorOutput({ output }: GeneratorOutputProps) {
    const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set(['src']))
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
    const [isExporting, setIsExporting] = useState(false)

    // Build folder structure from file tree
    const buildFolderStructure = () => {
        const structure: Record<string, string[]> = {}

        Object.keys(output.fileTree).forEach(path => {
            const parts = path.split('/')
            const folder = parts.length > 1 ? parts[0] : ''
            if (!structure[folder]) structure[folder] = []
            structure[folder].push(path)
        })

        return structure
    }

    const folderStructure = buildFolderStructure()

    const toggleFolder = (folder: string) => {
        const newExpanded = new Set(expandedFiles)
        if (newExpanded.has(folder)) {
            newExpanded.delete(folder)
        } else {
            newExpanded.add(folder)
        }
        setExpandedFiles(newExpanded)
    }

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedCommand(id)
        setTimeout(() => setCopiedCommand(null), 2000)
    }

    const handleExport = async () => {
        setIsExporting(true)
        try {
            await exportToZip(output.fileTree, output.siteName)
        } catch (error) {
            console.error('Export failed:', error)
        } finally {
            setIsExporting(false)
        }
    }

    const getFileIcon = (path: string) => {
        if (path.endsWith('.tsx') || path.endsWith('.ts')) return '📘'
        if (path.endsWith('.css')) return '🎨'
        if (path.endsWith('.json')) return '📋'
        if (path.endsWith('.md')) return '📝'
        if (path.endsWith('.html')) return '🌐'
        return '📄'
    }

    return (
        <div className="space-y-5">
            {/* Success Header */}
            <div className="flex items-center gap-3 p-4 rounded-xl 
                            bg-success/5 border border-success/20">
                <CheckCircleIcon className="w-5 h-5 text-success" />
                <div>
                    <h3 className="font-medium text-geist-900 dark:text-white text-sm">
                        Generated successfully
                    </h3>
                    <p className="text-xs text-geist-500">
                        {output.siteName} • {Object.keys(output.fileTree).length} files
                    </p>
                </div>
            </div>

            {/* Parsed Intent Summary */}
            <div className="card p-4">
                <h4 className="font-medium text-geist-900 dark:text-white text-sm mb-3">
                    Configuration
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <span className="text-geist-500">Name</span>
                        <span className="ml-2 font-medium text-geist-900 dark:text-white">
                            {output.parsedIntent.siteName}
                        </span>
                    </div>
                    <div>
                        <span className="text-geist-500">Theme</span>
                        <span className="ml-2 font-medium text-geist-900 dark:text-white capitalize">
                            {output.parsedIntent.theme}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-geist-500">Color</span>
                        <span className="ml-2 font-medium text-geist-900 dark:text-white flex items-center gap-1.5">
                            <span
                                className="inline-block w-3 h-3 rounded"
                                style={{ backgroundColor: output.parsedIntent.primaryColor }}
                            />
                            {output.parsedIntent.primaryColor}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-geist-500">Sections</span>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                            {output.parsedIntent.sections.map(section => (
                                <span
                                    key={section}
                                    className="px-2 py-0.5 text-xs rounded-md 
                                               bg-geist-100 dark:bg-geist-800 
                                               text-geist-600 dark:text-geist-400"
                                >
                                    {section}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Commands */}
            <div className="card p-4">
                <h4 className="font-medium text-geist-900 dark:text-white text-sm mb-3">
                    Commands
                </h4>
                <div className="space-y-2">
                    {Object.entries(output.commands).map(([name, command]) => (
                        <div
                            key={name}
                            className="flex items-center justify-between p-3 rounded-lg 
                                       bg-geist-950 dark:bg-geist-900"
                        >
                            <code className="text-sm text-geist-100 font-mono">
                                {command}
                            </code>
                            <button
                                onClick={() => copyToClipboard(command, name)}
                                className="p-1.5 rounded-md hover:bg-geist-800 transition-colors"
                            >
                                {copiedCommand === name ? (
                                    <CheckCircleIcon className="w-4 h-4 text-success" />
                                ) : (
                                    <ClipboardDocumentIcon className="w-4 h-4 text-geist-400" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* File Tree */}
            <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-geist-900 dark:text-white text-sm">
                        Files
                    </h4>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="btn-sm btn-primary"
                    >
                        {isExporting ? (
                            <>
                                <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Exporting</span>
                            </>
                        ) : (
                            <>
                                <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                                <span>Download ZIP</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="max-h-64 overflow-y-auto rounded-lg border border-geist-200 dark:border-geist-800">
                    <div className="p-2 font-mono text-sm">
                        {Object.entries(folderStructure).map(([folder, files]) => (
                            <div key={folder || 'root'}>
                                {folder && (
                                    <button
                                        onClick={() => toggleFolder(folder)}
                                        className="flex items-center gap-1.5 w-full p-1.5 
                                                   hover:bg-geist-100 dark:hover:bg-geist-800 rounded"
                                    >
                                        {expandedFiles.has(folder) ? (
                                            <ChevronDownIcon className="w-3.5 h-3.5 text-geist-400" />
                                        ) : (
                                            <ChevronRightIcon className="w-3.5 h-3.5 text-geist-400" />
                                        )}
                                        <FolderIcon className="w-4 h-4 text-accent-blue" />
                                        <span className="text-geist-600 dark:text-geist-400">{folder}/</span>
                                    </button>
                                )}

                                {(expandedFiles.has(folder) || !folder) && (
                                    <div className={folder ? 'ml-5' : ''}>
                                        {files.map(filePath => {
                                            const fileName = filePath.split('/').pop()
                                            return (
                                                <button
                                                    key={filePath}
                                                    onClick={() => setSelectedFile(selectedFile === filePath ? null : filePath)}
                                                    className={`flex items-center gap-2 w-full p-1.5 rounded transition-colors ${selectedFile === filePath
                                                            ? 'bg-accent-blue/10 text-accent-blue'
                                                            : 'hover:bg-geist-100 dark:hover:bg-geist-800 text-geist-600 dark:text-geist-400'
                                                        }`}
                                                >
                                                    <span className="text-xs">{getFileIcon(filePath)}</span>
                                                    <span className="truncate text-xs">
                                                        {folder ? fileName : filePath}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected File Preview */}
                {selectedFile && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-geist-600 dark:text-geist-400 font-mono">
                                {selectedFile}
                            </span>
                            <button
                                onClick={() => copyToClipboard(output.fileTree[selectedFile], 'file')}
                                className="text-xs text-accent-blue hover:underline flex items-center gap-1"
                            >
                                {copiedCommand === 'file' ? (
                                    <>
                                        <CheckCircleIcon className="w-3.5 h-3.5" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="code-block max-h-48 overflow-auto text-xs">
                            <code>{output.fileTree[selectedFile]}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Deployment */}
            <div className="card p-4">
                <h4 className="font-medium text-geist-900 dark:text-white text-sm mb-3">
                    Deploy
                </h4>
                <div className="flex gap-2">
                    <a
                        href="https://vercel.com/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sm btn-secondary flex-1 justify-center"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 116 100" fill="currentColor">
                            <path d="M57.5 0L115 100H0L57.5 0z" />
                        </svg>
                        Vercel
                    </a>
                    <a
                        href="https://app.netlify.com/start"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sm btn-secondary flex-1 justify-center"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 40 40" fill="currentColor">
                            <path d="M28.589 14.135l-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 01-.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 01-.063-.006l-.5.386zM9.8 19.676l2.847-2.848 8.7 5.06c.05.03.1.03.15.011l.878-.878-.4-.4-8.5-4.946a.127.127 0 01-.043-.188l.91-.91 3.41 1.983 2.55-1.49-3.41-1.984a.127.127 0 01-.044-.187l.91-.91 3.41 1.984 2.55-1.49-3.41-1.984a.127.127 0 01-.044-.187l.91-.91 3.97 2.31a.126.126 0 01.043.187l-.91.91L17.87 11.48l-2.55 1.49 3.97 2.31a.127.127 0 01.044.188l-.91.91-3.97-2.31-2.55 1.489 3.97 2.31a.127.127 0 01.044.188l-.91.91-4.53-2.635a.083.083 0 01-.035-.116l-.3-.3-2.847 2.848 9.98 9.98 2.848-2.847-8.76-8.76a.127.127 0 01.042-.21zm19.267 1.907l-3.77 1.604a.083.083 0 01-.063-.006l-.023-.013-.014-.006a.11.11 0 01-.028-.093l.773-4.726 3.125 3.24zm-6.665-5.677l-.773 4.726 3.125 3.24-3.77 1.604a.083.083 0 01-.063-.006l-.023-.013-.014-.006a.11.11 0 01-.028-.093l.773-4.726-3.125-3.24 3.77-1.604a.083.083 0 01.063.006l.023.013.014.006c.03.022.04.057.028.093z" />
                        </svg>
                        Netlify
                    </a>
                </div>
            </div>
        </div>
    )
}
