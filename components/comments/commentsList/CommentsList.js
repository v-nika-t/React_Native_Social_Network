import { Text, Button, TextInput, Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import styles from './styleCommentList';

const CommentsList = ({ route }) => {
    const service = new SocialNetworkServices('comment');
    const pathImage = '../../../assets/spinner.gif';
    const postId = route.params.postId;
    const userId = 3;
    const user_name = '3_user_name';

    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');


    useEffect(() => {
        service.getAll({ id: postId })
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const addComment = async () => {
        const res = await service.add({ description: text, date: new Date(), userId: userId, postId: postId });
        setData(data => [...data, { ...res, user: { user: "1_user_name" } }]);
        setText('');
    }


    const Comments = (props) => {
        return data ? data.map(item => {
            const [isLike, setIsLike] = useState(item.Users_added_like_to_comment.some(item => (item.user_name == user_name)))

            const addLike = (commentId) => {
                if (item.Owner_comments.id == userId) { return }
                if (isLike) {
                    service.deleteLike({ userId: userId, commentId: commentId });
                    setIsLike(false);
                } else {
                    service.addLike({ userId: userId, commentId: commentId });
                    setIsLike(true);
                }
            }
            return (
                <View key={item.id}>
                    <Text>
                        <AntDesign name="user" size={20} color="black" />
                        <Text style={{ fontWeight: 'bold' }}> {item.Owner_comments.user_name} </Text>
                        <Text style={{ fontStyle: 'italic' }}>{item.date} </Text>
                    </Text>
                    <Text>{item.description}</Text>
                    <Text>
                        <TouchableWithoutFeedback onPress={() => addLike(item.Owner_comments.id)}>
                            <SimpleLineIcons name="like" size={20} color={isLike ? 'red' : 'black'} />
                        </TouchableWithoutFeedback>
                        <Text> {item.Users_added_like_to_comment.length} </Text>
                    </Text>
                </View>
            )
        }

        ) : null;

    }

    const spinner = loading ? <Image style={{ marginTop: 200 }} source={require(pathImage)} /> : null
    const content = data ? <Comments data={data} /> : null

    return (
        <>
            <TextInput
                onChangeText={setText}
                value={text}
                placeholder='Коментарий'
            />
            <Button onPress={addComment} title="Добавить" />
            <ScrollView>
                {spinner}
                {content}
            </ScrollView>

        </>
    )
}

export default CommentsList;