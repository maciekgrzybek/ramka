import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

type Props = {
  handleDrop: (file: Blob) => void;
};

export const Dropzone = ({ handleDrop }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleDrop(acceptedFiles[0]);
    },
    [handleDrop]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="border-dashed border-2 rounded-2xl flex justify-center items-center bg-blue-50 flex-col w-full py-20">
        <AiOutlineCloudUpload className="w-10 h-10 mb-4" />

        <span className="flex flex-col text-center text-sm">
          {isDragActive ? (
            'Dropping file...'
          ) : (
            <>
              {' '}
              <span className="text-blue-500 mb-1">
                Drag and drop your profile picture
              </span>
              <span className="text-gray-500 mb-2">- or -</span>
              <button className="bg-blue-500 text-white rounded-full p-2">
                Browse files
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
