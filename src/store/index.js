import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import settings from './settings';
import post from './post';

const app = combineReducers({
  user,
  post,
  settings,
  form: formReducer,
});
const middlewares = [];

const store = createStore(app, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
