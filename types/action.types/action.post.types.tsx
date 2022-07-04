import { ADD_ONE_POST, ADD_POSTS, EDIT_POST, DELETE_POST } from '../../constants/action.constants';


export interface IOnePost  {
    Owner_posts: {user_name:string}
    Users_added_like_to_post: Array<{
        likes_of_posts: {
            id: string,
            postId: string,
            userId: string,
        },
        user_name: string,
    }> | [],
    date: string,
    description: string,
    id: string ,
    img: string,
    title: string,
    userId?: string
}

export type TStatePost = Array<IOnePost>;

export type TEditPost = Exclude <IOnePost, 'Owner_posts' |  'Users_added_like_to_post'>



// Actions
export  interface IAdd { 
    type: typeof ADD_ONE_POST | typeof ADD_POSTS,
    payload: Array<IOnePost>
}

export  interface IEdit { 
    type: typeof EDIT_POST,
    payload: TEditPost
}

export  interface IRemove { 
    type: typeof DELETE_POST,
    payload: {id: string}
}

export type PostActionTypes = IAdd |  IEdit | IRemove  ;