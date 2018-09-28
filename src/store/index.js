import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import settings from './settings';
import post from '../store/post';
import userSaga from './sagas/userSaga';
import auth from './auth';
import { reducer as user } from './user';

const app = combineReducers({
  user,
  post,
  settings,
  auth,
  form: formReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(app, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(userSaga);

export default store;
