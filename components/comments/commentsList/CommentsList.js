import { Text, Button, TextInput, Image, FlatList, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import styles from './styleCommentList';

const CommentsList = ({ route }) => {
    const service = new SocialNetworkServices('comment');
    const pathImage = '../../../assets/spinner.gif';
    const idNews = route.params.postId;

    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [text, onChangeText] = useState('');

    useEffect(() => {
        service.getAll({ id: idNews })
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const addComment = () => {
        service.add({ description: text, date: new Date() })
        setSave(save => !save);
        onChangeText('');
    }

    const addLike = (idComment) => {
        setColor('red');
        console.log(idNews, idComment);
    }
    const Comments = (props) => {

        return (
            <FlatList
                data={props.data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View >
                            <Text>
                                <AntDesign name="user" size={20} color="black" />
                                <Text style={{ fontWeight: 'bold' }}> {item.user.user_name} </Text>
                                <Text style={{ fontStyle: 'italic' }}>{item.date} </Text>
                            </Text>
                            <Text>{item.description}</Text>
                            <Text>
                                <TouchableWithoutFeedback onPress={() => addLike(item.id)}>
                                    <SimpleLineIcons name="like" size={20} color='black' />
                                </TouchableWithoutFeedback>
                                <Text> {item.likes} </Text>
                            </Text>
                        </View>
                    )
                }}
            />
        )
    }

    const spinner = loading ? <Image style={{ marginTop: 200 }} source={require(pathImage)} /> : null
    const content = data ? <Comments data={data} /> : null
    let id = 1;

    return (
        <>
            {spinner}
            {content}
            <TextInput
                onChangeText={onChangeText}
                value={text}
                placeholder='Коментарий'
            />
            <Button onPress={addComment} title="Добавить" />

        </>
    )
}

export default CommentsList;