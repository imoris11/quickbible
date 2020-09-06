const { BOOKMARK_VERSE, REMOVE_BOOKMARK } = require("./actions")

const initialState = {
    data:[],
}

const bookmarksReducer = (state = initialState, action) => {
    switch(action.type) {
        case BOOKMARK_VERSE:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case REMOVE_BOOKMARK:
            return {
                ...state,
                data: state.data.filter((verse) => verse.text !== action.payload)
            }
        default:
            return state
    }
}

export default bookmarksReducer