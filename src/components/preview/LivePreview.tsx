// Purpose: Vercel-inspired Live Preview component
import { useState, useMemo } from 'react'
import {
    XMarkIcon,
    ComputerDesktopIcon,
    DeviceTabletIcon,
    DevicePhoneMobileIcon,
    ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'
import { GeneratedOutput } from '../../types'
import { generatePreviewHTML } from '../../utils/preview'

interface LivePreviewProps {
    output: GeneratedOutput;
    onClose: () => void;
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile'

const viewportSizes: Record<ViewportSize, { width: string; label: string }> = {
    desktop: { width: '100%', label: 'Desktop' },
    tablet: { width: '768px', label: 'Tablet' },
    mobile: { width: '375px', label: 'Mobile' },
}

export default function LivePreview({ output, onClose }: LivePreviewProps) {
    const [viewport, setViewport] = useState<ViewportSize>('desktop')
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Generate preview HTML from the output
    const previewHTML = useMemo(() => {
        return generatePreviewHTML(output)
    }, [output])

    const currentViewport = viewportSizes[viewport]

    return (
        <div className={`
            ${isFullscreen
                ? 'fixed inset-0 z-50 bg-geist-50 dark:bg-geist-950 p-4'
                : 'card overflow-hidden'
            }
        `}>
            {/* Preview Header */}
            <div className="flex items-center justify-between p-3 
                            border-b border-geist-200 dark:border-geist-800">
                <div className="flex items-center gap-2">
                    <h4 className="font-medium text-geist-900 dark:text-white text-sm">
                        Preview
                    </h4>
                    <span className="badge-default text-xs">
                        {currentViewport.label}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {/* Viewport Toggles */}
                    <div className="flex items-center p-0.5 rounded-lg 
                                    bg-geist-100 dark:bg-geist-800">
                        <button
                            onClick={() => setViewport('desktop')}
                            className={`p-1.5 rounded-md transition-colors ${viewport === 'desktop'
                                    ? 'bg-white dark:bg-geist-700 shadow-sm'
                                    : 'hover:text-geist-900 dark:hover:text-white'
                                }`}
                            title="Desktop"
                        >
                            <ComputerDesktopIcon className="w-4 h-4 text-geist-500" />
                        </button>
                        <button
                            onClick={() => setViewport('tablet')}
                            className={`p-1.5 rounded-md transition-colors ${viewport === 'tablet'
                                    ? 'bg-white dark:bg-geist-700 shadow-sm'
                                    : 'hover:text-geist-900 dark:hover:text-white'
                                }`}
                            title="Tablet"
                        >
                            <DeviceTabletIcon className="w-4 h-4 text-geist-500" />
                        </button>
                        <button
                            onClick={() => setViewport('mobile')}
                            className={`p-1.5 rounded-md transition-colors ${viewport === 'mobile'
                                    ? 'bg-white dark:bg-geist-700 shadow-sm'
                                    : 'hover:text-geist-900 dark:hover:text-white'
                                }`}
                            title="Mobile"
                        >
                            <DevicePhoneMobileIcon className="w-4 h-4 text-geist-500" />
                        </button>
                    </div>

                    <div className="w-px h-5 bg-geist-200 dark:bg-geist-700 mx-1" />

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1.5 rounded-lg hover:bg-geist-100 dark:hover:bg-geist-800 
                                   transition-colors"
                        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                        <ArrowsPointingOutIcon className="w-4 h-4 text-geist-500" />
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-geist-100 dark:hover:bg-geist-800 
                                   transition-colors"
                        title="Close"
                    >
                        <XMarkIcon className="w-4 h-4 text-geist-500" />
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="bg-geist-100 dark:bg-geist-900 p-4 overflow-auto" style={{
                height: isFullscreen ? 'calc(100vh - 120px)' : '420px'
            }}>
                <div
                    className="mx-auto bg-white dark:bg-geist-950 rounded-lg 
                               shadow-vercel-lg dark:shadow-none 
                               border border-geist-200 dark:border-geist-800
                               overflow-hidden transition-all duration-300"
                    style={{
                        width: currentViewport.width,
                        maxWidth: '100%',
                    }}
                >
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 px-3 py-2.5 
                                    bg-geist-50 dark:bg-geist-900 
                                    border-b border-geist-200 dark:border-geist-800">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-geist-300 dark:bg-geist-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-geist-300 dark:bg-geist-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-geist-300 dark:bg-geist-700" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="max-w-[200px] mx-auto px-3 py-1 rounded-md 
                                            bg-white dark:bg-geist-800 
                                            border border-geist-200 dark:border-geist-700
                                            text-[10px] text-geist-400 text-center truncate font-mono">
                                {output.siteName.toLowerCase().replace(/\s+/g, '-')}.vercel.app
                            </div>
                        </div>
                    </div>

                    {/* Iframe Content */}
                    <iframe
                        srcDoc={previewHTML}
                        className="w-full border-0"
                        style={{
                            height: isFullscreen ? 'calc(100vh - 200px)' : '360px'
                        }}
                        title={`${output.siteName} Preview`}
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            </div>

            {/* Preview Footer */}
            <div className="flex items-center justify-between p-2.5 
                            border-t border-geist-200 dark:border-geist-800 
                            bg-white dark:bg-geist-950">
                <p className="text-xs text-geist-400">
                    Simulated preview. Download for full functionality.
                </p>
            </div>
        </div>
    )
}
