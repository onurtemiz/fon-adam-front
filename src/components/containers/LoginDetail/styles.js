import styled from 'styled-components/macro';
import { Row, Col } from 'antd';
import { Button, Input } from '@common';

export default styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;

  background-image: url('/images/login-hero-03.png');
  background-repeat: no-repeat;
  background-size: cover;

  font-size: 1em;
`;

export const InnerLogin = styled(Row)`
  min-width: 90%;
  min-height: 90vh;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  border-radius: 10px;
  background-color: #fff;

  margin: 30px;
`;

export const SideHeroWrapper = styled.div`
  width: 100%;
  height: 100%;

  background-image: url('/images/login-hero-06.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoginWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginSection = styled.div`
  margin: 30px;
  max-width: 450px;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.primaryColor600};
  font-weight: bold;

  font-size: clamp(2rem, 2vw + 1rem, 3.4rem);
`;

export const TitleDescription = styled.p`
  max-width: 450px;
`;

export const SignupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconButton = styled(Button)`
  height: 50px;
  border-radius: 24px;

  font-weight: bold;

  .button-icon {
    width: 30px;

    margin-right: 0.5rem;
  }

  &,
  &:hover,
  &:active,
  &:focus {
    color: #090909;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 24px;
  font-weight: bold;
`;

export const StyledInput = styled(Input)`
  height: 50px;
  border-radius: 24px;

  &.ant-input {
    padding-left: 20px;
  }
`;

export const StyledPassword = styled(Input.Password)`
  height: 50px;
  border-radius: 24px;

  &.ant-input-password {
    padding-left: 20px;
  }
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MetaText = styled.span`
  display: block;

  margin-top: 15px;

  font-weight: bold;
  .focus-text {
    color: ${({ theme }) => theme.primaryColor600};
    cursor: pointer;
  }
`;

export const CopyrightText = styled.span`
  display: block;

  margin-top: 15px;

  color: ${({ theme }) => theme.metaColor};
`;
