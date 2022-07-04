import { EDIT_DATA_ACCOUNT, ADD_DATA_ACCOUNT, IS_ADMIN, IS_USER, LOG_OUT, SIGN_IN } from '../../constants/action.constants';

//Store

export interface DataAccountOfUser {
    canAllSeeAccount: boolean,
    email: string,
    id: string,
    password: string,
    roleId: number,
    user_name: string,
    authorization?: string,
    role?: {name: string} ,
    "role.name"?: string
}

export interface IStateAuth {
    signIn: boolean,
    isAdmin:  boolean,
    dataAccount:  DataAccountOfUser | {},
}

// Actions
export  interface IAuth { 
    type: typeof LOG_OUT | typeof SIGN_IN,
}

export  interface IChangeRole { 
    type: typeof IS_ADMIN | typeof IS_USER,
}

export  interface IAddDataAccount { 
    type: typeof ADD_DATA_ACCOUNT,
    payload: DataAccountOfUser
}

export  interface IEditDataAccount {
    type: typeof EDIT_DATA_ACCOUNT,
    payload: Partial<DataAccountOfUser>
}

export type AuthActionTypes =  IAuth |IChangeRole |  IAddDataAccount | IEditDataAccount  ;