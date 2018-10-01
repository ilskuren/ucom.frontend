import { takeLatest, put, call, select } from 'redux-saga/effects';
import { USER } from 'utils/actionTypes';
import { selectUserContacts } from '../../store/selectors/user';
import api from '../../api';
import { convertClientUserContacts, convertClientGeneralInfo, convertClientWorkAndEducation } from '../../api/convertors';

function* editUserGeneralInfoSaga(action) {
  try {
    const convertedGeneralInfo = convertClientGeneralInfo(action.payload);
    yield call(api.patchMyself, convertedGeneralInfo);

    yield put({ type: USER.EDIT_GENERAL_INFO_COMPLETED, payload: action.payload });
  } catch (e) {
    yield put({ type: USER.EDIT_GENERAL_INFO_FAIL, message: e.message });
  }
}

function* editUserWorkAndEducationSaga(action) {
  try {
    const convertedWorkAndEducation = convertClientWorkAndEducation(action.payload);
    yield call(api.patchMyself, convertedWorkAndEducation);

    yield put({ type: USER.EDIT_WORK_AND_EDUCATION_COMPLETED, payload: action.payload });
  } catch (e) {
    yield put({ type: USER.EDIT_WORK_AND_EDUCATION_FAIL, message: e.message });
  }
}

function* editUserContactsSaga(action) {
  try {
    const userSourceUrlsClient = action.payload.usersSources;
    const usersSourcesServer = yield select(selectUserContacts);

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

    const mergeusersSources = userSourceUrlsClient.map((userSource, i) => ({
      ...usersSourcesServer.usersSources[i],
      sourceUrl: getUserSource(userSource),
    })).filter(removeEmptySources);

    const payload = {
      ...action.payload,
      usersSources: mergeusersSources,
    };

    const convertedUser = convertClientUserContacts(payload);

    yield call(api.patchMyself, convertedUser);
    yield put({ type: USER.EDIT_CONTACTS_COMPLETED, payload: action.payload });
  } catch (e) {
    yield put({ type: USER.EDIT_USER_FAILED, message: e.message });
  }
}

function* loadUserAvatarSaga(action) {
  try {
    const avatarData = new FormData();
    avatarData.append('avatar_filename', action.payload);
    const newUser = yield call(api.patchMyselfFormData, avatarData);
    yield put({ type: USER.UPLOAD_AVATAR_COMPLETED, payload: newUser.avatarFilename });
  } catch (e) {
    yield put({ type: USER.UPLOAD_AVATAR_FAIL, message: e.message });
  }
}

function* userSaga() {
  yield takeLatest(USER.EDIT_GENERAL_INFO, editUserGeneralInfoSaga);
  yield takeLatest(USER.EDIT_WORK_AND_EDUCATION, editUserWorkAndEducationSaga);
  yield takeLatest(USER.EDIT_CONTACTS, editUserContactsSaga);
  yield takeLatest(USER.UPLOAD_AVATAR, loadUserAvatarSaga);
}

export default userSaga;
