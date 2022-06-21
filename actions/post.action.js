export const add = (data, one = false) => {
    return {
        type: one ? 'ADD_ONE_POST' : 'ADD_POSTS',
        payload: data,
    }
}

export const edit = (data) => {
    return {
        type: 'EDIT_POST',
        payload: data,
    }
}

export const remove = (id) => {
    return {
        type: 'DELETE_POST',
        payload: { id }
    }
}


