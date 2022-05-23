import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DrawerNavigator from './DrawerNavigator';
import Account from '../components/account/Account';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="account">
            <Tab.Screen name="Home" component={Account} />
            <Tab.Screen name="Settings" component={DrawerNavigator} />
        </Tab.Navigator>
    );
}

export default TabNavigator;