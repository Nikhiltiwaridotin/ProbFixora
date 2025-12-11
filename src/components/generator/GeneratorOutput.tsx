// Purpose: Display generated output with file tree, commands, and export options
import { useState } from 'react'
import {
    FolderIcon,
    DocumentIcon,
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
        <div className="space-y-6">
            {/* Success Header */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Website Generated Successfully!
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                        {output.siteName} • {Object.keys(output.fileTree).length} files generated
                    </p>
                </div>
            </div>

            {/* Parsed Intent Summary */}
            <div className="card p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Parsed Intent</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Site Name:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {output.parsedIntent.siteName}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Theme:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                            {output.parsedIntent.theme}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Tone:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                            {output.parsedIntent.tone}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Primary Color:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white flex items-center gap-1">
                            <span
                                className="inline-block w-4 h-4 rounded"
                                style={{ backgroundColor: output.parsedIntent.primaryColor }}
                            />
                            {output.parsedIntent.primaryColor}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-500 dark:text-gray-400">Sections:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                            {output.parsedIntent.sections.map(section => (
                                <span
                                    key={section}
                                    className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
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
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Commands</h4>
                <div className="space-y-2">
                    {Object.entries(output.commands).map(([name, command]) => (
                        <div
                            key={name}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                            <div>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                    {name}
                                </span>
                                <code className="block text-sm text-gray-900 dark:text-white font-mono">
                                    {command}
                                </code>
                            </div>
                            <button
                                onClick={() => copyToClipboard(command, name)}
                                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {copiedCommand === name ? (
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                    <ClipboardDocumentIcon className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* File Tree */}
            <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">File Tree</h4>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="btn-primary text-sm py-2"
                    >
                        {isExporting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Exporting...
                            </>
                        ) : (
                            <>
                                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                                Export ZIP
                            </>
                        )}
                    </button>
                </div>

                <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-2 font-mono text-sm">
                        {Object.entries(folderStructure).map(([folder, files]) => (
                            <div key={folder || 'root'}>
                                {folder && (
                                    <button
                                        onClick={() => toggleFolder(folder)}
                                        className="flex items-center gap-1 w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                    >
                                        {expandedFiles.has(folder) ? (
                                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                                        )}
                                        <FolderIcon className="w-4 h-4 text-yellow-500" />
                                        <span className="text-gray-700 dark:text-gray-300">{folder}/</span>
                                    </button>
                                )}

                                {(expandedFiles.has(folder) || !folder) && (
                                    <div className={folder ? 'ml-4' : ''}>
                                        {files.map(filePath => {
                                            const fileName = filePath.split('/').pop()
                                            return (
                                                <button
                                                    key={filePath}
                                                    onClick={() => setSelectedFile(selectedFile === filePath ? null : filePath)}
                                                    className={`flex items-center gap-2 w-full p-1 rounded transition-colors ${selectedFile === filePath
                                                            ? 'bg-primary-100 dark:bg-primary-900/30'
                                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <span>{getFileIcon(filePath)}</span>
                                                    <span className="text-gray-700 dark:text-gray-300 truncate">
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
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {selectedFile}
                            </span>
                            <button
                                onClick={() => copyToClipboard(output.fileTree[selectedFile], 'file')}
                                className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                            >
                                {copiedCommand === 'file' ? (
                                    <>
                                        <CheckCircleIcon className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <ClipboardDocumentIcon className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="code-block max-h-60 overflow-auto">
                            <code>{output.fileTree[selectedFile]}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Deployment Hints */}
            <div className="card p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Deployment</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {output.deploymentHints}
                </p>
                <div className="flex gap-3">
                    <a
                        href="https://vercel.com/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2"
                    >
                        Deploy to Vercel
                    </a>
                    <a
                        href="https://app.netlify.com/start"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2"
                    >
                        Deploy to Netlify
                    </a>
                </div>
            </div>

            {/* Notes */}
            {output.notes && (
                <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                        ⚠️ Notes
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        {output.notes}
                    </p>
                </div>
            )}
        </div>
    )
}
