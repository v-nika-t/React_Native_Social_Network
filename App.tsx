import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import Auth from './components/Auth';
import store from './store/store'; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Auth />
    </Provider> 
  );
}
export default App;
