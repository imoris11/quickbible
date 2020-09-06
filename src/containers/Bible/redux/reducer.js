const { BOOKMARK_VERSE } = require("./actions")

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
        default:
            return state
    }
}

export default bookmarksReducer