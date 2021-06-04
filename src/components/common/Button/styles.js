import styled, { css } from 'styled-components/macro';
import { Button } from 'antd';

export default styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &,
  &:focus {
    background-color: ${({ theme, type }) =>
      type === 'primary'
        ? theme.primaryColor600
        : type === 'secondary'
        ? theme.secondaryColor600
        : type === 'third'
        ? theme.thirdColor600
        : type && type.includes('border') && 'unset'};

    border-color: ${({ theme, type }) =>
      type === 'primary' || type === 'primary-border'
        ? theme.primaryColor600
        : type === 'secondary' || type === 'secondary-border'
        ? theme.secondaryColor600
        : (type === 'third' || type === 'third-border') && theme.thirdColor600};

    color: ${(p) =>
      p.type === 'primary-border'
        ? p.theme.primaryColor600
        : p.type === 'secondary-border'
        ? p.theme.secondaryColor600
        : p.type === 'third-border'
        ? p.theme.thirdColor600
        : '#fafbfc'};
  }
  &:hover {
    background-color: ${({ theme, type }) =>
      type === 'primary'
        ? theme.primaryColor500
        : type === 'secondary'
        ? theme.secondaryColor500
        : type === 'third'
        ? theme.thirdColor500
        : type && type.includes('border') && 'unset'};

    border-color: ${({ theme, type }) =>
      type === 'primary' || type === 'primary-border'
        ? theme.primaryColor500
        : type === 'secondary' || type === 'secondary-border'
        ? theme.secondaryColor500
        : (type === 'third' || type === 'third-border') && theme.thirdColor500};

    color: ${(p) =>
      p.type === 'primary-border'
        ? p.theme.primaryColor500
        : p.type === 'secondary-border'
        ? p.theme.secondaryColor500
        : p.type === 'third-border'
        ? p.theme.thirdColor500
        : '#fafbfc'};
  }

  &,
  &:hover,
  &:active,
  &:focus {
    ${(p) => p.shadow && 'box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;'}
    ${(p) => p.borderless && 'border:none'}
  }
`;
