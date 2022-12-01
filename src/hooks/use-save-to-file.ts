import { useRef } from 'react';
import slugify from 'slugify';
import { exportAsImage } from '../utils/save-to-file';

export const useSaveToFile = (filename: string) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (canvasRef.current) {
      exportAsImage(canvasRef.current, slugify(filename, { lower: true }));
    }
  };

  return { downloadImage, canvasRef };
};
