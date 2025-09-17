import { useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { toast } from '../components/ui/use-toast'

function UploadPage() {
    const [selectedFiles, setSelectedFiles] = useState([])
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
                toast({
                    title: "Invalid file type",
                    description: `${file.name} is not an image file`,
                    variant: "destructive"
                })
                return false
            }
            return true
        })

        setSelectedFiles(imageFiles)
    }

    const handleSelectImages = () => {
        fileInputRef.current?.click()
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage