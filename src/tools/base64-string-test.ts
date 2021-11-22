const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const isStringInBase64 = (value: string) => {
  return base64regex.test(value);
};

export default isStringInBase64;
