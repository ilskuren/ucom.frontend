import api from '../api';

export const setOrganizationActiveTab = payload => ({ type: 'SET_ORGANIZATION_ACTIVE_TAB', payload });
export const setOrganizationData = payload => ({ type: 'SET_ORGANIZATION_DATA', payload });
export const setOrganizationErrors = payload => ({ type: 'SET_ORGANIZATION_ERRORS', payload });
export const setOrganizationSaved = payload => ({ type: 'SET_ORGANIZATION_SAVED', payload });
export const resetOrganizationData = () => ({ type: 'RESET_ORGANIZATION' });

export const saveOrganization = payload => (dispatch) => {
  const saveApi = payload.id ? api.updateOrganization : api.createOrganization;

  saveApi(payload)
    .then((data) => {
      dispatch(setOrganizationData(data));
      dispatch(setOrganizationSaved(true));
    });
};

export const fetchOrganization = payload => (dispatch) => {
  api.getOrganization(payload)
    .then((data) => {
      dispatch(setOrganizationData(data.data));
    });
};
