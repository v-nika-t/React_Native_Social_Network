import { View, Text, Image, Button } from 'react-native';

const PostListItem = (props) => {
    const { /* user , */ description, img, navigation, likes, date } = props;
    let pathImg = 'http://192.168.1.225:8000/favicon.png'; //Сделать метод получения картинки в 
    const user = 'vt@jkvhdhfv.ru';
    return (
        <View>
            <Text>{user}</Text>
            <Image
                source={{ uri: pathImg }}
                style={{ width: 200, height: 200 }}
            />
            <Text>{description}</Text>
            <Text>Лайк:{likes}</Text>
            <Button title='Комментарии' onPress={() => { navigation.getParent('StackNavigator').navigate('comments') }} />

        </View>
    )
}

export default PostListItem;

