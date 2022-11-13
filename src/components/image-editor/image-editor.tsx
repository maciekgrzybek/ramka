import { Dropzone } from './components/dropzone/dropzone';
import { useUploadedImage } from './hooks/use-uploaded-image';
import { Cropper } from './components/cropper/cropper';

import { Preview } from './components/preview/preview';

import { useState } from 'react';
import { ColourForm } from './components/colour-form/colour-form';

import { TextForm } from './components/text-form/text-form';
import { useAnalyticsAction } from '../../use-analytics';

type Props = {
  imageData: string | null;
};

export const ImageEditor = ({ imageData }: Props) => {
  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement>();

  return (
    <div>
      {imageData && (
        <div className="rounded-xl overflow-hidden mb-6">
          <Cropper
            imageData={imageData}
            setCroppedImageData={setOriginalCroppedImageData}
          />
        </div>
      )}
      {originalCroppedImageData && (
        <div className="flex flex-col gap-y-5">
          <TextForm />
          <ColourForm />
          <Preview croppedImageData={originalCroppedImageData} />
        </div>
      )}
    </div>
  );
};
