const reducer = (state = { signIn: false }, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                signIn: true

            }
        case 'SIGN_UP':
            return {
                ...state,
                signIn: false

            }
        default: return state
    }
}

export default reducer;