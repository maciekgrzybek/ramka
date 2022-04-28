import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

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
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};
