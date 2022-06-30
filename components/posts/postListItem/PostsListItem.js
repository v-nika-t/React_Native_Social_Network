import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, EvilIcons, SimpleLineIcons, Fontisto, Feather } from '@expo/vector-icons';

import { Post } from '../../../services/SocialNetworkServices';
import { remove } from '../../../actions/post.action';
import styles from './stylePostLisyItem';

const PostListItem = (props) => {

    const { Users_added_like_to_post, title, description, img, id, date } = props;
    const { navigation, canDelete } = props;

    let { Owner_posts } = props;
    Owner_posts == null ? Owner_posts = 'delete_User' : null;

    const service = Post;
    const pathImg = service.URL_WITH_PORT + '/' + img;
    const user = useSelector(state => state.auth.dataAccount);


    const dispatch = useDispatch();

    const user_name = user.user_name;
    const userId = user.id;

    const [isLike, setIsLike] = useState(Users_added_like_to_post.some(item => (item.user_name == user_name)))
    const [countLikes, setCountLikes] = useState(Users_added_like_to_post.length);

    const addLike = (postId) => {
        if (Owner_posts.user_name == user_name) { return }
        if (isLike) {
            service.deleteLike({ userId: userId, postId: postId });
            setCountLikes(countLikes => --countLikes)
            setIsLike(false);
        } else {
            service.addLike({ userId: userId, postId: postId });
            setIsLike(true);
            setCountLikes(countLikes => ++countLikes)
        }
    }

    const deletePost = async (postId) => {
        const res = await service.delete(postId);
        dispatch(remove(res.id))
    }

    return (
        <View>
            <View style={styles.headerPost}>
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name="user" size={20} color="black" />
                    <Text style={[{ fontWeight: 'bold' }, styles.text]}> {Owner_posts.user_name} </Text>
                </View>
                {canDelete ? (
                    <View style={{ flexDirection: "row" }}>
                        <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('editPost', { title, description, id })}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => deletePost(id)}>
                            <AntDesign name="delete" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}

            </View>
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
                        <Text style={[{ color: 'green' }, styles.text]} > {countLikes}  </Text>
                        <Fontisto name="date" size={20} color="black" />
                        <Text style={[{ fontStyle: 'italic' }, styles.text]}> {date} </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('comments', { postId: id })}>
                            <EvilIcons name="comment" size={28} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View >
    )

}



export default PostListItem;
