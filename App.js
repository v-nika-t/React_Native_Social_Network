import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigation/StackNavigator';


function App() {
  return (
    <SafeAreaProvider>
      <StackNavigator />
    </SafeAreaProvider>



  );
}

export default App;