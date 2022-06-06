import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, EvilIcons, SimpleLineIcons, Fontisto } from '@expo/vector-icons';

import styles from './stylePostLisyItem';

const PostListItem = (props) => {
    const { user, title, description, img, navigation, likes, url, ext, id, date } = props;
    const pathImg = url + '/' + img + '.' + ext;

    const addLike = (idComment) => {
        console.log(idComment);
    }

    return (
        <View>
            <Text >
                <AntDesign name="user" size={20} color="black" />
                <Text style={[{ fontWeight: 'bold' }, styles.text]}> {user.user_name} </Text>
            </Text>
            <View >
                <Image
                    source={{ uri: pathImg }}
                    style={{ width: 400, height: 400 }}
                />
                <View>
                    <Text style={styles.text} >{title}</Text>
                    <Text style={styles.text}>{description}</Text>
                    <View style={styles.container}  >
                        <TouchableWithoutFeedback onPress={() => addLike(id)}>
                            <SimpleLineIcons name="like" size={20} color='black' />
                        </TouchableWithoutFeedback>
                        <Text style={[{ color: 'green' }, styles.text]} > {likes}  </Text>
                        <Fontisto name="date" size={20} color="black" />
                        <Text style={[{ fontStyle: 'italic' }, styles.text]}> {date} </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('comments', { postId: id })}>
                            <EvilIcons name="comment" size={28} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>



        </View>
    )
}



export default PostListItem;
