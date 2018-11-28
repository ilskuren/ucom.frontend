import Validator from './../utils/validator';

export const validateFields = (
  data = {}, fields = [], rules = {}, isAll = false,
  customNames = {},
) => {
  const validation = new Validator(data, rules);

  if (customNames.customName) {
    validation.setAttributeFormatter(() => customNames.customName);
  }

  const isValid = validation.passes();
  const errors = isAll ?
    validation.errors.all() :
    fields.reduce((value, field) => ({ ...value, [field]: validation.errors.get(field) }), {});
  return { isValid, errors };
};
