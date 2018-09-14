import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { convertClientUserContacts } from '../../api/convertors';
import { selectUser } from '../../utils/selectors/user';


function* editUserSaga(action) {
  try {
    const token = getToken();
    const user = yield select(selectUser);
    const convertedUser = { ...convertClientUserContacts(action.payload), id: user.id };
    yield call(patchMyself, convertedUser, token);
    yield put({ type: 'USER:EDIT_USER_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'USER:EDIT_USER_FAILED', message: e.message });
  }
}

function* userSaga() {
  yield takeLatest('USER:EDIT_USER', editUserSaga);
}

export default userSaga;
