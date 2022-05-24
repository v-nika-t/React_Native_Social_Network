import { View } from 'react-native';

import users from '../../DB_USERS';
import UserListItem from '../userListItem/UserListItem';
import SearchPanel from '../searchPanel/SearchPanel';
import UserFilter from '../userFilter/userFilter';


const UsertList = () => {
    const arrayUsers = users.map(item => {
        return (
            <>
                <UserListItem key={item.id} {...item} />
            </>
        )
    })
    return (
        <View>
            <SearchPanel />
            <UserFilter />
            {arrayUsers}
        </View>
    )
}
export default UsertList;

