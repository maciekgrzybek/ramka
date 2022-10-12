import { Header } from './components/header/header';
import { ImageEditor } from './components/image-editor/ImageEditor';
import { Layout } from './components/layout/layout';
import { StoreProvider } from './store.context';

function App() {
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
