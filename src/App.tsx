import { ImageEditor } from './components/image-editor/ImageEditor';
import { StoreProvider } from './store.context';

function App() {
  return (
    <StoreProvider>
      <ImageEditor />
    </StoreProvider>
  );
}

export default App;
