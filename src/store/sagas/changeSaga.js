import { takeLatest, put, call } from 'redux-saga/effects';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';


function* saveUserSaga(action) {
  try {
    const token = getToken();

    const test = yield call(patchMyself, action.payload, token);
    console.log('save ENTER', test);
    yield put({ type: 'USER:SAVE_USER_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'SET_USER_FAILED', message: e.message });
  }
}

function* changeSaga() {
  yield takeLatest('USER:SAVE_USER', saveUserSaga);
}

export default changeSaga;
