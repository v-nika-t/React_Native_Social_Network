import { v4 as uuidv4 } from 'uuid';

export const add = (data) => {
    return {
        type: 'ADD',
        payload: data,
    }
}

export const auth = (SIGN_IN) => {
    return { type: SIGN_IN ? 'SIGN_IN' : 'SIGN_UP' }
}

/* export const open = (id) => {
    return {
        type: 'OPEN',
        payload: id
    }
}

export const close = (id) => {
    return {
        type: 'CLOSE',
        payload: id
    }
}

export const surch = (value) => {
    return {
        type: 'SURCH',
        payload: value,
    }
}
export const add1 = () => {
    return {
        type: 'ADD',
        payload: { id: uuidv4(), date: new Date() },
    }
}

export const onChangeValue = (value, name) => {
    return {
        type: 'CHANGE_VALUE',
        payload: { [name]: value },
    } 
}*/