import { createStore, combineReducers } from 'redux';
import user from './user';
import post from './post';
import profile from './profile';

const app = combineReducers({ user, post, profile });

export default createStore(app);
