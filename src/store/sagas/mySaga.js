import { takeLatest, put } from 'redux-saga/effects';

function* fetchUser(action) {
  try {
    console.log('ENTER');
    yield put({ type: 'SET_USER_COMPLED', message: action.payload });
  } catch (e) {
    yield put({ type: 'SET_USER_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest('SET_USER', fetchUser);
}

export default mySaga;
