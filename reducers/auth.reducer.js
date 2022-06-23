const reducer = (state = { signIn: false, isAdmin: false }, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                signIn: true

            }
        case 'LOG_OUT':
            return {
                ...state,
                signIn: false

            }
        case 'IS_ADMIN':
            return {
                ...state,
                isAdmin: true

            }
        case 'IS_USER':
            return {
                ...state,
                isAdmin: false

            }
        default: return state
    }
}

export default reducer;