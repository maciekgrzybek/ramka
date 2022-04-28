import { createRef, RefObject, useMemo, useState } from 'react';
import { imageFrames } from '../const';
import { ImageFrame } from '../types';
import { getRoundedCanvas } from '../utils/getRoundedCanvas';

type Output = {
  originalCroppedImageData?: HTMLCanvasElement;
  setOriginalCroppedImageData: (canvas: HTMLCanvasElement) => void;
  framesRefs: Record<ImageFrame, RefObject<HTMLImageElement>>;
  createReadyImage: (selectedFrame: ImageFrame) => void;
  readyImageData?: string;
};

export const useFrameCreation = (): Output => {
  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement>();
  const [readyImageData, setReadyImageData] = useState<string>();

  const framesRefs = useMemo(() => {
    return imageFrames.reduce((acc, frame) => {
      acc[frame] = createRef();
      return acc;
    }, {} as Record<ImageFrame, RefObject<HTMLImageElement>>);
  }, []);

  const createReadyImage = (selectedFrame: ImageFrame) => {
    if (originalCroppedImageData) {
      const readyCanvas = getRoundedCanvas(
        originalCroppedImageData,
        framesRefs[selectedFrame].current
      );

      setReadyImageData(readyCanvas?.toDataURL());
    }
  };

  return {
    originalCroppedImageData,
    setOriginalCroppedImageData,
    framesRefs,
    createReadyImage,
    readyImageData,
  };
};
