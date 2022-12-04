import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { useStore } from './store/store.context';

import { Dropzone } from './components/dropzone/dropzone';
import { useUploadedImage } from './hooks/use-uploaded-image';
import { Presets } from './components/presets/presets';
import { Cropper } from './components/cropper/cropper';
import { useEffect, useState } from 'react';
import { TextForm } from './components/text-form/text-form';
import { ColourForm } from './components/colour-form/colour-form';
import { Preview } from './components/preview/preview';
import { IntroText } from './components/intro-text/intro-text';
import { useSaveToFile } from './hooks/use-save-to-file';
import { Button } from './components/button/button';
import { LoadingIndicator } from './components/loading-indicator/loading-indicator';
import { Footer } from './components/footer/footer';

export const App = () => {
  const { state } = useStore();
  const { readFile, imageData } = useUploadedImage();
  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (file: Blob) => {
    setOriginalCroppedImageData(null);

    readFile(file);
    setIsLoading(true);
  };

  const { canvasRef, downloadImage } = useSaveToFile(state.text);

  useEffect(() => {
    if (originalCroppedImageData) {
      setIsLoading(false);
    }
    if (!originalCroppedImageData && imageData) {
      setIsLoading(true);
    }
  }, [originalCroppedImageData]);

  return (
    <Layout>
      <>
        <div>
          <Header />
          <IntroText />
          <div className="max-w-2xl mx-auto mb-5">
            {!imageData && (
              <div className="px-4">
                <Dropzone handleDrop={handleDrop} />
              </div>
            )}
            {imageData && (
              <div className="px-4">
                <Cropper
                  imageData={imageData}
                  setCroppedImageData={setOriginalCroppedImageData}
                />
              </div>
            )}
          </div>
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <LoadingIndicator />
            </div>
          )}
          {originalCroppedImageData && (
            <div className="px-4 max-w-2xl mx-auto">
              <div className="border border-primary-brand-600 rounded-md">
                <div className="px-4 py-5 border-b border-primary-brand-600 rounded-md md:flex md:items-between md:gap-8">
                  <Preview
                    croppedImageData={originalCroppedImageData}
                    canvasRef={canvasRef}
                  />
                  <div className="md:flex md:justify-center md:flex-col">
                    <div className="mb-4">
                      <TextForm />
                    </div>
                    <div className="flex flex-wrap items-end gap-2">
                      <ColourForm />
                      <Presets />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 flex justify-start gap-2 md:justify-end">
                  <Dropzone handleDrop={handleDrop} variant="button" />
                  <Button onClick={downloadImage}>Save image</Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    </Layout>
  );
};
