import { useState, useCallback } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { add } from '../../../actions/post.action';
import { Post } from '../../../services/SocialNetworkServices';
import PostListItem from '../postListItem/PostsListItem';

const PostList = ({ navigation, route }) => {
    const service = Post;
    const pathImage = '../../../assets/spinner.gif';
    const [loading, setLoading] = useState(true);
    const { id } = useSelector(state => state.user);
    const post = useSelector(state => state.post);
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            const queryParams = route.name == 'ownPost' ? { id } : '';
            service.getAll(queryParams)
                .then(data => dispatch(add(data)))
                .then(setLoading(false));
            if (route.name !== 'ownPost') {
                return () => dispatch(add([]))
            }
        }, [])
    );

    const spinner = loading ? (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image source={require(pathImage)} />
        </View>
    ) : null;

    const content = post ? post.map(item => {
        return (
            <PostListItem
                navigation={navigation}
                key={item.id}
                {...item}
                canDelete={route.name == 'ownPost' ? true : false}
            />
        )
    }) : null;
    return (
        <ScrollView style={{ flex: 1 }}>
            {spinner}
            {content}
        </ScrollView>


    )
}

export default PostList;
