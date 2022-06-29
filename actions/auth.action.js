export const auth = (SIGN_IN) => {
    return { type: SIGN_IN ? 'SIGN_IN' : 'LOG_OUT' }
}

export const changeRole = (role) => {
    return { type: role == 'admin' ? 'IS_ADMIN' : 'IS_USER' }
}

export const addDataAccount = (data) => {
    return {
        type: 'ADD_DATA_ACCOUNT',
        payload: data,
    }
}

export const editDataAccount = (data) => {
    return {
        type: 'EDIT_DATA_ACCOUNT',
        payload: data,
    }
}