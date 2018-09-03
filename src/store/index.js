import { createStore, combineReducers } from 'redux';
import user from './user';
import offer from './offer';
import settings from './settings';

const app = combineReducers({ user, offer, settings });

export default createStore(app);
