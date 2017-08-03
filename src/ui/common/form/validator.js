import validate from 'validate.js';
import ethereumAddress from 'ethereum-address';

validate.validators.ethereumAddress = validate.extend(function (value, options) {
  options = validate.extend({}, this.options, options);
  var message = options.message || this.message || "is not a valid ethereum address";
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

window.validate = validate;
