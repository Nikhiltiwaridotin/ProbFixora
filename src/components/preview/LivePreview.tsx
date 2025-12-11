// Purpose: Live preview component that renders generated website in an iframe
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
                ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4'
                : 'card overflow-hidden'
            }
    `}>
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                        Live Preview
                    </h4>
                    <span className="badge-primary">
                        {currentViewport.label}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Viewport Toggles */}
                    <div className="flex items-center p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <button
                            onClick={() => setViewport('desktop')}
                            className={`p-2 rounded-md transition-colors ${viewport === 'desktop'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            title="Desktop view"
                        >
                            <ComputerDesktopIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={() => setViewport('tablet')}
                            className={`p-2 rounded-md transition-colors ${viewport === 'tablet'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            title="Tablet view"
                        >
                            <DeviceTabletIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={() => setViewport('mobile')}
                            className={`p-2 rounded-md transition-colors ${viewport === 'mobile'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            title="Mobile view"
                        >
                            <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                        <ArrowsPointingOutIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Close preview"
                    >
                        <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 overflow-auto" style={{
                height: isFullscreen ? 'calc(100vh - 80px)' : '500px'
            }}>
                <div
                    className="mx-auto bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300"
                    style={{
                        width: currentViewport.width,
                        maxWidth: '100%',
                    }}
                >
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="max-w-xs mx-auto px-3 py-1 rounded bg-white dark:bg-gray-600 text-xs text-gray-500 dark:text-gray-300 text-center truncate">
                                {output.siteName.toLowerCase().replace(/\s+/g, '-')}.vercel.app
                            </div>
                        </div>
                    </div>

                    {/* Iframe Content */}
                    <iframe
                        srcDoc={previewHTML}
                        className="w-full border-0"
                        style={{
                            height: isFullscreen ? 'calc(100vh - 160px)' : '450px'
                        }}
                        title={`${output.siteName} Preview`}
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            </div>

            {/* Preview Footer */}
            <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    This is a simulated preview. Download and run the project for full functionality.
                </p>
                <div className="flex gap-2">
                    <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                        Open in new tab
                    </button>
                </div>
            </div>
        </div>
    )
}
