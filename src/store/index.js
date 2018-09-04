import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import offer from './offer';
import settings from './settings';

const app = combineReducers({ user, offer, settings });
const middlewares = [];

const store = createStore(app, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
