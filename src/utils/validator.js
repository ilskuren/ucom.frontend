import Validator from 'validatorjs';
import api from '../api';

Validator.registerAsync('accountname', (accountName, attribute, req, passes) => {
  if (!/^[a-z1-5]{12}$/.test(accountName)) {
    passes(false);
    return;
  }

  api.checkAccountName(accountName)
    .then(() => {
      passes();
    })
    .catch((e) => {
      passes(false, e.response.data.errors.account_name);
    });
});

export default Validator;
