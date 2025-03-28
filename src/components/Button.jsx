import React from 'react';
import Styles from './Button.module.css';
function Button({ children, onclick, type }) {
  return (
    <button className={`${Styles.btn} ${Styles[type]}`} onClick={onclick}>
      {children}
    </button>
  );
}

export default Button;
