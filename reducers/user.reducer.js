
const reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD':
            return action.payload

        /* case 'SIGN_IN':
            return {
                ...state,
                searchValue: "",
                reverseStatus: !state.reverseStatus,
                openNews: action.payload.openNews,
                data: action.payload.data
            }
        case 'OPEN':
            return {
                ...state,
                openNews: [...state.openNews, action.payload],
            }
        case 'CLOSE':
            return {
                ...state,
                openNews: state.openNews.filter(item => item !== action.payload),
            }
        case 'SURCH':
            return {
                ...state,
                searchValue: action.payload
            }
        case 'ADD':
            const createNewListNews = [...state.news, { ...action.payload, ...state.newNews }];

            return {
                ...state,
                openNews: [action.payload.id],
                newNews: { title: "", description: "" },
                news: createNewListNews.sort((a, b) => { return b.date - a.date })
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                newNews: { ...state.newNews, ...action.payload },
            } */
        default: return state
    }
}

export default reducer;