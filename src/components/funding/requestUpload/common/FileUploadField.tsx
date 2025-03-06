import React, { useRef, useState } from 'react';

interface FileUploadFieldProps {
  onFilesSelected: (files: File[]) => void;
  onFileRemoved: (file: File) => void;
  existingFiles?: File[];
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  error?: string;
}

/**
 * FileUploadField - A breathtaking, mobile-first component for file uploads
 * with elegant drag-and-drop functionality and visual feedback.
 */
const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onFilesSelected,
  onFileRemoved,
  existingFiles = [],
  maxFileSizeMB = 5,
  acceptedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  multiple = false,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localErrors, setLocalErrors] = useState<string[]>([]);
  
  // Convert maxFileSizeMB to bytes
  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
  
  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Get file extension
  const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };
  
  // Get file icon based on extension
  const getFileIcon = (filename: string): JSX.Element => {
    const extension = getFileExtension(filename).toLowerCase();
    
    // Return different SVG icons based on file type
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return (
        <svg className="w-6 h-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else if (['pdf'].includes(extension)) {
      return (
        <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          <path d="M8 11h4m-2-2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else if (['doc', 'docx'].includes(extension)) {
      return (
        <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    processFiles(Array.from(fileList));
  };
  
  // Process selected files
  const processFiles = (files: File[]) => {
    const errors: string[] = [];
    const validFiles: File[] = [];
    
    files.forEach(file => {
      // Check file size
      if (file.size > maxSizeBytes) {
        errors.push(`${file.name} exceeds the maximum file size of ${maxFileSizeMB}MB`);
        return;
      }
      
      // Check file type
      const fileExtension = `.${getFileExtension(file.name).toLowerCase()}`;
      if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(fileExtension)) {
        errors.push(`${file.name} is not an accepted file type`);
        return;
      }
      
      validFiles.push(file);
    });
    
    setLocalErrors(errors);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      processFiles(Array.from(files));
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Drag and drop area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
          ${error ? 'border-red-300 dark:border-red-700' : ''}
        `}
        onClick={handleButtonClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(',')}
          multiple={multiple}
        />
        
        <svg
          className={`
            mx-auto h-12 w-12 transition-colors duration-200 ease-in-out
            ${isDragging ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}
          `}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        <div className="mt-4 flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium">
            {isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="mt-1">or</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Browse Files
          </button>
          <p className="mt-2">
            {multiple ? 'Upload multiple files' : 'Upload a file'}
          </p>
          <p className="mt-1 text-xs">
            Max file size: {maxFileSizeMB}MB
            {acceptedFileTypes.length > 0 && (
              <>
                <br />
                Accepted file types: {acceptedFileTypes.join(', ')}
              </>
            )}
          </p>
        </div>
      </div>
      
      {/* Error messages */}
      {localErrors.length > 0 && (
        <div className="text-sm text-red-600 dark:text-red-400 space-y-1">
          {localErrors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      
      {/* File list */}
      {existingFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Uploaded Files ({existingFiles.length})
          </h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            {existingFiles.map((file, index) => (
              <li
                key={index}
                className="px-4 py-3 flex items-center justify-between text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3 truncate">
                  {getFileIcon(file.name)}
                  <span className="truncate font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileRemoved(file);
                  }}
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-150"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadField; 