import { useRef } from 'react';
import slugify from 'slugify';
import { useAnalyticsAction } from '../use-analytics';
import { exportAsImage } from '../utils/save-to-file';

export const useSaveToFile = (filename: string) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const trackEvent = useAnalyticsAction('image');

  const downloadImage = () => {
    if (canvasRef.current) {
      exportAsImage(canvasRef.current, slugify(filename, { lower: true }));
      trackEvent('save_image');
    }
  };

  return { downloadImage, canvasRef };
};
