import { View } from 'react-native';

import news from '../../../DB_NEWS';
import PostListItem from '../postListItem/PostsListItem';

const PostList = () => {
    const arrayNews = news.map(item => (<PostListItem key={item.id} {...item} />));
    return (
        <View>
            {arrayNews}
        </View>
    )
}

export default PostList;

