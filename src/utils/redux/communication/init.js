export const initialCommunicationField = { isRequesting: false, error: '' };

export function initCommunicationFields(fieldNames) {
  return fieldNames.reduce((communicationFields, fieldName) => ({
    ...communicationFields,
    [fieldName]: initialCommunicationField,
  }), {});
}
