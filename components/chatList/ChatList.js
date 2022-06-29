
import { useSelector } from 'react-redux';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

import SearchPanelofUsers from '../searchPanelofUsers/SearchPanelofUsers';
import styles from './styleChatList';


const ChatList = ({ navigation }) => {
    const { foundUsers } = useSelector(state => state.user);
    const content = foundUsers ? foundUsers.map(item => {

        const user_name = item.user ? item.user.user_name : item.user_name;
        const id_other_user = item.user ? item.user.id : item.id;
        const user_name_other_user = item.user ? item.user.user_name : item.user_name;

        return (
            <View key={item.id} style={[styles.container]}>
                <AntDesign name="user" size={30} color="black" />
                <Text style={[styles.text]}>{user_name}</Text>
                <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('chatWithUser', { id_other_user, user_name_other_user })}>
                    <FontAwesome style={{ marginLeft: 10 }} name="send-o" size={26} color="black" />
                </TouchableWithoutFeedback>
            </View>
        )
    }) : ''

    return (
        <>
            <SearchPanelofUsers >
                {content}
            </ SearchPanelofUsers >

        </>
    )
}
export default ChatList;
