import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import settings from './settings';
import post from './post';
import mySaga from './sagas/mySaga';

const app = combineReducers({
  user,
  post,
  settings,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(app, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mySaga);

export default store;
