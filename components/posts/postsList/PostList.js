import { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

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
    const content = data ? data.map(item => (<PostListItem navigation={navigation} key={item.id} {...item} url={service.URL_WITH_PORT} service={service} />)) : null

    return (
        <ScrollView>
            {spinner}
            {content}
        </ScrollView>
    )
}

export default PostList;

