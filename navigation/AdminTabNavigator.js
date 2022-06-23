import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { auth } from '../actions/user.action'
import Account from '../components/account/Account';
import StartPageAllUsers from '../components/adminPanel/startPageAllUsers/StartPageAllUsers';
import FormActionWithUser from '../components/adminPanel/formActionWithUser/FormActionWithUser';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            initialRouteName="allUsers"
            tabBarShowLabel='false'
        >
            <Tab.Screen
                name="allUsers"
                showLabel="false"
                component={StartPageAllUsers}
                options={{
                    title: 'Все пользователи',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-friends" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="addUser"
                showLabel="false"
                component={FormActionWithUser}
                options={{
                    title: 'Добавить',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-add-sharp" size={24} color={color} />
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
                    headerRight: () => (
                        <TouchableWithoutFeedback onPress={() => {
                            dispatch(auth(false));
                            SecureStore.setItemAsync('authorization', '');
                        }} >
                            <Entypo style={{ marginRight: 20 }} name="log-out" size={25} color="black" />
                        </TouchableWithoutFeedback>
                    )
                }}

            />
        </Tab.Navigator>
    );
}

export default TabNavigator;