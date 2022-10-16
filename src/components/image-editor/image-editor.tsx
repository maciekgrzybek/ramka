import { Dropzone } from './components/dropzone/dropzone';
import { useUploadedImage } from './hooks/use-uploaded-image';
import { Cropper } from './components/cropper/cropper';

import { Preview } from './components/preview/preview';

import { useState } from 'react';
import { ColourForm } from './components/colour-form/colour-form';

import { TextForm } from './components/text-form/text-form';
import { useAnalyticsAction } from '../../use-analytics';

export const ImageEditor = () => {
  const { readFile, imageData } = useUploadedImage();
  const trackEvent = useAnalyticsAction('image');

  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement>();

  const handleDrop = (file: Blob) => {
    trackEvent('drag_image');
    readFile(file);
  };

  return (
    <div>
      {imageData && (
        <Cropper
          imageData={imageData}
          setCroppedImageData={setOriginalCroppedImageData}
        />
      )}
      {originalCroppedImageData && (
        <>
          <TextForm />
          <Preview croppedImageData={originalCroppedImageData} />
          <ColourForm />
        </>
      )}

      <Dropzone handleDrop={handleDrop} />
    </div>
  );
};
