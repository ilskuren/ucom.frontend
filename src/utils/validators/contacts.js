import { emptyValues } from '../constants';
import { urlRegex, emailRegex, phoneNumberRegex } from './constants';
import { validateArrayUrls } from './custom';

export const validate = (values) => {
  const errors = {};
  if (!emailRegex.test(values.email) && !emptyValues.includes(values.email)) {
    errors.email = 'The field name email format is invalid.';
  }
  if (!urlRegex.test(values.personalWebsiteUrl) && !emptyValues.includes(values.personalWebsiteUrl)) {
    errors.personalWebsiteUrl = 'The field name url format is invalid.';
  }
  if (!phoneNumberRegex.test(values.phoneNumber) && !emptyValues.includes(values.phoneNumber)) {
    errors.phoneNumber = 'The field name url format is invalid.';
  }
  if (values.userSources) {
    const resultsOfValidateUrlsArray = validateArrayUrls(values.userSources);
    if (!resultsOfValidateUrlsArray.isValid) {
      errors.userSources = values.userSources.map((_, i, src) => {
        const currentUrlValidationResult = resultsOfValidateUrlsArray.results[i];
        const isNotEmptyCurrentString = src[i] !== '';
        if (
          currentUrlValidationResult &&
          currentUrlValidationResult.isInvalidUrl &&
          isNotEmptyCurrentString
        ) {
          return currentUrlValidationResult.message;
        }
        return undefined;
      });
    }
  }
  return errors;
};
