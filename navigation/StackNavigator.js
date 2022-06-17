import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import TabNavigator from './TabNavigator';
import StartForm from '../components/form/startForm/StartForm';
import CommentsList from '../components/comments/commentsList/CommentsList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction'


const Stack = createNativeStackNavigator();

function StackNavigator() {
    const isSignIn = useSelector(state => state.auth.signIn); // // помешаем state. При смене к примеру вошел поменялся. В Redax // будет наша Redax State
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="startPage" id="StackNavigator">
                {!isSignIn ? (<Stack.Screen
                    name="startPage"
                    component={StartForm}
                    options={{
                        headerShown: false,
                    }}
                />
                ) : (<>
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
                    <Stack.Screen
                        name="editPost"
                        component={FormPostAction}
                        options={{
                            title: 'Изменить'
                        }}
                    />
                    <Stack.Screen // сделать компоненту 
                        name="adminPanel"
                        component={CommentsList}
                        options={{ title: "Комментарии" }}
                    />
                </>)}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;