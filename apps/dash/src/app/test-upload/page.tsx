'use client';

import { useState } from 'react';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Typically, worker runs on 8787 locally.
      const response = await fetch('http://localhost:8787/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      // The API returns { key, url }.
      // Use the full URL to load the image.
      setUploadedUrl(`http://localhost:8787${data.url}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Test Cloudflare R2 Upload
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Image to Upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {uploadedUrl && (
          <div className="mt-6 border-t pt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Upload Successful!
            </h2>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img src={uploadedUrl} alt="Uploaded" className="w-full h-auto" />
            </div>
            <p className="mt-2 text-xs text-gray-500 break-all">
              {uploadedUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
