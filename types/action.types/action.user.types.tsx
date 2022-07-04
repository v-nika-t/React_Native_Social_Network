import { IS_SPINNER, DELETE_USER, EDIT_USER, ADD_ONE_USER, ADD_FOUND_USERS, ADD_USERS } from '../../constants/action.constants';

export interface OneUser {
    canAllSeeAccount: boolean,
    email: string,
    id: string,
    password: string,
    role: {name: string} ,
    roleId: number,
    user_name: string,
}

export interface IStateUser {
     allUsers: Array<OneUser>, 
     foundUsers: Array<OneUser>, 
     spinner: boolean 
}

// Actions
 export  interface IAddUser { 
    type: typeof ADD_ONE_USER | typeof ADD_USERS,
    payload: Array<OneUser> 
 }

export  interface IEditUser { 
    type: typeof EDIT_USER,
    payload: OneUser
} 

export  interface IAddFoundUsers { 
    type: typeof ADD_FOUND_USERS,
    payload: Array<OneUser>
}

export  interface IRemoveUser { 
    type: typeof DELETE_USER,
    payload: {id: string}
}

export  interface IIsSpinner { 
    type: typeof IS_SPINNER,
    payload: boolean
}

export type UserActionTypes = IAddUser |  IEditUser | IAddFoundUsers | IRemoveUser | IIsSpinner ;
