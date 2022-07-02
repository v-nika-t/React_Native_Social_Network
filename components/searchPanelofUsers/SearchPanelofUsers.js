
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'

import { TextInput, Image, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';


import styles from './styleSearchPanelofUsers';
import { User } from '../../services/SocialNetworkServices';
import { addFoundUsers } from '../../actions/user.action';

const SearchPanelofUsers = (props) => {
    const service = User;
    const pathImage = '../../assets/spinner.gif';
    const [loading, setLoading] = useState(false);

    const spinner = loading ? <Image source={require(pathImage)} /> : null;

    const [search, setSearch] = useState('');
    const { allUsers, foundUsers } = useSelector(state => state.user);
    const { id } = useSelector(state => state.auth.dataAccount);
    const dispatch = useDispatch();

    const onChangeSearch = (value) => {
        setSearch(value);
        setLoading(true);

        const reg = new RegExp("^" + value, 'i');

        const foundInAllUsers = allUsers.filter(item => ((item.user_name.search(reg) !== -1) && (item.id !== id)))
        const foundInFoundUsers = foundUsers.filter(item => ((item.user_name.search(reg) !== -1) && (item.id !== id)))

        if (foundInAllUsers.length == 0 || foundInFoundUsers.length !== 0) {
            service.getAll().then(data => data.filter(item => ((item.user_name.search(reg) !== -1) && (item.id !== id)))
            ).then(data => dispatch(addFoundUsers(data)));
            setLoading(false)
            return;
        }

        foundInAllUsers.length !== 0 ? dispatch(addFoundUsers(foundInAllUsers)) : dispatch(addFoundUsers(foundInFoundUsers))
        setLoading(false);
    }

    return (
        <View>
            <TextInput style={styles.input} placeholder='Поиск' value={search} onChangeText={onChangeSearch} />
            <ScrollView>
                {props.children}
                <View style={styles.container}>
                    {spinner}
                </View>
            </ScrollView>

        </View>
    )
}
export default SearchPanelofUsers;
