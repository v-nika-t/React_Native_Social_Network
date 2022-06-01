import { Text, Button, TextInput, Image, FlatList } from "react-native";
import { useState, useEffect } from 'react';

import SocialNetworkServices from '../../../services/SocialNetworkServices';

const CommentsList = () => {

    const service = new SocialNetworkServices('comment');
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [text, onChangeText] = useState('');

    useEffect(() => {
        service.getAll()
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const addComment = () => {
        service.add({ description: text, date: '28/05' });
        onChangeText('');
    }
    const Comments = (props) => {
        return (
            <FlatList
                data={props.data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <>
                            <Text>vt@vdhfv.ru</Text>
                            <Text>{item.description} {item.date}</Text>
                        </>
                    )
                }}
            />
        )
    }

    const spinner = loading ? <Image style={{ marginTop: 200 }} source={require(pathImage)} /> : null
    const content = data ? <Comments data={data} /> : null

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