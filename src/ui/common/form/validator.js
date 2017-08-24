import validate from 'validate.js';
import ethereumAddress from 'ethereum-address';

import { ensureScheme } from 'utils/url';

const originalUrlValidator = validate.validators.url;

validate.validators.url = validate.extend(function (value, options) {
  const defaultScheme = options && options.defaultScheme;
  if (defaultScheme) {
    return originalUrlValidator.bind(this)(ensureScheme(value, defaultScheme), options);
  }
  return originalUrlValidator.bind(this)(value, options);
});

validate.validators.ethereumAddress = validate.extend(function (value, options) {
  options = validate.extend({}, this.options, options);
  const message = options.message || this.message || "is not a valid ethereum address";
  // Empty values are fine
  if (!validate.isDefined(value)) {
    return;
  }
  if (!validate.isString(value)) {
    return message;
  }
  if (!ethereumAddress.isAddress(value)) {
    return message;
  }
});

const validator = (fields, options = null) => {
  return values => validate(values, fields, options);
}

export default validator;
