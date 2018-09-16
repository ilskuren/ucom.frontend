import { takeLatest, put, call, select } from 'redux-saga/effects';
import humps from 'lodash-humps';
import { getToken } from '../../utils/token';
import { patchMyself, patchMyselfFormData } from '../../api';
import { convertClientUserContacts, convertClientGeneralInfo } from '../../api/convertors';
import { selectUserContacts } from '../../utils/selectors/user';

function* editUserSaga(userData) {
  try {
    const token = getToken();
    yield call(patchMyself, userData, token);
    yield put({ type: 'USER:EDIT_USER_COMPLETED', payload: humps(userData) });
  } catch (e) {
    yield put({ type: 'USER:EDIT_USER_FAILED', message: e.message });
  }
}

function* editUserContactsSaga(action) {
  try {
    const userSourceUrlsClient = action.payload.userSources;
    const userSourcesServer = yield select(selectUserContacts);
    const mergeUserSources = userSourceUrlsClient.map((userSource, i) => ({
      ...userSourcesServer.userSources[i],
      sourceUrl: userSource,
    }));

    const payload = convertClientUserContacts({
      ...action.payload,
      userSources: mergeUserSources,
    });
    yield* editUserSaga(payload);
  } catch (e) {
    yield put({ type: 'USER:EDIT_CONTACTS_FAIL', message: e.message });
  }
}

function* editUserGeneralInfoSaga(action) {
  try {
    const convertedGeneralInfo = convertClientGeneralInfo(action.payload);
    yield* editUserSaga(convertedGeneralInfo);
  } catch (e) {
    yield put({ type: 'USER:EDIT_GENERAL_INFO_FAIL', message: e.message });
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
  yield takeLatest('USER:EDIT_GENERAL_INFO', editUserGeneralInfoSaga);
  yield takeLatest('USER:EDIT_CONTACTS', editUserContactsSaga);
  yield takeLatest('USER:UPLOAD_AVATAR', loadUserAvatarSaga);
}

export default userSaga;
