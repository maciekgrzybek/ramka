import { useState } from 'react';

type Output = {
  imageData: string | null;
  readFile: (file: Blob) => void;
};

export const useUploadedImage = (): Output => {
  const [imageData, setImageData] = useState<string | null>(null);

  const readFile = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result as string);
    reader.readAsDataURL(file);
  };

  return { readFile, imageData };
};
