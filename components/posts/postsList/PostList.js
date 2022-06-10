import { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import PostListItem from '../postListItem/PostsListItem';

const PostList = ({ navigation, route }) => {
    const service = new SocialNetworkServices('post');
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = 2;

    useEffect(() => {
        const queryParams = route.name == 'ownPost' ? { id: userId } : '';
        service.getAll(queryParams)
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const deletePost = (id) => {
        setData(data => data.filter(item => item.id !== id));
    }

    /*   const editPost = (id,newData) => {
          setData(data => data.map(item => item.id !== id ? item : newData ));
      } */

    const spinner = loading ? <Image source={require(pathImage)} /> : null
    const content = data ? data.map(item => {
        return (<PostListItem
            navigation={navigation}
            key={item.id}
            {...item}
            service={service}
            canDelete={route.name == 'ownPost' ? true : false}
            deletePost={deletePost}
        />)
    }) : null

    return (
        <ScrollView>
            {spinner}
            {content}
        </ScrollView>
    )
}

export default PostList;

