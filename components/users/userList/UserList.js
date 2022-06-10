import { Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styleUserList';
import SocialNetworkServices from '../../../services/SocialNetworkServices';


const UsertList = () => {
    const service = new SocialNetworkServices('user');
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('friends');
    const [search, setSearch] = useState('');

    const [isFriend, setIsFriend] = useState(true);


    const activColor = 'rgba(7, 186, 133, 1)';
    const notActiveColor = 'rgba(7, 186, 133, 0.5)';

    const id = 1;


    useEffect(() => {
        service.getAll({ id: id })
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const filterUsers = (data) => {
        switch (filter) {
            case 'friends':
                return data.filter(item => item.status)
            case 'subscriber':
                return data.filter(item => !item.status)
            default:
                return data
        }
    }

    const searchUsers = (data) => {
        const reg = new RegExp("^" + search, 'i');
        return data.filter((item) => {
            return item.user_name ? item.user_name.search(reg) !== -1 : data
        })

    }

    const spinner = loading ? <Image source={require(pathImage)} /> : null
    const content = data ? filterUsers(searchUsers(data)).map(item => {
        const user_name = item.user ? item.user.user_name : item.user_name;
        let nameIcon = isFriend ? 'closecircle' : 'checkcircle';
        let color = isFriend ? 'red' : 'green';

        if (item.subscriber) {
            const isChum = item.subscriber.some(element => (element.friend.userId == id) && element.friend.status);
            nameIcon = isChum ? 'checkcircle' : 'closecircle';
            color = isChum ? 'green' : 'red';
        }
        return (
            <View key={item.id} style={[styles.container]}>
                <Text style={[styles.text]}>{user_name}</Text>
                <TouchableWithoutFeedback onPress={() => changeStatus(item.user.id)}>
                    <AntDesign style={{ marginLeft: 10 }} name={nameIcon} size={26} color={color} />
                </TouchableWithoutFeedback>
            </View>
        )
    }) : null


    const changeStatus = (id_user) => {
        console.log(id_user);

    }

    const onChangeSearch = (value) => {
        setSearch(value);
        setFilter('');
        if (value.length > 3) {
            service.getAll()
                .then(data => {
                    setData(data);


                })
                .then(setLoading(false))
        }
    }

    const changeFilter = async (filter = "") => {
        await service.getAll({ id: id })
            .then(data => setData(data))
        setLoading(false);
        setFilter(filter);
        setFilter(filter);
        setSearch("");
        filter == 'friends' ? setIsFriend(true) : setIsFriend(false)

    }

    console.log(data);

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

