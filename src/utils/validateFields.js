import Validator from 'validatorjs';

export const validateFields = (data = {}, fields = [], rules = {}) => {
  const validation = new Validator(data, rules);
  const isValid = validation.passes();
  const errors = fields.reduce((value, field) => ({ ...value, [field]: validation.errors.get(field) }), {});

  return { isValid, errors };
};
