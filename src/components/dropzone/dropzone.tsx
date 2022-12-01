import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { BsImage, BsFillCloudUploadFill } from 'react-icons/bs';
import { Button } from '../button/button';

type Props = {
  handleDrop: (file: Blob) => void;
  variant?: 'default' | 'button';
};

export const Dropzone = ({ handleDrop, variant = 'default' }: Props) => {
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

      {variant === 'button' ? (
        <Button variant="secondary">Try different image</Button>
      ) : (
        <div
          className={clsx(
            'ease-in-out duration-200 border-dotted border-2 border-primary-brand-800 rounded-2xl flex justify-center items-center bg-primary-brand-100 flex-col w-full h-72 shadow-lg shadow-primary-brand-200',
            { 'scale-105 shadow-2xl': isDragActive }
          )}
        >
          {isDragActive ? (
            <BsFillCloudUploadFill className="w-10 h-10 mb-4 text-primary-brand-500" />
          ) : (
            <BsImage className="w-10 h-10 mb-4 text-primary-brand-800" />
          )}

          <span className="flex flex-col text-center items-center text-sm">
            <span className=" text-black-brand-500  mb-1">
              Drag and drop your profile picture
            </span>
            <span className="text-primary-brand-800 mb-2">- or -</span>
            <Button>Browse files</Button>
          </span>
          {error && (
            <span className="text-orange-800 mt-6">
              This filetype is not accepted. Use jpeg, png or webp.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
