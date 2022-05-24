import { View, Text, Image, Button } from 'react-native';

const PostListItem = (props) => {
    const { title, description, img, navigation } = props;
    let pathImg = 'https://mobimg.b-cdn.net/v3/fetch/21/215e3ddf9d2d722a16e435992d354932.jpeg?h=900&r=0.5';
    {/*  <Text>Комментарии</Text> ==  Кликабельна, переходит на др.страницу stack  */ }


    return (
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Image
                source={{ uri: pathImg }}
                style={{ width: 200, height: 200 }}
            />
            <Text>Лайк</Text>
            <Button title='Комментарии' onPress={() => { navigation.getParent('StackNavigator').navigate('comments') }} />

        </View>
    )
}

export default PostListItem;

