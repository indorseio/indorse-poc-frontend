import React from 'react';
import SelectField from 'material-ui/SelectField';

// Taken from http://redux-form.com/7.0.0/examples/material-ui/ and modified according to our theme

export default ({
  input,
  label,
  hint,
  meta: { touched, submitting, error },
  children,
  ...custom
}) => (
  <SelectField
    hintText={hint || label}
    floatingLabelText={label}
    errorText={(touched || submitting) && error}
    fullWidth
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
