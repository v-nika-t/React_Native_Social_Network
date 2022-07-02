import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { auth } from '../actions/auth.action';
import DrawerNavigator from './DrawerNavigator';
import Account from '../components/account/Account';
import UsertList from '../components/users/userList/UserList';
import ChatList from '../components/chatList/ChatList';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            initialRouteName="news"
            tabBarShowLabel='false'
        >
            <Tab.Group screenOptions={{
                headerStyle: {
                    backgroundColor: '#3CB371',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <Tab.Screen
                    name="news"
                    component={DrawerNavigator}
                    options={{
                        title: 'Новости',
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => (

                            <Entypo name="news" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="friends"
                    showLabel="false"
                    component={UsertList}
                    options={{
                        title: 'Друзья',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="user-friends" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="chatList"
                    component={ChatList}
                    options={{
                        title: 'Сообщения',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="wechat" size={30} color={color} />
                        )
                    }}

                />
                <Tab.Screen
                    name="profile"
                    component={Account}
                    options={{
                        title: 'Личный кабинет',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="account-circle" size={30} color={color} />
                        ),
                        headerRight: () => (
                            <TouchableWithoutFeedback onPress={() => {
                                dispatch(auth(false));
                                SecureStore.setItemAsync('authorization', '');
                                SecureStore.setItemAsync('userId', '');
                            }} >
                                <Entypo style={{ marginRight: 20 }} name="log-out" size={25} color="#fff" />
                            </TouchableWithoutFeedback>
                        )
                    }}

                />
            </Tab.Group>
        </Tab.Navigator>
    );
}

export default TabNavigator;