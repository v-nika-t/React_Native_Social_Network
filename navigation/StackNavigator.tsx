import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import TabNavigator from './TabNavigator';
import AdminTabNavigator from './AdminTabNavigator';
import StartForm from '../components/form/startForm/StartForm';
import CommentsList from '../components/comments/commentsList/CommentsList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction';
import FormActionWithUser from '../components/adminPanel/formActionWithUser/FormActionWithUser';
import ChatWithUser from '../components/chatWithUser/ChatWithUser';
import { ICommonState } from '../types/action.types/state.types';
import { TStackNavigation } from '../types/navigation/stack.navigation.types'


const Stack = createNativeStackNavigator<TStackNavigation>();

const StackNavigator = () => {
    const isSignIn = useSelector<ICommonState, boolean>((state) => state.auth.signIn);
    const isAdmin = useSelector<ICommonState, boolean>((state) => state.auth.isAdmin);

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#3CB371',
        },
    };

    return (
        <NavigationContainer theme={MyTheme} >
            <Stack.Navigator initialRouteName="startPage" id="StackNavigator" >
                <Stack.Group screenOptions={{
                    headerStyle: {
                        backgroundColor: '#3CB371',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
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
                                options={{ title: "??????????????????????" }}
                            />
                          <Stack.Screen
                                name="editPost"
                                component={FormPostAction}
                                options={{
                                    title: '????????????????'
                                }}
                            /> 
                           <Stack.Screen
                                name="chatWithUser"
                                component={ChatWithUser}
                                options={{
                                    title: '??????',
                                }}
                            />
                        </>
                    ) : (<>
                        <Stack.Screen
                            name="users"
                            component={AdminTabNavigator}
                            options={{ headerShown: false }}
                        /> 
                         <Stack.Screen
                            name="editUser"
                            component={FormActionWithUser}
                            options={{
                                title: '????????????????',
                            }}
                        /> 
                    </>))} 
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default StackNavigator;