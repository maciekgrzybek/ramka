import { Dropzone } from './components/dropzone/dropzone';
import { useUploadedImage } from './hooks/use-uploaded-image';
import { Cropper } from './components/cropper/cropper';

import { Preview } from './components/preview/preview';

import { useState } from 'react';
import { ColourForm } from './components/colour-form/colour-form';

import { TextForm } from './components/text-form/text-form';

export const ImageEditor = () => {
  const { readFile, imageData } = useUploadedImage();

  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement>();

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

      <Dropzone handleDrop={readFile} />
    </div>
  );
};
