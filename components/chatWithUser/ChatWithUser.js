import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { useState } from 'react';
import socket from '../../socket/socket'
import { Chat } from '../../services/SocialNetworkServices';

import styles from './styleChatWithUser';

const ChatWithUser = ({ route }) => {
    const service = Chat;

    const [text, setText] = useState('');
    const [idChat, setIdChat] = useState('');

    const { id, user_name } = useSelector(state => state.auth.dataAccount);
    const { user_name_other_user, id_other_user } = route.params;
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        service.createChat({ firstUserId: id, secondUserId: id_other_user }).then((data) => {
            socket.emit('CHAT', { idChat: data["idChat"], id });
            setIdChat(data["idChat"]);
            setMessages(data["messages"]);
        });
        socket.on('GET_MESSAGE', (newMessage) => {
            setMessages((message => [
                newMessage,
                ...message,
            ]))
        })
        socket.on('ONLINE', (firstUserId) => {
            console.log("firstUserId: ", firstUserId)
        })

        /* return (socket.on()) */
    }, []);
    const sentMessage = () => {
        socket.emit('SENT_MESSAGE', {
            message: text,
            userId: id,
            chatId: idChat,
            'Owner_Messages.user_name': user_name,
            'Owner_Messages.id': id
        });
        setText('');
    }
    const content = messages ? messages.map(item => {
        return (
            <View key={item.id} >
                <Text style={{ fontSize: 20 }}>
                    <AntDesign name="user" size={20} color="black" />
                    <Text style={{ fontWeight: 'bold' }}> {item['Owner_Messages.user_name']} </Text>
                    <Text style={{ fontStyle: 'italic' }}>{item.date} </Text>
                </Text>
                <View style={styles.container}>
                    <Text style={{ fontSize: 20 }}>{item.message}</Text>
                </View>
            </View>
        )
    }) : ''

    return (
        <>
            <ScrollView >
                {content}
            </ScrollView>
            <TextInput
                onChangeText={setText}
                value={text}
                placeholder='Введите сообщение'
                style={styles.input}
            />
            <Button onPress={sentMessage} title="Отправить" />
        </>
    )
}
export default ChatWithUser;
