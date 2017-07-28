import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Alert as BsAlert } from 'reactstrap';

export default class Alert extends Component {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string.isRequired,
    inverse: PropTypes.bool.isRequired,

    transitionAppearTimeout: PropTypes.number,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,

    isOpen: PropTypes.bool,
    toggle: PropTypes.func
  };

  static defaultProps = {
    color: 'info',
    inverse: false
  };

  render() {
    const { className, color, inverse, ...passThrough } = this.props;

    const finalClassName = classnames({
      className: true,
      [`bg-${color}`]: color && inverse,
      'text-white': color && inverse
    });

    return <BsAlert className={finalClassName} color={inverse ? 'inert' : color} {...passThrough} />;
  }
}
