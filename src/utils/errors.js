import { camelCase } from 'lodash';
import dict from '../utils/dict';

export const getError = (errors, fieldName) => {
  if (!errors) {
    return null;
  }

  const fieldError = errors.find(error => error.field === fieldName);

  if (!fieldError) {
    return null;
  }

  return fieldError.message;
};

export const getValidationError = (errors, fieldName) => {
  if (!errors) {
    return null;
  }

  const error = errors[fieldName];

  if (!error) {
    return null;
  }

  return error[0];
};

export const parseErrors = (error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    return Array.isArray(error.response.data.errors) ?
      error.response.data.errors.map(item => ({ ...item, field: camelCase(item.field) })) :
      error.response.data.errors;
  }

  const errors = {
    general: error.message,
  };

  return errors;
};

export const parseWalletErros = (error) => {
  try {
    const { message } = error;
    const data = JSON.parse(message);

    return data.errors;
  } catch (e) {
    console.error(e);
  }

  const defaultErrors = [{
    field: 'general',
    message: dict.ajaxError,
  }];

  return defaultErrors;
};
