import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

import StackNavigator from '../navigation/StackNavigator';
import { add, auth, changeRole } from '../actions/user.action';
import { User } from '../services/SocialNetworkServices';


function Auth() {
    const dispatch = useDispatch();
    const services = User;

    useEffect(() => {
        SecureStore.getItemAsync('userId').then(userId => {
            services.getOne(userId).then(data => {
                if ((data !== 'jwt is not correct') && (data !== undefined)) {
                    console.log(data[0]);
                    dispatch(add(data[0]))
                    dispatch(auth(true));
                    dispatch(changeRole(data[0].role.name));
                }
            }).then(/* SplashScreen.hideAsync() */)
        })
    }, [])

    return (
        <SafeAreaProvider>
            <StackNavigator />
        </SafeAreaProvider>

    );
}

export default Auth;

