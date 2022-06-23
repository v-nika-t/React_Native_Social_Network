
import { Text, TextInput, Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather } from '@expo/vector-icons';

import { addUser, removeUser } from '../../../actions/user.action';
import { User } from '../../../services/SocialNetworkServices';
import styles from './styleStartPageAllUsers';

const StartPageAllUsers = ({ navigation, route }) => {
    const pathImage = '../../../assets/spinner.gif';

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [foundUsers, setFoundUser] = useState('');
    const service = User;

    useEffect(() => {
        service.getAll()
            .then(data => dispatch(addUser(data)))
            .then(setLoading(false))
    }, []);

    useFocusEffect(
        useCallback(() => {
            setFoundUser('');
            setSearch('')
        }, [])
    )

    const onChangeSearch = (value) => {
        setSearch(value);
        const reg = new RegExp("^" + value, 'i');
        const searchUser = users.filter(item => item.user_name.search(reg) !== -1)
        if (searchUser.length !== 0) {
            setFoundUser(searchUser)
        } else {
            service.getAll()
                .then(data => data.filter(item => item.user_name.search(reg) !== -1))
                .then(data => setFoundUser(data))
        }

    }

    const deleteUser = async (userId) => {
        const deleteId = await service.delete(userId);
        search ? setFoundUser(foundUsers => foundUsers.filter(item => item.id !== userId)) : null;
        dispatch(removeUser(deleteId))
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

    const people = foundUsers ? foundUsers : users;
    const content = people ? people.map(item => (
        <>
            <View key={item.id} style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    <AntDesign name="user" size={30} color="black" />
                    <Text style={{ fontWeight: 'bold' }}> {item.user_name} </Text>
                    <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('editUser', { userId: item.id })}>
                        <Feather name="edit" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </Text>
                <View >
                    <TouchableWithoutFeedback onPress={() => deleteUser(item.id)}>
                        <AntDesign name="delete" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    )) : null
    return (
        <>
            <TextInput style={styles.input} placeholder='Поиск' value={search} onChangeText={onChangeSearch} />
            <ScrollView style={{ marginTop: 10 }}>
                {spinner}
                {content}
            </ScrollView>
        </>
    )
}

export default StartPageAllUsers;


