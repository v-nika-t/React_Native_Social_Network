import { IStateUser, UserActionTypes, OneUser} from '../types/action.types/action.user.types';

const reducer = (state: IStateUser = { allUsers: [], foundUsers: [], spinner: true }, action: UserActionTypes) => {
    switch (action.type) {
        case 'ADD_USERS':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'ADD_FOUND_USERS':
            return {
                ...state,
                foundUsers: action.payload
            }
        case 'ADD_ONE_USER':
            return {
                ...state,
                allUsers: [
                    action.payload,
                    ...state.allUsers,
                ],
                foundUsers: [
                    action.payload,
                    ...state.foundUsers,
                ]
            }
        case 'EDIT_USER':
            return {
                ...state,
                foundUsers: state.foundUsers.map((item: OneUser) => item.id == action.payload.id ? action.payload : item),
                allUsers: state.allUsers.map((item: OneUser) => item.id == action.payload.id ? action.payload : item)
            }
        case 'DELETE_USER':
            return {
                ...state,
                foundUsers: state.foundUsers.filter((item: OneUser) => item.id !== action.payload.id),
                allUsers: state.allUsers.filter((item: OneUser) => item.id !== action.payload.id)
            }
        case 'IS_SPINNER':
            return {
                ...state,
                spinner: action.payload
            }
        default: return state
    }

}

export default reducer;