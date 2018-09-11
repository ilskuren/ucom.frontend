const isValidUrl = (url) => {
  const regexUrl = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
  return typeof url === 'string' && url !== '' && regexUrl.test(url);
};


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

  result.isValid = values.every(isValidUrl);
  result.results = values.map(value => ({
    isInvalidUrl: !isValidUrl(value),
    message: 'The field name url format is invalid.',
  }));
  return result;
};
