export const BOOKMARK_VERSE = 'BOOKMARK_VERSE'
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'

export const addBookmark = (payload) => ({
    type: BOOKMARK_VERSE,
    payload
})

export const removeBookmark = (payload) => ({
    type: REMOVE_BOOKMARK,
    payload
})
