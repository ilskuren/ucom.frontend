export const validateArrayUrls = (values) => {
  const result = {
    isErrorExists: null,
    results: [{
      isInvalidUrl: null,
      message: null,
    }],
  };

  if (!Array.isArray(values)) {
    result.result = false;
    return result;
  }

  const isValidUrl = url => typeof url === 'string' && url !== '' && /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(url);
  result.isValid = values.every(isValidUrl);
  result.results = values.map(value => ({
    isInvalidUrl: !isValidUrl(value),
    message: 'Invalid url',
  }));
  return result;
};
