import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Button } from '../button/button';

type Props = {
  handleDrop: (file: Blob) => void;
  hasFile?: boolean;
};

export const Dropzone = ({ handleDrop, hasFile }: Props) => {
  const [error, setError] = useState<Error | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleDrop(acceptedFiles[0]);
      clearError();
    },
    [handleDrop]
  );

  const handleError = (error: Error) => setError(error);
  const clearError = () => setError(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onError: handleError,

    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {hasFile ? (
        <Button variant="secondary" fullWidth>
          Try different image
        </Button>
      ) : (
        <div className="border-dashed border-2 rounded-2xl flex justify-center items-center bg-blue-50 flex-col w-full h-72">
          <AiOutlineCloudUpload className="w-10 h-10 mb-4" />

          <span className="flex flex-col text-center text-sm">
            {isDragActive ? (
              'Dropping file...'
            ) : (
              <>
                <span className="text-blue-500 mb-1">
                  Drag and drop your profile picture
                </span>
                <span className="text-gray-500 mb-2">- or -</span>
                <Button>Browse files</Button>
              </>
            )}
          </span>
          {error && (
            <span className="text-red-400 mt-6">
              This filetype is not accepted. Use jpeg, png or webp.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
