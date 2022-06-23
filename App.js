import 'react-native-gesture-handler';
import { Provider, useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import Auth from './components/Auth';
import store from './store/store';

SplashScreen.preventAutoHideAsync();

function App() {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>

  );
}

export default App;

