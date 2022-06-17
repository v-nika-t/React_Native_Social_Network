import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';

import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StackNavigator />
      </SafeAreaProvider>
    </Provider>

  );
}

export default App;

