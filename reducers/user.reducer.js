
const reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD':
            return action.payload
        case 'EDIT':
            return {
                ...state,
                ...action.payload,
            }
        default: return state
    }
}

export default reducer;