import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import settings from './settings';
import post from './post';

const app = combineReducers({ user, post, settings });
const middlewares = [];

const store = createStore(app, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
