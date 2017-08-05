import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default (props) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <CircularProgress size={60} thickness={5} value={50} />
    </div>
  )
}
