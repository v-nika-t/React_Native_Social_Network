import { StyleSheet, TextInput, View } from 'react-native';
import Form from './components/form/Form';
import Account from './components/account/Account';

export default function App() {


  return (
    <View >
      <Form />
      <Account />
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
