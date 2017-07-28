import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const defaultStyle = { height: 50 };

const SubmitButton = ({ style, ...rest }) => (
  <RaisedButton type="submit" style={{ ...defaultStyle, ...style }} {...rest} />
);

export default SubmitButton;
