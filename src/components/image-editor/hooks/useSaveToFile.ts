import { useRef } from 'react';
import { exportAsImage } from '../utils/saveToFile';

export const useSaveToFile = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (canvasRef.current) {
      exportAsImage(canvasRef.current, 'siema');
    }
  };

  return { downloadImage, canDownloadImage: !!canvasRef.current, canvasRef };
};
