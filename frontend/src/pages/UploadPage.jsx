import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { uploadImages } from '../lib/api';

function UploadPage() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length !== files.length) {
            alert('Only image files are allowed. Non-image files have been ignored.');
        }
        setSelectedFiles(imageFiles);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setUploading(true);
        setProgress(0);
        try {
            await uploadImages(selectedFiles, setProgress);
            toast.success('Upload complete');
            setSelectedFiles([]);
            setProgress(0);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="outline" className="focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            ← Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Main Card Container */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Image Upload</h1>

                    {/* File Selection Section */}
                    <div className="text-center mb-6">
                        <Button
                            onClick={() => fileInputRef.current.click()}
                            aria-label="Select images for upload"
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Select Images
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="sr-only"
                            aria-label="Choose image files"
                            id="file-input"
                        />
                    </div>

                    {/* File List Section */}
                    <div className="mb-6">
                        {selectedFiles.length === 0 ? (
                            <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">No images selected.</p>
                                <p className="text-gray-400 text-sm mt-2">Choose one or more image files to upload</p>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-3">Selected Files ({selectedFiles.length})</h3>
                                <ul className="space-y-2" role="list" aria-label="Selected image files">
                                    {selectedFiles.map((file, index) => (
                                        <li key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                                            <span className="font-medium text-gray-900 truncate">{file.name}</span>
                                            <span className="text-sm text-gray-500 ml-3 flex-shrink-0">{formatSize(file.size)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Progress Section */}
                    {selectedFiles.length > 0 && (
                        <div className="mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                                    <span className="text-sm text-gray-500">{progress}%</span>
                                </div>
                                <Progress
                                    value={progress}
                                    className="w-full h-2"
                                    aria-label="Upload progress"
                                />
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    {uploading ? 'Uploading files...' : 'Ready to upload'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Upload Button Section */}
                    <div className="text-center">
                        <Button
                            onClick={handleUpload}
                            disabled={selectedFiles.length === 0 || uploading}
                            size="lg"
                            className="px-8 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-describedby="upload-button-help"
                        >
                            {uploading ? 'Uploading...' : 'Upload Images'}
                        </Button>
                        <p id="upload-button-help" className="text-xs text-gray-500 mt-2">
                            {selectedFiles.length === 0
                                ? 'Select images first to enable upload'
                                : `Ready to upload ${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''}`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage