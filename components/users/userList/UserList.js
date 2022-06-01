import { Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import UserListItem from '../userListItem/UserListItem';
import SearchPanel from '../searchPanel/SearchPanel';
import UserFilter from '../userFilter/UserFilter';
import SocialNetworkServices from '../../../services/SocialNetworkServices';


const UsertList = () => {
    const service = new SocialNetworkServices('user');
    const pathImage = '../../../assets/spinner.gif';
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getAll()
            .then(data => setData(data))
            .then(setLoading(false))
    }, []);

    const spinner = loading ? <Image source={require(pathImage)} /> : null
    const content = data ? data.map(item => (<UserListItem key={item.id} {...item} />)) : null


    return (
        <>
            <SearchPanel />
            <UserFilter />
            <ScrollView>
                {spinner}
                {content}
            </ ScrollView>
        </>
    )
}
export default UsertList;

