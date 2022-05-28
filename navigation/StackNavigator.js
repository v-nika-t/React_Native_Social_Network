import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';
import StartForm from '../components/form/startForm/StartForm';
import CommentsList from '../components/comments/commentsList/CommentsList';



const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="account" id="StackNavigator">
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
                <Stack.Screen
                    name="comments"
                    component={CommentsList}
                    options={{ title: "Комментарии" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;