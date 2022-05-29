import { View, Text } from 'react-native';

const UserListItem = (props) => {
    const { id, name, mail, } = props;

    return (
        <View>
            <Text>{name} : Добавить в друзья  Удалить из друзей </Text>
        </View>
    )
}

export default UserListItem;