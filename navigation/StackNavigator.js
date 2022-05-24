import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';

import Form from '../components/form/Form';


const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="account">
                <Stack.Screen
                    name="startPage"
                    component={Form}
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