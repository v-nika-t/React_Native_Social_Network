import { Text, Button, TextInput, Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SimpleLineIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import styles from './styleCommentList';

const CommentsList = ({ route }) => {
    const service = new SocialNetworkServices('comment');
    const pathImage = '../../../assets/spinner.gif';
    const postId = route.params.postId;

    const user = useSelector(state => state.user);

    const userId = user.id;
    const user_name = user.user_name;

    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');

    useEffect(() => {
        service.getAll({ id: postId })
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const addComment = async () => {
        const res = await service.add({ description: text, userId, postId });
        setData(data => [{
            ...res, "Owner_comments": {
                "id": userId,
                user_name,
            }
        }, ...data]);
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
            const [block, setBlock] = useState(false);

            const addLike = (commentId, Owner_comments) => {
                if (Owner_comments == userId) { return }
                setBlock(true);
                if (isLike) {
                    service.deleteLike({ userId, commentId }).then(data => {
                        setIsLike(false);
                        setCountLikes(countLikes => --countLikes);
                        setBlock(false);
                    });
                } else {
                    service.addLike({ userId, commentId }).then(data => {
                        setIsLike(true);
                        setCountLikes(countLikes => ++countLikes);
                        setBlock(false);
                    })
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
                <View key={item.id}  >
                    <Text style={{ fontSize: 20 }}>
                        <AntDesign name="user" size={20} color="black" />
                        <Text style={{ fontWeight: 'bold' }}> {item.Owner_comments.user_name} </Text>
                        <Text style={{ fontStyle: 'italic' }}>{item.date} </Text>
                    </Text>
                    {!edit ? (
                        <View style={styles.container}>
                            <Text style={{ fontSize: 20 }}>{item.description}</Text>
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
                                style={styles.input}
                            />
                            <TouchableWithoutFeedback onPress={() => changeComment(item.id)}>
                                <Ionicons name="checkmark-circle" size={24} color="green" />
                            </TouchableWithoutFeedback>

                        </View>
                    )}
                    <Text>
                        <TouchableWithoutFeedback onPress={() => block ? null : addLike(item.id, item.Owner_comments.id)}>
                            <SimpleLineIcons name="like" size={25} color={isLike ? 'red' : 'black'} />
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 20 }}> {countLikes} </Text>
                    </Text>
                </View>
            )
        }
        ) : null;
    }
    const spinner = loading ? (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image source={require(pathImage)} />
        </View>
    ) : null;
    const content = data ? <Comments data={data} changeDate={changeDate} /> : null

    return (
        <>
            <TextInput
                onChangeText={setText}
                value={text}
                placeholder='Коментарий'
                style={styles.input}
            />
            <Button onPress={addComment} title="Добавить" />
            <ScrollView style={{ marginTop: 10 }}>
                {spinner}
                {content}
            </ScrollView>

        </>
    )
}

export default CommentsList;