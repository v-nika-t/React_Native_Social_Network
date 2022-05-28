import { View, Text, Image, Button } from 'react-native';

const PostListItem = (props) => {
    const { /* user , */ description, img, navigation, likes, date } = props;
    let pathImg = 'https://mobimg.b-cdn.net/v3/fetch/21/215e3ddf9d2d722a16e435992d354932.jpeg?h=900&r=0.5';
    {/*  <Text>Комментарии</Text> ==  Кликабельна, переходит на др.страницу stack  */ }
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

