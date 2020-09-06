import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import bookmarksReducer from './src/containers/Bible/redux/reducer';


const bookmarksPersisConfig = {
  storage: AsyncStorage,
  key: 'bookmarks',
};


export const reducers = {
  bookmarks: persistReducer(bookmarksPersisConfig, bookmarksReducer),
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
