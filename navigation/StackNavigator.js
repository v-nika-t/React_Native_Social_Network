import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import TabNavigator from './TabNavigator';
import StartForm from '../components/form/startForm/StartForm';
import CommentsList from '../components/comments/commentsList/CommentsList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction';
import SocialNetworkServices from '../services/SocialNetworkServices';
import { auth } from '../actions/user.action'

const Stack = createNativeStackNavigator();

function StackNavigator() {
    const dispatch = useDispatch();
    const isSignIn = useSelector(state => state.auth.signIn); // // помешаем state. При смене к примеру вошел поменялся. В Redax // будет наша Redax State
    const service = new SocialNetworkServices('post');

    useEffect(() => {
        service.getAll().then(data => data == 'jwt is not correct' ? dispatch(auth(false)) : dispatch(auth(true)));
    }, [])

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