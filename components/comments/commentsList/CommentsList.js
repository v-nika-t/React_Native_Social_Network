import { Text, Button, TextInput, Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { SimpleLineIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';

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
        const res = await service.add({ description: text, userId: userId, postId: postId });
        setData(data => [...data, { ...res, user: { user: "1_user_name" } }]);
        setText('');
    }

    const changeDate = (action, id, newDate = '') => {
        switch (action) {
            case 'delete':
                setData((data) => {
                    return data.filter(item => item.id !== id)
                })
                break;
            case 'edit':
                setData((data) => {
                    return data.map(item => item.id == id ? { ...item, ...newDate } : item)
                })
                break;
            default:
                break;
        }
    }

    const Comments = (props) => {
        const { data, changeDate } = props;
        return data ? data.map(item => {
            const [isLike, setIsLike] = useState(item.Users_added_like_to_comment.some(item => (item.user_name == user_name)));
            const [edit, setEdit] = useState(false);
            const [editComment, setEditComment] = useState(item.description);
            const [countLikes, setCountLikes] = useState(item.Users_added_like_to_comment.length);

            const addLike = (commentId) => {
                if (item.Owner_comments.id == userId) { return }
                if (isLike) {
                    service.deleteLike({ userId: userId, commentId: commentId });
                    setIsLike(false);
                    setCountLikes(countLikes => --countLikes)
                } else {
                    service.addLike({ userId: userId, commentId: commentId });
                    setIsLike(true);
                    setCountLikes(countLikes => ++countLikes)
                }
            }
            const changeComment = (commentId) => {
                service.edit(commentId, { description: editComment })
                changeDate('edit', commentId, { description: editComment });
                setEdit(false)
            }
            const deleteComment = (commentId) => {
                service.delete(commentId);
                changeDate('delete', commentId);
            }

            return (
                <View key={item.id} >
                    <Text>
                        <AntDesign name="user" size={20} color="black" />
                        <Text style={{ fontWeight: 'bold' }}> {item.Owner_comments.user_name} </Text>
                        <Text style={{ fontStyle: 'italic' }}>{item.date} </Text>
                    </Text>
                    {!edit ? (
                        <View style={styles.container}>
                            <Text>{item.description}</Text>
                            <View>
                                {(user_name == item.Owner_comments.user_name) && !edit ? (
                                    <View style={styles.container}>
                                        <TouchableWithoutFeedback onPress={() => setEdit(true)}>
                                            <Feather name="edit" size={24} color="black" />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => deleteComment(item.id)}>
                                            <AntDesign name="delete" size={24} color="black" />
                                        </TouchableWithoutFeedback>
                                    </View>

                                ) : null}
                            </View>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <TextInput
                                onChangeText={setEditComment}
                                value={editComment}
                                placeholder='Коментарий'
                            />
                            <TouchableWithoutFeedback onPress={() => changeComment(item.id)}>
                                <Ionicons name="checkmark-circle" size={24} color="green" />
                            </TouchableWithoutFeedback>

                        </View>
                    )}
                    <Text>
                        <TouchableWithoutFeedback onPress={() => addLike(item.Owner_comments.id)}>
                            <SimpleLineIcons name="like" size={20} color={isLike ? 'red' : 'black'} />
                        </TouchableWithoutFeedback>
                        <Text> {countLikes} </Text>
                    </Text>
                </View>
            )
        }
        ) : null;
    }

    const spinner = loading ? <Image style={{ marginTop: 200 }} source={require(pathImage)} /> : null
    const content = data ? <Comments data={data} changeDate={changeDate} /> : null

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