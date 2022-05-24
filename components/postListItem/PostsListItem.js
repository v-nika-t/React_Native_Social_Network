import { View, Text, Image } from 'react-native';

const PostListItem = (props) => {
    const { title, description, img } = props;
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
            <Text>Комментарии</Text>

        </View>
    )
}

export default PostListItem;

