import { Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styleUserList';
import { User } from '../../../services/SocialNetworkServices';

const UsertList = () => {
    const service = User;
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('friends');
    const [search, setSearch] = useState('');

    const user = useSelector(state => state.auth.dataAccount);

    const activColor = 'rgba(7, 186, 133, 1)';
    const notActiveColor = 'rgba(7, 186, 133, 0.5)';

    const userId = user.id;

    useEffect(() => {
        service.getAll({ id: userId })
            .then(data => {
                setData(data)
            })
            .then(setLoading(false))
    }, []);

    const filterUsers = (data) => {
        switch (filter) {
            case 'friends':
                return data.friend
            case 'subscriber':
                return data.subscriber
            default:
                return searchedUsers
        }
    }

    const searchFilter = (data, reg) => {
        const isRequestInFriend = data.requestInFriend[0].subscriber.filter(item => item.user_name.search(reg) !== -1 && !item.friend.status)
        if (isRequestInFriend.length !== 0) { return isRequestInFriend }

        const isFriend = data.friend.filter(item => item.user.user_name.search(reg) !== -1)
        if (isFriend.length !== 0) { return isFriend }

        const isSubscriber = data.subscriber.filter(item => item.user.user_name.search(reg) !== -1)
        if (isSubscriber.length !== 0) { return isSubscriber };

        return [];
    }

    const onChangeSearch = (value) => {
        setSearch(value);
        setFilter('search');

        const reg = new RegExp("^" + value, 'i');
        const result = searchFilter(data, reg);
        result.length == 0 ? service.getAll()
            .then(data => data.filter(item => item.user_name.search(reg) !== -1))
            .then(data => setSearchedUsers(data)) : setSearchedUsers(result)
    }
    const spinner = loading ? <Image source={require(pathImage)} /> : null;
    const content = data ? filterUsers(data).map(item => {

        const user_name = item.user ? item.user.user_name : item.user_name;
        const id_other_user = item.user ? item.user.id : item.id;

        let isFriend = false;
        let isSubscriber = false;
        let isRequest = false;

        let nameIcon = 'adduser';
        let color = 'black';

        item.friend ? isRequest = true : null;
        item.user ? item.status ? isFriend = true : isSubscriber = true : null;

        isFriend ? nameIcon = 'closecircle' : null;
        isFriend ? color = 'red' : null;

        isSubscriber ? nameIcon = 'checkcircle' : null;
        isSubscriber ? color = 'green' : null;

        return (
            <View key={item.id} style={[styles.container]}>
                <Text style={[styles.text]}>{user_name}</Text>
                {isRequest ? (
                    <TouchableWithoutFeedback onPress={() => changeStatus(id_other_user, user_name, isFriend, isSubscriber, isRequest)}>
                        <Text style={[styles.text, { color: 'green', marginLeft: 20 }]}>Удалить запрос</Text>
                    </TouchableWithoutFeedback>
                ) : (
                    <TouchableWithoutFeedback onPress={() => changeStatus(id_other_user, user_name, isFriend, isSubscriber, isRequest)}>
                        <AntDesign style={{ marginLeft: 10 }} name={nameIcon} size={26} color={color} />
                    </TouchableWithoutFeedback>
                )}
            </View>
        )
    }) : null


    const changeStatus = async (friendId, user_name, isFriend, isSubscriber, isRequest) => {
        const result = await isFriend ? service.deleteFriend(friendId, { userId }) : (
            isSubscriber ? service.addFriend({ friendId, userId }) : (
                isRequest ? service.deleteRequestInFriend(friendId, { userId }) : service.addRequestInFriend({ userId: friendId, friendId: userId })
            ))

        if (await result == 'done') {
            if (isFriend) {
                setData(data => {
                    const requestInFriend = data.requestInFriend[0].subscriber.filter(item => item.friend.userId !== friendId);
                    const friend = data.friend.filter(item => item.user.id !== friendId);
                    const subscriber = [...data.subscriber, {
                        "status": false,
                        "user": {
                            "user_name": user_name,
                            "id": friendId
                        }
                    }]
                    return { 'requestInFriend': [{ subscriber: requestInFriend }], friend, subscriber };
                });
                return
            }

            if (isSubscriber) {
                setData(data => {
                    const requestInFriend = [...data.requestInFriend[0].subscriber, {
                        "user_name": user_name,
                        "id": friendId,
                        "friend": {
                            status: true,
                            userId,
                            friendId
                        }
                    }];
                    const subscriber = data.subscriber.filter(item => item.user.id !== friendId);
                    const friend = [...data.friend, {
                        "status": true,
                        "user": {
                            "user_name": user_name,
                            "id": friendId
                        }
                    }];
                    return { 'requestInFriend': [{ subscriber: requestInFriend }], friend, subscriber };
                });
                return
            }

            if (!isRequest) {
                setData(data => {
                    const requestInFriend = [...data.requestInFriend[0].subscriber, {
                        "user_name": user_name,
                        "id": friendId,
                        "friend": {
                            status: false,
                            userId,
                            friendId
                        }
                    }];
                    return { 'requestInFriend': [{ subscriber: requestInFriend }], friend: data.friend, subscriber: data.subscriber };
                });

                setSearchedUsers([{
                    "user_name": user_name,
                    "id": friendId,
                    "friend": {
                        status: false,
                        userId,
                        friendId
                    }
                }])
            } else {
                setData(data => {
                    const requestInFriend = data.requestInFriend[0].subscriber.filter(item => item.friend.userId !== friendId);
                    return { 'requestInFriend': [{ subscriber: requestInFriend }], friend: data.friend, subscriber: data.subscriber };
                });

                setSearchedUsers([{
                    "user_name": user_name,
                    "id": friendId
                }])

            }

        }
    }

    const changeFilter = async (filter = "") => {
        setLoading(false);
        setFilter(filter);
        setSearch("");
    }

    return (
        <>
            <View style={{ flexDirection: "row" }}>
                <TouchableWithoutFeedback onPress={() => changeFilter('friends')}>
                    <FontAwesome style={styles.item} name="users" size={40} color={filter === 'friends' ? activColor : notActiveColor} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeFilter('subscriber')}>
                    <FontAwesome style={styles.item} name="user-plus" size={40} color={filter === 'subscriber' ? activColor : notActiveColor} />
                </TouchableWithoutFeedback>
                <TextInput style={styles.input} placeholder='Поиск' value={search} onChangeText={onChangeSearch} />
            </View>
            <ScrollView >
                {spinner}
                {content}
            </ ScrollView>
        </>
    )
}
export default UsertList;
