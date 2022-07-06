import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { auth } from '../actions/auth.action';
import Account from '../components/account/Account';
import StartPageAllUsers from '../components/adminPanel/startPageAllUsers/StartPageAllUsers';
import FormActionWithUser from '../components/adminPanel/formActionWithUser/FormActionWithUser';

import { TTabAdminNavigation } from '../types/navigation/stack.navigation.types'

const Tab = createBottomTabNavigator<TTabAdminNavigation>();

function TabNavigator() {
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
        screenOptions={{ tabBarShowLabel:false}}
            initialRouteName="allUsers" 
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
                    name="allUsers"
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