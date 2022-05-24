import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';

import StartForm from '../components/form/startForm/StartForm';


const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="startPage">
                <Stack.Screen
                    name="startPage"
                    component={StartForm}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="account"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;