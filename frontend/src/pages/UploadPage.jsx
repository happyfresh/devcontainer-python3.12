import { useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { toast } from '../components/ui/use-toast'
import { uploadImages } from '../lib/api'

function UploadPage() {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files)

        // Filter for image files
        const imageFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image file`)
                return false
            }
            return true
        })

        setSelectedFiles(imageFiles)
    }

    const handleSelectImages = () => {
        fileInputRef.current?.click()
    }

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || isUploading) {
            return
        }

        setIsUploading(true)
        setProgress(0)

        try {
            await uploadImages(selectedFiles, setProgress)

            // Success: show toast and reset
            toast.success(`Successfully uploaded ${selectedFiles.length} file(s)`)

            // Reset state
            setSelectedFiles([])
            setProgress(0)

            // Clear file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            // Error: show failure toast
            const errorMessage = error.response?.data?.detail || "Failed to upload files. Please try again."
            toast.error(errorMessage)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Image Upload</h1>
                    <p className="text-muted-foreground">
                        Select one or more images to upload
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="card bg-card border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Select Images</h2>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            aria-label="Select image files"
                        />

                        {/* Select button */}
                        <div className="mb-4">
                            <Button
                                onClick={handleSelectImages}
                                className="w-full"
                                aria-describedby="file-selection-hint"
                            >
                                Select Images
                            </Button>
                            <p id="file-selection-hint" className="text-sm text-muted-foreground mt-2">
                                Choose one or more image files
                            </p>
                        </div>

                        {/* File list or empty state */}
                        {selectedFiles.length === 0 ? (
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                                <p className="text-muted-foreground">
                                    No images selected
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Click "Select Images" to choose files
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Selected Files ({selectedFiles.length})
                                    </h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {selectedFiles.map((file, index) => (
                                            <div
                                                key={`${file.name}-${index}`}
                                                className="flex justify-between items-center p-3 bg-muted/50 rounded-md"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Upload button */}
                                <Button
                                    onClick={handleUpload}
                                    disabled={selectedFiles.length === 0 || isUploading}
                                    className="w-full"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                </Button>

                                {/* Progress bar (show only when uploading) */}
                                {isUploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="w-full" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage