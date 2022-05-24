import { View, Text } from 'react-native';

const UserListItem = (props) => {
    const { username } = props;

    return (
        <View>
            <Text>{username} : Добавить в друзья  Удалить из друзей </Text>
        </View>
    )
}

export default UserListItem;