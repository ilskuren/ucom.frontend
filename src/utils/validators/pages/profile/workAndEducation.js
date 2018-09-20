import { emptyValues } from '../../../constants';
import { onlyInteger } from '../../constants';

export const validate = (values) => {
  const errors = {};
  if (!onlyInteger.test(values.firstCurrencyYear) && !emptyValues.includes(values.firstCurrencyYear)) {
    errors.firstCurrencyYear = 'The field name first currency year format is invalid.';
  }
  return errors;
};
