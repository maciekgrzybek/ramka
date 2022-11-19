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
import clsx from 'clsx';

const TRACKING_ID = 'G-XJ9RSN3622'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export const App = () => {
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
          <div
            className={clsx({
              'items-center md:grid md:grid-cols-2': !originalCroppedImageData,
            })}
          >
            {!imageData && (
              <div className="mb-12 px-4 md:px-8">
                <h1 className="text-2xl text-black-brand-500 font-black uppercase mb-1 leading-7 md:text-3xl lg:text-4xl md:mb-5">
                  Hi, and welcome to{' '}
                  <span className="text-primary-brand-900">Ramka</span>
                </h1>
                <p className="md:text-xl">
                  Create your own, awesome image frame with your own text.
                </p>
              </div>
            )}
            <div
              className={clsx({
                'lg:grid lg:grid-cols-2': originalCroppedImageData,
              })}
            >
              <div
                className={clsx('px-4 md:px-8', {
                  'md:grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr] md:gap-6 lg:flex lg:flex-col':
                    originalCroppedImageData,
                })}
              >
                <div>
                  {imageData && (
                    <div className="mb-10 lg:mb-0">
                      <Cropper
                        imageData={imageData}
                        setCroppedImageData={setOriginalCroppedImageData}
                      />
                    </div>
                  )}
                </div>
                {originalCroppedImageData && (
                  <div className="flex flex-col gap-y-3">
                    <div className="pb-5">
                      <div className="mb-10 lg:mb-5">
                        <TextForm />
                      </div>
                      <ColourForm />
                    </div>
                    <div className="pb-5 md:hidden">
                      <Presets />
                    </div>
                  </div>
                )}
              </div>
              <div
                className={clsx('px-4', {
                  'md:grid md:grid-cols-2 md:gap-x-10 lg:flex lg:flex-col':
                    originalCroppedImageData,
                })}
              >
                <div>
                  {originalCroppedImageData && (
                    <div className="px-4 md:px-8 pb-2 pt-8 lg:pt-0">
                      <Preview croppedImageData={originalCroppedImageData} />
                      <span className="flex justify-center w-full text-black-brand-100 mt-1">
                        or
                      </span>
                    </div>
                  )}
                  <div
                    className={clsx('mb-6 md:px-4', {
                      'lg:max-w-[300px] lg:mx-auto lg:px-0':
                        originalCroppedImageData,
                    })}
                  >
                    <div>
                      <Dropzone
                        handleDrop={handleDrop}
                        hasFile={Boolean(imageData)}
                      />
                    </div>
                  </div>
                </div>
                {originalCroppedImageData && (
                  <div className="hidden md:block">
                    <Presets />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </Layout>
    </StoreProvider>
  );
};
