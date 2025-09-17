/**
 * API helper for uploading images to the backend
 *
 * Request contract:
 * - Method: POST
 * - Content-Type: multipart/form-data
 * - Body: FormData with files appended as 'files[]' for each file
 * - Supports both single and multiple file uploads
 *
 * Environment Variables:
 * - VITE_API_BASE_URL: Base URL for the API (optional, defaults to relative path)
 */

import axios from 'axios';

/**
 * Uploads one or more image files to the backend
 * @param {File|File[]} files - Single file or array of files to upload
 * @param {Function} onProgress - Callback function that receives upload progress (0-100)
 * @returns {Promise<Object>} - Parsed response data from the server
 */
export async function uploadImages(files, onProgress) {
    // Normalize files to array for consistent handling
    const fileArray = Array.isArray(files) ? files : [files];

    // Create FormData object
    const formData = new FormData();

    // Append each file as 'files[]'
    fileArray.forEach((file) => {
        formData.append('files[]', file);
    });

    // Determine the API endpoint
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
    const endpoint = `${baseUrl}/api/upload`;

    const response = await axios.post(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable && onProgress) {
                // Calculate percentage and ensure it's an integer between 0-100
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(Math.min(100, Math.max(0, percentCompleted)));
            }
        },
    });

    return response.data;
}

/**
 * Fetches object detection results for an uploaded image
 * @param {string} imageId - The ID/filename of the uploaded image
 * @returns {Promise<Object>} - Object with 'boxes' array containing detection results
 */
export async function getDetections(imageId) {
    // Determine the API endpoint
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
    const endpoint = `${baseUrl}/api/detections/${imageId}`;

    const response = await axios.get(endpoint);
    return response.data;
}