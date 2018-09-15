import { takeLatest, put, call } from 'redux-saga/effects';
import { getToken } from '../../utils/token';
import { patchMyself, patchMyselfFormData } from '../../api';
import { convertClientUserContacts } from '../../api/convertors';

function* editUserSaga(action) {
  try {
    const token = getToken();
    const convertedUser = convertClientUserContacts(action.payload);
    yield call(patchMyself, convertedUser, token);
    yield put({ type: 'USER:EDIT_USER_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'USER:EDIT_USER_FAILED', message: e.message });
  }
}

function* loadUserAvatarSaga(action) {
  try {
    const token = getToken();
    const avatarData = new FormData();
    avatarData.append('avatar_filename', action.payload);
    const newUser = yield call(patchMyselfFormData, avatarData, token);
    yield put({ type: 'USER:UPLOAD_AVATAR_COMPLETED', payload: newUser.avatar_filename });
  } catch (e) {
    yield put({ type: 'USER:UPLOAD_AVATAR_FAIL', message: e.message });
  }
}

function* userSaga() {
  yield takeLatest('USER:EDIT_USER', editUserSaga);
  yield takeLatest('USER:UPLOAD_AVATAR', loadUserAvatarSaga);
}

export default userSaga;
