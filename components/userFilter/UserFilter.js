import { View, Text } from 'react-native';

const UserFilter = () => {
    return (
        <View>
            <Text>Все пользователи</Text> {/* Кликабельны фильтрую пользователей  */}
            <Text>Заявки в друзья </Text> {/* Кликабельны фильтрую пользователей  */}
            <Text>Друзья </Text>
        </View>
    )
}
export default UserFilter;