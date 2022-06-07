import { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, EvilIcons, SimpleLineIcons, Fontisto } from '@expo/vector-icons';
import styles from './stylePostLisyItem';

const PostListItem = (props) => {
    const { Owner_posts, Users_added_like_to_post, title, description, img, navigation, url, ext, id, date, service } = props;
    const pathImg = url + '/' + img + '.' + ext;
    const count_likes = Users_added_like_to_post.length
    const user_name = '1_user_name';
    const userId = 1;

    const [isLike, setIsLike] = useState(Users_added_like_to_post.some(item => (item.user_name == user_name)))

    const addLike = (postId) => {
        if (Owner_posts.user_name == user_name) { return }
        if (isLike) {
            service.deleteLike({ userId: userId, postId: postId });
            setIsLike(false);
        } else {
            service.addLike({ userId: userId, postId: postId });
            setIsLike(true);
        }
    }
    return (
        <View>
            <Text >
                <AntDesign name="user" size={20} color="black" />
                <Text style={[{ fontWeight: 'bold' }, styles.text]}> {Owner_posts.user_name} </Text>
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
                            <SimpleLineIcons name="like" size={20} color={isLike ? 'red' : 'black'} />
                        </TouchableWithoutFeedback>
                        <Text style={[{ color: 'green' }, styles.text]} > {count_likes}  </Text>
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
