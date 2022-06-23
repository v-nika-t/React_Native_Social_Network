import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import TabNavigator from './TabNavigator';
import AdminTabNavigator from './AdminTabNavigator.js';
import StartForm from '../components/form/startForm/StartForm';
import CommentsList from '../components/comments/commentsList/CommentsList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction';
import FormActionWithUser from '../components/adminPanel/formActionWithUser/FormActionWithUser';


const Stack = createNativeStackNavigator();

function StackNavigator() {
    const isSignIn = useSelector(state => state.auth.signIn);
    //const isAdmin = useSelector(state => state.auth.isAdmin);

    const isAdmin = true;

    SplashScreen.hideAsync();
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
                ) : (!isAdmin ? (
                    <>
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
                    </>
                ) : (<>
                    <Stack.Screen
                        name="allUsers"
                        component={AdminTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="editUser"
                        component={FormActionWithUser}
                        options={{
                            title: 'Изменить'
                        }}
                    />
                </>))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;