import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigations from './src/navigations';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigations />
    </GestureHandlerRootView>
  );
}

export default App;
