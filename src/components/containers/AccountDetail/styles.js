import styled from 'styled-components/macro';
import { Input } from 'antd';
import { Button } from '@common';
const Password = Input.Password;

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledInput = styled(Input)`
  max-width: 350px;
  margin-right: 15px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 3px solid ${(p) => p.theme.metaColor200};
    color: ${(p) => p.theme.metaColor600};
  }

  &:hover {
    border-bottom: 3px solid ${(p) => p.theme.primaryColor500};
  }

  padding: 0px;

  font-size: 1.75rem;
  font-weight: bold;
`;

export const StyledPassword = styled(Password)`
  max-width: 350px;

  margin-right: 15px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 3px solid ${(p) => p.theme.metaColor200} !important;
  }

  &:hover {
    border-bottom: 3px solid ${(p) => p.theme.primaryColor500} !important;
  }

  padding: 0px;

  input {
    font-size: 1.75rem !important;
    font-weight: bold;
    color: ${(p) => p.theme.metaColor600} !important;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;

  margin: 15px 0px;

  & > svg {
    margin-right: 10px;
  }

  .action-icon {
    max-width: 30px;
    min-width: 30px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .util-icon {
    max-width: 30px;
    min-width: 30px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .util-icon:hover {
    background-color: ${(p) => p.theme.metaColor300};
  }
`;

export const SectionTitle = styled.h2`
  font-weight: bold;
  margin-right: 20px;
  font-size: 1.75rem;
  color: ${(p) => p.theme.metaColor600};
`;

export const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 15px;
  }
`;

export const StyledButton = styled(Button)`
  font-weight: bold;
  height: 50px;
  border-radius: 0.5rem;
  font-size: 1.25rem;
`;
