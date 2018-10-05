import { emptyValues } from '../../../constants';
import { onlyInteger } from '../../constants';

// const validateBlock = ({ errors, array, type }) => {
//   array.forEach((item, i) => {
//     const startDates = item.startDate.split('-');
//     const endDates = item.endDate.split('-');
//     errors[type] = Array.from({ length: array.length }).map(() => ({ endDate: null, startDate: null }));

//     if (startDates.some(Number.isNaN)) {
//       errors[type][i].startDate = 'The field name started date format is invalid.';
//     }

//     if (endDates.some(Number.isNaN)) {
//       errors[type][i].endDate = 'The field name ended date format is invalid.';
//     }

//     if ((new Date(item.startDate).getTime() > new Date(item.endDate).getTime())) {
//       errors[type][i].endDate = 'Start date cannot be later than end date.';
//     }
//   });
// };

export const validate = (values) => {
  const errors = {};

  if (!onlyInteger.test(values.firstCurrencyYear) && !emptyValues.includes(values.firstCurrencyYear)) {
    errors.firstCurrencyYear = 'The field name first currency year format is invalid.';
  }

  // if (Array.isArray(values.usersJobs) && values.usersJobs.length !== 0) {
  //   validateBlock({ errors, array: values.usersJobs, type: 'usersJobs' });
  // }

  // if (Array.isArray(values.usersEducation) && values.usersEducation.length !== 0) {
  //   validateBlock({ errors, array: values.usersEducation, type: 'usersEducation' });
  // }
  return errors;
};
