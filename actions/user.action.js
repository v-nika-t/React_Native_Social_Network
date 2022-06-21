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


