import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

import StackNavigator from '../navigation/StackNavigator';
import { addDataAccount, auth, changeRole } from '../actions/auth.action';
import { User } from '../services/SocialNetworkServices';

/* SecureStore.setItemAsync('userId', '');
SecureStore.setItemAsync('authorization', '')
 */
function Auth() {
    const image = { uri: "https://reactjs.org/logo-og.png" };
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
                dispatch(auth(true));
                dispatch(changeRole(data[0].role.name));
            } catch (e) {
                console.log(e)
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

