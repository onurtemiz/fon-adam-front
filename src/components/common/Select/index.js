import React from 'react';
import SelectStyles from './styles';

function Select({ children, innerRef, ...restProps }) {
  return (
    <SelectStyles {...restProps} ref={innerRef}>
      {children}
    </SelectStyles>
  );
}

export default Select;
