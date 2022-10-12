import { Dropzone } from './components/dropzone/Dropzone';
import { useUploadedImage } from './hooks/useUploadedImage';
import { Cropper } from './components/cropper/Cropper';

import { Frames } from './components/frames/Frames';

import { useState } from 'react';
import { ColourForm } from './components/colour-form/ColourForm';
import { HexColour } from './types';
import { useStore } from '../../store.context';

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
          <Frames croppedImageData={originalCroppedImageData} />
          <ColourForm />
        </>
      )}

      {/* {readyImageData && (
        <>
          <img src={readyImageData} alt="Cropped image" />
          <button onClick={() => saveToFile(readyImageData)}>Save image</button>
        </>
      )} */}
      <Dropzone handleDrop={readFile} />
    </div>
  );
};
