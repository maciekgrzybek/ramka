import { Header } from './components/header/header';
import { ImageEditor } from './components/image-editor/image-editor';
import { Layout } from './components/layout/layout';
import { StoreProvider } from './store/store.context';
import ReactGA from 'react-ga';
import { useAnalyticsAction, useAnalyticsPageView } from './use-analytics';
import { Dropzone } from './components/image-editor/components/dropzone/dropzone';
import { useUploadedImage } from './components/image-editor/hooks/use-uploaded-image';

const TRACKING_ID = 'G-XJ9RSN3622'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useAnalyticsPageView();

  const { readFile, imageData } = useUploadedImage();
  const trackEvent = useAnalyticsAction('image');

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
          <div className="px-4">
            <ImageEditor imageData={imageData} />
            <Dropzone handleDrop={handleDrop} hasFile={Boolean(imageData)} />
          </div>
        </>
      </Layout>
    </StoreProvider>
  );
}

export default App;
