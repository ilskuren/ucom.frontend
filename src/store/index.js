import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import settings from './settings';
import post from '../store/post';
import userSaga from './sagas/userSaga';
import auth from './auth';
import organization from './organization';
import notifications from './notifications';
import siteNotifications from './siteNotifications';
import posts from './posts';
import users from './users';
import comments from './comments';
import organizations from './organizations';
import menuPopup from './menuPopup';
import feeds from './feeds';
import userForm from './userForm';
import wallet from './wallet/index';
import { reducer as user } from './user';

const app = combineReducers({
  user,
  post,
  settings,
  auth,
  organization,
  notifications,
  siteNotifications,
  posts,
  users,
  comments,
  organizations,
  feeds,
  menuPopup,
  wallet,
  userForm,
  form: formReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const store = createStore(app, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(userSaga);

export default store;
