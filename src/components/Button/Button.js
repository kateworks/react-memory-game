import React from 'react';
import './Button.css';

const Button = ({ userClass, buttonType, children, ...rest }) => (
  <button
    className={`button ${userClass || ''}`}
    type={buttonType || 'button'}
    {...rest}
  >
    { children || '' }
  </button>
);

export default Button;