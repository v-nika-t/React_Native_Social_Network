export const add = (data) => {
    return {
        type: 'ADD',
        payload: data,
    }
}

export const changeDataAccount = (data) => {
    return {
        type: 'EDIT',
        payload: data,
    }
}

export const auth = (SIGN_IN) => {
    return { type: SIGN_IN ? 'SIGN_IN' : 'LOG_OUT' }
}

export const changeRole = (role) => {
    return { type: role == 'admin' ? 'IS_ADMIN' : 'IS_USER' }
}

// Admin

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



