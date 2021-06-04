import styled from 'styled-components/macro';
import { Input } from '@common';
import { Switch } from 'antd';

export default styled.div`
  display: flex;
  align-items: center;

  & > *:last-child {
    margin-left: 10px;
  }
`;

export const StyledInput = styled(Input)`
  max-width: 200px;
`;

export const StyledToggle = styled(Switch)`
  &.ant-switch {
    background-color: ${(p) => p.theme.secondaryColor500};
  }

  &.ant-switch-checked {
    background-color: ${(p) => p.theme.primaryColor500};
  }
`;
