import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, EvilIcons, SimpleLineIcons, Fontisto } from '@expo/vector-icons';

const PostListItem = (props) => {
    const { user, title, description, img, navigation, likes, url, ext, id, date } = props;
    const pathImg = url + '/' + img + '.' + ext;

    const addLike = (idComment) => {
        console.log(idComment);
    }

    return (
        <View>
            <Text>
                <AntDesign name="user" size={20} color="black" />
                <Text style={{ fontWeight: 'bold' }}> {user.user_name} </Text>
            </Text>
            <View style={{ flexDirection: "row" }}>
                <Image
                    source={{ uri: pathImg }}
                    style={{ width: 200, height: 200 }}
                />
                <View>
                    <Text>{title}</Text>
                    <Text>{description}</Text>
                    <Text>
                        <TouchableWithoutFeedback onPress={() => addLike(id)}>
                            <SimpleLineIcons name="like" size={20} color='black' />
                        </TouchableWithoutFeedback>
                        <Text style={{ color: 'green', marginLeft: '100px' }} > {likes}  </Text>
                        <Fontisto name="date" size={20} color="black" />
                        <Text style={{ fontStyle: 'italic' }}> {date} </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('comments', { postId: id })}>
                            <EvilIcons name="comment" size={28} color="black" />
                        </TouchableWithoutFeedback>
                    </Text>
                </View>
            </View>



        </View>
    )
}



export default PostListItem;
