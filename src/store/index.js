import { createStore, combineReducers } from 'redux';
import user from './user';
import post from './post';

const app = combineReducers({ user, post });

export default createStore(app);
