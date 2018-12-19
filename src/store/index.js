import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import post from '../store/post';
import auth from './auth';
import organization from './organization';
import notifications from './notifications';
import siteNotifications from './siteNotifications';
import posts from './posts';
import users from './users';
import comments from './comments';
import organizations from './organizations';
import menuPopup from './menuPopup';
import userForm from './userForm';
import wallet from './wallet/index';
import governance from './governance/index';
import registration from './registration';
import mainPostGroup from './mainPostGroup';
import feed from './feed';
import { reducer as user } from './user';

const app = combineReducers({
  user,
  post,
  auth,
  organization,
  notifications,
  siteNotifications,
  posts,
  users,
  comments,
  organizations,
  menuPopup,
  wallet,
  userForm,
  governance,
  registration,
  mainPostGroup,
  feed,
});
const middlewares = [thunk];

let preloadedState;

if (typeof window !== 'undefined') {
  preloadedState = window.APP_STATE;
}

const store = createStore(app, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
