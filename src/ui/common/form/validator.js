import validate from 'validate.js';

const validator = (fields, options = null) => {
  return values => validate(values, fields, options);
}

export default validator;
