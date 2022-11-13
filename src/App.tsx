import { Header } from './components/header/header';
import { ImageEditor } from './components/image-editor/image-editor';
import { Layout } from './components/layout/layout';
import { StoreProvider } from './store/store.context';
import ReactGA from 'react-ga';
import { useAnalyticsPageView } from './use-analytics';

const TRACKING_ID = 'G-XJ9RSN3622'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useAnalyticsPageView();

  return (
    <StoreProvider>
      <Layout>
        <>
          <Header />
          <div className="text-center mb-10">
            <h1 className="text-2xl text-blue-500 mb-1">
              Welcome to <span className="font-bold">Fream</span>
            </h1>
            <p>Create your awesome, image frame.</p>
          </div>
          <ImageEditor />
        </>
      </Layout>
    </StoreProvider>
  );
}

export default App;
