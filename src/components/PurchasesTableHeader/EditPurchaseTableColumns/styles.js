import styled, { css } from 'styled-components';
import { Select } from 'antd';

export default styled.div`
  min-width: 250px;
  position: relative;
`;

export const StyledButton = styled.button`
  .button-icon {
    width: 22px;
    margin-right: 5px;
  }

  display: inline-flex;
  align-items: center;

  border: none;
  background-color: unset;
  cursor: pointer;

  color: ${(p) => p.theme.metaColor600};

  border-radius: 6px;
  font-weight: normal;
  font-weight: 700;

  padding: 7px 12px;

  background-color: #fff;

  &:hover {
    color: ${(p) => p.theme.primaryColor700};
    background-color: ${(p) => p.theme.primaryColor200};
  }

  ${(p) =>
    p.open &&
    css`
      color: ${(p) => p.theme.primaryColor700};
      background-color: ${(p) => p.theme.primaryColor200};
    `}

  position: absolute;
  z-index: 1;
`;

export const StyledSelect = styled(Select)``;
