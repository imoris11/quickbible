import rootReducer from './rootReducer';
import sagas from './rootSagas';
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(
  rootReducer,
  composeWithDevTools(...enhancers),
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
