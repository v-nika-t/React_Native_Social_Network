import { createDrawerNavigator } from '@react-navigation/drawer';

import PostList from '../components/posts/postsList/PostList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home"  >
            <Drawer.Screen
                name="allPost"
                component={PostList}
                options={{
                    title: 'Новости',
                }}
            />
            <Drawer.Screen
                name="ownPost"
                component={PostList}
                options={{
                    title: 'Твои записи'
                }}
            />
            <Drawer.Screen
                name="addPost"
                component={FormPostAction}
                options={{
                    title: 'Добавить'
                }}
            />

        </Drawer.Navigator>
    )
}

export default DrawerNavigator;