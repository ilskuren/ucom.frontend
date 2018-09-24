import { urlRegex } from './constants';

const isValidUrl = (url) => {
  const regexUrl = new RegExp(urlRegex);
  return regexUrl.test(url);
};

export const validateArrayUrls = (values) => {
  const result = {
    isValid: null,
    results: [{
      isInvalidUrl: null,
      message: null,
    }],
  };

  if (!Array.isArray(values)) {
    result.result = false;
    return result;
  }

  result.isValid = values.every(isValidUrl);
  result.results = values.map(value => ({
    isInvalidUrl: !isValidUrl(value),
    message: 'The field name url format is invalid.',
  }));
  return result;
};

export const isEmptyStrings = (strings) => {
  if (!Array.isArray(strings)) {
    return strings === '';
  }
  return strings.every(string => string === '');
};
