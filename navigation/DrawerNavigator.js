import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button } from 'react-native';

import PostList from '../components/postsList/PostList';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="allPost"
                component={PostList}
                options={{
                    title: 'Новости'
                }}
            />
            <Drawer.Screen
                name="ownPost"
                component={NotificationsScreen}
                options={{
                    title: 'Твои записи'
                }}
            />
            <Drawer.Screen
                name="addPost"
                component={NotificationsScreen}
                options={{
                    title: 'Добавить запись'
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;