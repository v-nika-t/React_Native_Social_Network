const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return action.payload
        case 'ADD_ONE_POST':
            return [
                action.payload,
                ...state,

            ]
        case 'EDIT_POST':
            return state.map(item => {
                console.log(item);
                return item.id !== action.payload.id ? item : ({
                    ...item,
                    ...action.payload,
                })
            });
        case 'DELETE_POST':
            return state.filter(item => item.id !== action.payload.id)
        default: return state
    }
}

export default reducer;