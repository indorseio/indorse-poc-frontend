import React from 'react';
import TextField from 'material-ui/TextField';

// Taken from http://redux-form.com/7.0.0/examples/material-ui/ and modified according to our theme

export default ({
  input,
  label,
  hint,
  meta: { touched, submitting, error },
  ...custom
}) => (
  <TextField
    hintText={hint || label}
    floatingLabelText={label}
    errorText={(touched || submitting) && error}
    fullWidth
    {...input}
    {...custom}
  />
);
