import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { convertClientUserContacts } from '../../api/convertors';
import { selectUser } from '../../utils/selectors/user';


function* saveUserSaga(action) {
  try {
    const token = getToken();
    const user = yield select(selectUser);
    const convertedUser = { ...convertClientUserContacts(action.payload), id: user.id };
    yield call(patchMyself, convertedUser, token);
    yield put({ type: 'USER:SAVE_USER_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'SET_USER_FAILED', message: e.message });
  }
}

function* changeSaga() {
  yield takeLatest('USER:SAVE_USER', saveUserSaga);
}

export default changeSaga;
