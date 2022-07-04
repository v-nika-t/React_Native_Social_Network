import { IS_SPINNER, DELETE_USER, EDIT_USER, ADD_ONE_USER, ADD_FOUND_USERS, ADD_USERS } from '../constants/action.constants';
import {IIsSpinner, IRemoveUser, IAddFoundUsers, IEditUser, IAddUser, OneUser} from '../types/action.types/action.user.types';

export const addUser = (data: Array<OneUser>, one: boolean = false):IAddUser => {
    return {
        type: one ? ADD_ONE_USER : ADD_USERS,
        payload: data,
    }
}

export const editUser = (data: OneUser): IEditUser => {
    return {
        type: EDIT_USER,
        payload: data,
    }
}

export const addFoundUsers = (data: Array<OneUser>):IAddFoundUsers => {
    return {
        type: ADD_FOUND_USERS,
        payload: data,
    }
}

export const removeUser = (id:string):IRemoveUser => {
    return {
        type: DELETE_USER,
        payload: { id }
    }
}

export const isSpinner = (data:boolean):IIsSpinner => {
    return {
        type: IS_SPINNER,
        payload: data,
    }
}

