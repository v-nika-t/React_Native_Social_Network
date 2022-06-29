const reducer = (state = { signIn: false, isAdmin: false, dataAccount: {} }, action) => {
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
        case 'ADD_DATA_ACCOUNT':
            return {
                ...state,
                dataAccount: action.payload
            }
        case 'EDIT_DATA_ACCOUNT':
            return {
                ...state,
                dataAccount: {
                    ...state.dataAccount,
                    ...action.payload,
                }
            }
        default: return state
    }
}

export default reducer;