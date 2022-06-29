
import { Text, Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather } from '@expo/vector-icons';

import SearchPanelofUsers from "../../searchPanelofUsers/SearchPanelofUsers";
import { removeUser } from '../../../actions/user.action';
import { User } from '../../../services/SocialNetworkServices';
import styles from './styleStartPageAllUsers';

const StartPageAllUsers = ({ navigation }) => {

    const { foundUsers } = useSelector(state => state.user);
    const service = User;
    const dispatch = useDispatch();

    const deleteUser = async (userId) => {
        const deleteId = await service.delete(userId);
        dispatch(removeUser(deleteId))
    }

    const content = foundUsers ? foundUsers.map(item => (
        <>
            <View key={item.id} style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    <AntDesign name="user" size={30} color="black" />
                    <Text style={{ fontWeight: 'bold' }}> {item.user_name} </Text>
                    <TouchableWithoutFeedback onPress={() => navigation.getParent('StackNavigator').navigate('editUser', item)}>
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
            <SearchPanelofUsers >
                {content}
            </SearchPanelofUsers>
        </>
    )
}

export default StartPageAllUsers;
