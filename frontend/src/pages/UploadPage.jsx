import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { toast } from '../components/ui/use-toast'
import { uploadImages } from '../lib/api'

function UploadPage() {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
    const [filePreviews, setFilePreviews] = useState({})
    const fileInputRef = useRef(null)

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const processFiles = (files) => {
        const fileList = Array.from(files)

        // Filter for image files
        const imageFiles = fileList.filter(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image file`)
                return false
            }
            return true
        })

        // Generate previews for images
        const previews = {}
        imageFiles.forEach(file => {
            const url = URL.createObjectURL(file)
            previews[`${file.name}-${file.size}`] = url
        })

        setSelectedFiles(imageFiles)
        setFilePreviews(prev => {
            // Clean up old previews
            Object.values(prev).forEach(url => URL.revokeObjectURL(url))
            return previews
        })
    }

    // Cleanup previews on unmount
    useEffect(() => {
        return () => {
            Object.values(filePreviews).forEach(url => URL.revokeObjectURL(url))
        }
    }, [filePreviews])

    const handleFileSelect = (event) => {
        processFiles(event.target.files)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(false)

        const files = event.dataTransfer.files
        processFiles(files)
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

            // Clean up previews
            Object.values(filePreviews).forEach(url => URL.revokeObjectURL(url))

            // Reset state
            setSelectedFiles([])
            setFilePreviews({})
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
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Image Upload</h1>
                    <p className="text-muted-foreground text-lg">
                        Select one or more images to upload
                    </p>
                </div>

                <div className="bg-card border rounded-xl shadow-lg p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold mb-6 text-center">Select Images</h2>

                    <h2 className="text-xl font-semibold mb-6 text-center">Select Images</h2>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        aria-label="Select image files to upload"
                        id="file-input"
                    />

                    {/* Select button */}
                    <div className="mb-6">
                        <Button
                            onClick={handleSelectImages}
                            className="w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            aria-describedby="file-selection-hint"
                            type="button"
                        >
                            Select Images
                        </Button>
                        <p id="file-selection-hint" className="text-sm text-muted-foreground mt-2 text-center">
                            Choose one or more image files (JPG, PNG, GIF, etc.)
                        </p>
                    </div>

                    {/* File list or empty state */}
                    {selectedFiles.length === 0 ? (
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted-foreground/25'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <p className="text-muted-foreground">
                                {isDragOver ? 'Drop images here' : 'No images selected'}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Click "Select Images" or drag and drop files here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Selected Files ({selectedFiles.length})
                                </h3>
                                <div
                                    className="space-y-2 max-h-60 overflow-y-auto"
                                    role="list"
                                    aria-label={`${selectedFiles.length} selected files`}
                                >
                                    {selectedFiles.map((file, index) => {
                                        const fileKey = `${file.name}-${file.size}`
                                        const previewUrl = filePreviews[fileKey]

                                        return (
                                            <div
                                                key={`${file.name}-${index}`}
                                                className="flex items-center gap-3 p-3 bg-muted/50 rounded-md"
                                                role="listitem"
                                            >
                                                {previewUrl && (
                                                    <img
                                                        src={previewUrl}
                                                        alt={`Preview of ${file.name}`}
                                                        className="w-12 h-12 object-cover rounded border"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Upload button */}
                            <Button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0 || isUploading}
                                className="w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                type="button"
                                aria-describedby={isUploading ? "upload-progress" : undefined}
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </Button>

                            {/* Progress bar (show only when uploading) */}
                            {isUploading && (
                                <div className="space-y-2" id="upload-progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
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
    )
}

export default UploadPage