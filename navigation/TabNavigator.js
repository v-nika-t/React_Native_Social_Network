import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DrawerNavigator from './DrawerNavigator';
import Account from '../components/account/Account';
import UsertList from '../components/users/userList/UserList';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="account">
            <Tab.Screen
                name="news"
                component={DrawerNavigator}
                options={{
                    title: 'Новости',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="friends"
                component={UsertList}
                options={{
                    title: 'Друзья',
                }}
            />
            <Tab.Screen
                name="profile"
                component={Account}
                options={{
                    title: 'Личный кабинет'
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;