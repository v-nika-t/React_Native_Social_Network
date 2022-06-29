export const addUser = (data, one = false) => {
    return {
        type: one ? 'ADD_ONE_USER' : 'ADD_USERS',
        payload: data,
    }
}

export const editUser = (data) => {
    return {
        type: 'EDIT_USER',
        payload: data,
    }
}

export const removeUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: { id }
    }
}


export const addFoundUsers = (data) => {
    return {
        type: 'ADD_FOUND_USERS',
        payload: data,
    }
}
