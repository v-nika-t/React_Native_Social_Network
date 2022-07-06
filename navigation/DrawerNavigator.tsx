import { createDrawerNavigator } from '@react-navigation/drawer';

import PostList from '../components/posts/postsList/PostList';
import FormPostAction from '../components/posts/formPostAction/FormPostAction';
import { TDrawerNavigator } from '../types/navigation/stack.navigation.types'

const Drawer = createDrawerNavigator<TDrawerNavigator>();


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator  >
            <Drawer.Group screenOptions={{
                headerStyle: {
                    backgroundColor: '#3CB371',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
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
            </Drawer.Group>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;