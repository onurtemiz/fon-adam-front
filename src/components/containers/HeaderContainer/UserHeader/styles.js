import styled from 'styled-components/macro';
import { Button } from '@common';
export default styled.div``;

export const ButtonWrapper = styled.div`
  & > a:first-child {
    margin-right: 15px;
  }

  @media (max-width: 992px) {
    & > a:first-child {
      margin-right: 0px;
    }

    display: flex;
    flex-direction: column;
    & > * {
      margin-top: 10px;
    }
  }
`;

export const LoginButton = styled(Button)`
  padding: 17px 25px;
  font-weight: bold;
  border-radius: 5px;
`;

export const SignupButton = styled(Button)`
  padding: 17px 25px;
  border-radius: 5px;
  font-weight: bold;
`;

export const LoggedInHeaderWrapper = styled.ul`
  list-style: none;

  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: flex;

  & > li:first-child {
    margin-right: 15px;
  }

  .logout-icon {
    height: 32px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 0.5rem;
    padding: 6px 10px;

    cursor: pointer;
  }

  @media (max-width: 992px) {
    & > a:first-child {
      margin-right: 0px;
    }

    display: flex;
    flex-direction: column;
    & > * {
      margin-top: 10px;
    }
  }
`;
