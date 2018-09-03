import { createStore, combineReducers } from 'redux';
import user from './user';
import offer from './offer';

const app = combineReducers({ user, offer });

export default createStore(app);
