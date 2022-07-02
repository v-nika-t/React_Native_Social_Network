import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

import StackNavigator from '../navigation/StackNavigator';
import { addDataAccount, auth, changeRole } from '../actions/auth.action';
import { User } from '../services/SocialNetworkServices';

function Auth() {
    const dispatch = useDispatch();
    const services = User;
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                await SplashScreen.preventAutoHideAsync();
                const userId = await SecureStore.getItemAsync('userId');
                const data = await services.getOne(userId);
                dispatch(addDataAccount(data[0]));
                dispatch(changeRole(data[0].role.name));
                dispatch(auth(true));
            } catch (error) {
                SecureStore.setItemAsync('userId', '');
                SecureStore.setItemAsync('authorization', '');
                dispatch(auth(false));
            } finally {
                setAppIsReady(true);
            }
        }())
    }, [])

    useEffect(() => {
        (async function () {
            if (appIsReady) {
                await SplashScreen.hideAsync();
            }
        }())

    }, [appIsReady])

    return (<>
        {appIsReady ? (
            <SafeAreaProvider>
                <StackNavigator />
            </SafeAreaProvider>
        ) : null}
    </>)

}

export default Auth;

