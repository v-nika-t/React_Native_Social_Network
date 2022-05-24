import { View } from 'react-native';

import news from '../../../DB_NEWS';
import PostListItem from '../postListItem/PostsListItem';

const PostList = ({ navigation }) => {
    const arrayNews = news.map(item => (<PostListItem navigation={navigation} key={item.id} {...item} />));
    return (
        <View>
            {arrayNews}
        </View>
    )
}

export default PostList;

