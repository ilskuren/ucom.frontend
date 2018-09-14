import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import settings from './settings';
import post from './post';
import rootSaga from './sagas/mySaga';
import changeSaga from './sagas/changeSaga';

const app = combineReducers({
  user,
  post,
  settings,
  form: formReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(app, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(changeSaga);

export default store;
