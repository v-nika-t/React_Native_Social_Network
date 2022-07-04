import { ADD_ONE_POST, ADD_POSTS, EDIT_POST, DELETE_POST } from '../constants/action.constants';

import {IOnePost, IAdd, IEdit, IRemove, TEditPost} from '../types/action.types/action.post.types';

export const add = (data: Array<IOnePost>, one:boolean = false): IAdd => {
    return {
        type: one ? ADD_ONE_POST : ADD_POSTS,
        payload: data,
    }
}
export const edit = (data: TEditPost): IEdit => {
    return {
        type: EDIT_POST,
        payload: data,
    }
}

export const remove = (id:string): IRemove => {
    return {
        type: DELETE_POST,
        payload: { id }
    }
}



