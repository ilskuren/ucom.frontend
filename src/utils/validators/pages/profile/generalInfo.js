import { notContainNumbers } from '../../constants';
import { emptyValues } from '../../../constants';

const getError = (field, value) => {
  if (!notContainNumbers.test(value) && !emptyValues.includes(value)) {
    return `The field name ${field} format is invalid.`;
  }
  return undefined;
};

export const validate = (values) => {
  const fieldsNames = {
    firstName: 'first name',
    lastName: 'second name',
  };
  const errors = Object.keys(fieldsNames).reduce((acc, curr) => ({
    ...acc,
    [curr]: getError(fieldsNames[curr], values[curr]),
  }), {});
  return errors;
};
