
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return action.payload
        case 'ADD_ONE_USER':
            return [
                action.payload,
                ...state,
            ]
        case 'EDIT_USER':
            return state.map(item => item.id == action.payload.id ? action.payload : item)
        case 'DELETE_USER':
            return state.filter(item => item.id !== action.payload.id)
        default: return state
    }
}

export default reducer;