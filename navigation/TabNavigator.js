import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import DrawerNavigator from './DrawerNavigator';
import Account from '../components/account/Account';
import UsertList from '../components/users/userList/UserList';

const Tab = createBottomTabNavigator();



function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="news"
            tabBarShowLabel='false'

        >
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
                name="profile"
                component={Account}
                options={{
                    title: 'Личный кабинет',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="account-circle" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;