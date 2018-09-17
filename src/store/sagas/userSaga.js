import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getToken } from '../../utils/token';
import { patchMyself, patchMyselfFormData } from '../../api';
import { convertClientUserContacts, convertClientGeneralInfo, convertClientWorkAndEducation } from '../../api/convertors';
import { selectUserContacts } from '../../utils/selectors/user';

function* editUserGeneralInfoSaga(action) {
  try {
    const token = getToken();
    const convertedGeneralInfo = convertClientGeneralInfo(action.payload);
    yield call(patchMyself, convertedGeneralInfo, token);

    yield put({ type: 'USER:EDIT_GENERAL_INFO_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'USER:EDIT_GENERAL_INFO_FAIL', message: e.message });
  }
}

function* editUserWorkAndEducationSaga(action) {
  try {
    const token = getToken();
    const convertedWorkAndEducation = convertClientWorkAndEducation(action.payload);
    yield call(patchMyself, convertedWorkAndEducation, token);

    yield put({ type: 'USER:EDIT_WORK_AND_EDUCATION_COMPLETED', payload: action.payload });
  } catch (e) {
    yield put({ type: 'USER:EDIT_WORK_AND_EDUCATION_FAIL', message: e.message });
  }
}

function* editUserContactsSaga(action) {
  try {
    const token = getToken();

    const userSourceUrlsClient = action.payload.userSources;
    const userSourcesServer = yield select(selectUserContacts);

    const getUserSource = (userSource) => {
      if (typeof userSource === 'string') {
        return userSource;
      }
      return userSource.sourceUrl;
    };

    const removeEmptySources = (userSource) => {
      if (typeof userSource === 'string' && userSource === '') {
        return false;
      }
      if (typeof userSource === 'object' && userSource.sourceUrl === '') {
        return false;
      }
      return true;
    };

    const mergeUserSources = userSourceUrlsClient.map((userSource, i) => ({
      ...userSourcesServer.userSources[i],
      sourceUrl: getUserSource(userSource),
    })).filter(removeEmptySources);

    const payload = {
      ...action.payload,
      userSources: mergeUserSources,
    };

    const convertedUser = convertClientUserContacts(payload);
    yield call(patchMyself, convertedUser, token);
    yield put({ type: 'USER:EDIT_CONTACTS_COMPLETED', payload: action.payload });
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
  yield takeLatest('USER:EDIT_GENERAL_INFO', editUserGeneralInfoSaga);
  yield takeLatest('USER:EDIT_WORK_AND_EDUCATION', editUserWorkAndEducationSaga);
  yield takeLatest('USER:EDIT_CONTACTS', editUserContactsSaga);
  yield takeLatest('USER:UPLOAD_AVATAR', loadUserAvatarSaga);
}

export default userSaga;
