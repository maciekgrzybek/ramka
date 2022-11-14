import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { StoreProvider } from './store/store.context';
import ReactGA from 'react-ga';
import { useAnalyticsAction, useAnalyticsPageView } from './use-analytics';
import { Dropzone } from './components/dropzone/dropzone';
import { useUploadedImage } from './hooks/use-uploaded-image';
import { Presets } from './components/presets/presets';
import { Cropper } from './components/cropper/cropper';
import { useState } from 'react';
import { TextForm } from './components/text-form/text-form';
import { ColourForm } from './components/colour-form/colour-form';
import { Preview } from './components/preview/preview';

const TRACKING_ID = 'G-XJ9RSN3622'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useAnalyticsPageView();

  const { readFile, imageData } = useUploadedImage();
  const trackEvent = useAnalyticsAction('image');

  const [originalCroppedImageData, setOriginalCroppedImageData] =
    useState<HTMLCanvasElement>();

  const handleDrop = (file: Blob) => {
    trackEvent('drag_image');
    readFile(file);
  };

  return (
    <StoreProvider>
      <Layout>
        <>
          <Header />
          {!imageData && (
            <div className="text-center mb-10">
              <h1 className="text-2xl text-blue-500 mb-1">
                Welcome to <span className="font-bold">Fream</span>
              </h1>
              <p>Create your awesome, image frame.</p>
            </div>
          )}
          <div className="lg:grid lg:grid-cols-2 lg:gap-10">
            <div className="px-4 lg:pt-12">
              <div>
                {imageData && (
                  <div className="mb-3">
                    <Cropper
                      imageData={imageData}
                      setCroppedImageData={setOriginalCroppedImageData}
                    />
                  </div>
                )}
                <div className="mb-6">
                  <Dropzone
                    handleDrop={handleDrop}
                    hasFile={Boolean(imageData)}
                  />
                </div>
              </div>
              {originalCroppedImageData && (
                <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 md:gap-10 md:max-lg:border-b md:max-lg:border-gray-100 lg:grid-cols-1">
                  <div className="pb-5 border-b border-gray-100 md:max-lg:border-0">
                    <div className="mb-3">
                      <TextForm />
                    </div>
                    <ColourForm />
                  </div>
                  <div className="pb-5">
                    <Presets />
                  </div>
                </div>
              )}
            </div>
            {originalCroppedImageData && (
              <div className="px-4 pb-10 pt-8 bg-gray-50 lg:pt-12 lg:pb-5">
                <Preview croppedImageData={originalCroppedImageData} />
              </div>
            )}
          </div>
        </>
      </Layout>
    </StoreProvider>
  );
}

export default App;
