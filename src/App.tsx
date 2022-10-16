import { Header } from './components/header/header';
import { ImageEditor } from './components/image-editor/image-editor';
import { Layout } from './components/layout/layout';
import { StoreProvider } from './store.context';
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
          <ImageEditor />
        </>
      </Layout>
    </StoreProvider>
  );
}

export default App;
