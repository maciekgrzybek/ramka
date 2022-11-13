import { useRef } from 'react';
import { exportAsImage } from '../utils/save-to-file';

export const useSaveToFile = (filename: string) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (canvasRef.current) {
      exportAsImage(canvasRef.current, filename);
    }
  };

  return { downloadImage, canDownloadImage: !!canvasRef.current, canvasRef };
};
