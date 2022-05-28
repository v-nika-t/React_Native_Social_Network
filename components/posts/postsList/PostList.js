import { useEffect, useState } from 'react';
import { View } from 'react-native';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import PostListItem from '../postListItem/PostsListItem';
import news from '../../../DB_NEWS';

const PostList = ({ navigation }) => {
    const service = new SocialNetworkServices('post');
    const [posts, setPosts] = useState(news);
    useEffect(() => {
        console.log(service.getAll());

    }, []);

    const arrayNews = posts.map(item => (<PostListItem navigation={navigation} key={item.id} {...item} />));
    /* console.log(service.getAll()); */
    return (
        <View>
            {arrayNews}
        </View>
    )
}

export default PostList;

