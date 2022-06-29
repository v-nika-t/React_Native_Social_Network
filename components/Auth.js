import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import StackNavigator from '../navigation/StackNavigator';
import { addDataAccount, auth, changeRole } from '../actions/auth.action';
import { User } from '../services/SocialNetworkServices';

SecureStore.setItemAsync('userId', '')
function Auth() {
    const dispatch = useDispatch();
    const services = User;

    const x = async () => {
        const userId = await SecureStore.getItemAsync('userId');
        const result = await services.getOne(userId);

        console.log(result);
    }

    useEffect(() => {
        x();

    }, [])

    return (
        <>
            <SafeAreaProvider>
                <StackNavigator />
            </SafeAreaProvider>
        </>

    );
}

export default Auth;

