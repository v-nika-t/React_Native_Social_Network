 import { DataAccountOfUser } from './action.auth.types';
 import { IOnePost } from './action.post.types';
 import { OneUser } from './action.user.types';
 import store from '../../store/store';

export interface IStateAuth {
    signIn: boolean,
    isAdmin:  boolean,
    dataAccount:  DataAccountOfUser | {},
}

export type TStatePost = Array<IOnePost>;

export interface IStateUser {
    allUsers: Array<OneUser>, 
    foundUsers: Array<OneUser>, 
    spinner: boolean 
}

export interface ICommonState {
    auth:IStateAuth,
    post: TStatePost | [],
    user:  IStateUser
} 

export type RootState = ReturnType<typeof store.getState>;

