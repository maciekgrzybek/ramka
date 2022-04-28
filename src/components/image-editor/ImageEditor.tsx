import { Dropzone } from './components/dropzone/Dropzone';
import { useUploadedImage } from './hooks/useUploadedImage';
import { Cropper } from './components/cropper/Cropper';

import { Frames } from './components/frames/Frames';

import { useFrameCreation } from './hooks/useFrameCreation';
import { saveToFile } from './utils/saveToFile';

export const ImageEditor = () => {
  const { readFile, imageData } = useUploadedImage();
  const {
    originalCroppedImageData,
    setOriginalCroppedImageData,
    framesRefs,
    createReadyImage,
    readyImageData,
  } = useFrameCreation();

  return (
    <div>
      {imageData && (
        <Cropper
          imageData={imageData}
          setCroppedImageData={setOriginalCroppedImageData}
        />
      )}
      {originalCroppedImageData && (
        <Frames
          refs={framesRefs}
          croppedImageData={originalCroppedImageData}
          onFrameSelect={createReadyImage}
        />
      )}
      {readyImageData && (
        <>
          <img src={readyImageData} alt="Cropped image" />
          <button onClick={() => saveToFile(readyImageData)}>Save image</button>
        </>
      )}
      <Dropzone handleDrop={readFile} />
    </div>
  );
};
