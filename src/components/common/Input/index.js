import React from 'react';
import InputStyles, {
  InputPasswordStyles,
  InputTextAreaStyles,
} from './styles';

function Input({ children, innerRef, ...restProps }) {
  return (
    <InputStyles {...restProps} ref={innerRef}>
      {children}
    </InputStyles>
  );
}

export default Input;

Input.Password = function InputPassword({ children, ...restProps }) {
  return <InputPasswordStyles {...restProps}>{children}</InputPasswordStyles>;
};

Input.TextArea = function InputTextArea({ children, ...restProps }) {
  return <InputTextAreaStyles {...restProps}>{children}</InputTextAreaStyles>;
};
