import { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import PostListItem from '../postListItem/PostsListItem';

const PostList = ({ navigation }) => {
    const service = new SocialNetworkServices('post');
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        service.getAll()
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const spinner = loading ? <Image source={require(pathImage)} /> : null
    const posts = data ? data.map(item => (<PostListItem navigation={navigation} key={item.id} {...item} />)) : null

    return (
        <View>
            {spinner}
            {posts}
        </View>
    )
}

export default PostList;

