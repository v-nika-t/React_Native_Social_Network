import { EDIT_DATA_ACCOUNT, ADD_DATA_ACCOUNT, IS_ADMIN, IS_USER, LOG_OUT, SIGN_IN } from '../constants/action.constants';
import {DataAccountOfUser, IAuth, IChangeRole, IAddDataAccount, IEditDataAccount} from '../types/action.types/action.auth.types';

export const auth = (SIGN_IN_ACCOUNT: boolean): IAuth => {
    return { type: SIGN_IN_ACCOUNT ? SIGN_IN : LOG_OUT }
}

export const changeRole = (role: string): IChangeRole => {
    return { type: role == 'admin' ? IS_ADMIN : IS_USER }
}

export const addDataAccount = (data: DataAccountOfUser):IAddDataAccount => {
    return {
        type: ADD_DATA_ACCOUNT,
        payload: data,
    }
}

export const editDataAccount = (data: Partial<DataAccountOfUser>):IEditDataAccount => {
    return {
        type: EDIT_DATA_ACCOUNT,
        payload: data,
    }
}

