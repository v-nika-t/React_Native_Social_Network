import { TStatePost, PostActionTypes, IOnePost} from '../types/action.types/action.post.types';

const reducer = (state: TStatePost | []  = [], action:PostActionTypes):TStatePost => {
    switch (action.type) {
        case 'ADD_POSTS':
            return action.payload
        case 'ADD_ONE_POST':
            return [
                ...action.payload,
                ...state,
            ]
        case 'EDIT_POST':
            return state.map((item: IOnePost)=> {
                return item.id !== action.payload.id ? item : ({
                    ...item,
                    ...action.payload,
                })
            });
        case 'DELETE_POST':
            return state.filter((item: IOnePost) => item.id !== action.payload.id)
        default: return state
    }
}

export default reducer;