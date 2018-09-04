export const getFromDataFromObject = (object) => {
  if (!object) {
    return null;
  }

  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    formData.append(key, object[key]);
  });

  return formData;
};
