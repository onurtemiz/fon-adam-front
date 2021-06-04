import { Col, Row, Divider, Form, notification } from 'antd';
import React, { useState } from 'react';
import LoginDetailStyles, {
  SideHeroWrapper,
  InnerLogin,
  Title,
  TitleWrapper,
  TitleDescription,
  LoginSection,
  LoginWrapper,
  SignupsWrapper,
  IconButton,
  SubmitButton,
  StyledInput,
  StyledPassword,
  InputSection,
  MetaText,
  CopyrightText,
  BottomLeftImg,
} from './styles';
import { Google, Apple } from '@styled-icons/boxicons-logos';
import { Link, useHistory } from 'react-router-dom';
import firebase, { googleProvider } from '../../../firebase';
import { useAuth } from '../../../AuthContext';
import mixpanel from 'mixpanel-browser';

const LoginDetail = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const providers = await firebase.auth().fetchSignInMethodsForEmail(email);
      if (providers.includes('google.com')) {
        notification.error({
          message: 'Hata!',
          description: 'Lütfen Google hesabınız ile giriş yapın.',
        });
        setLoading(false);
        return;
      }
      await firebase.auth().signInWithEmailAndPassword(email, password);
      mixpanel.track('Email Login');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithRedirect(googleProvider);
      mixpanel.track('Google Login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  if (user) {
    history.push(`/portfolios?owner=${user.uid}`);
    return null;
  }

  return (
    <LoginDetailStyles>
      <InnerLogin>
        <LoginWrapper xs={24} sm={24} md={24} lg={12}>
          <LoginSection>
            <TitleWrapper>
              <Title>Giriş Yap</Title>
            </TitleWrapper>

            <SignupsWrapper>
              <IconButton
                icon={<Google className="button-icon" />}
                onClick={handleGoogle}
              >
                Google ile devam et
              </IconButton>
            </SignupsWrapper>

            <Divider plain>ya da email ile giriş yapın</Divider>

            <Form name="signup" onFinish={handleLogin}>
              <InputSection>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Lütfen emailinizi girin.' },
                    {
                      type: 'email',
                      message: 'Lütfen geçerli bir email girin.',
                    },
                    {
                      whitespace: false,
                      message: 'Emailiniz boşluklardan oluşamaz.',
                    },
                  ]}
                >
                  <StyledInput placeholder="Emailinizi girin.." />
                </Form.Item>
              </InputSection>

              <InputSection>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Lütfen şifrenizi girin.' },
                    {
                      min: 6,
                      message:
                        'Şifreniz 6 veya daha fazla karakterden oluşmalı.',
                    },
                    { type: 'string' },
                    {
                      whitespace: false,
                      message: 'Şifreniz boşluklardan oluşamaz.',
                    },
                  ]}
                >
                  <StyledPassword placeholder="Şifrenizi girin..." />
                </Form.Item>
              </InputSection>
              <Form.Item>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Giriş Yap
                </SubmitButton>
              </Form.Item>
            </Form>

            <MetaText>
              <Link to="/forgot-password">
                <label className="focus-text">Şifremi unuttum</label>
              </Link>
            </MetaText>

            <MetaText>
              Hesabınız yok mu?{' '}
              <Link to="/signup">
                <label className="focus-text">Yeni üyelik oluşturun</label>
              </Link>
            </MetaText>

            <CopyrightText>
              ©{new Date().getFullYear()} Onur Temiz.
            </CopyrightText>
          </LoginSection>
        </LoginWrapper>
        <Col xs={0} sm={0} lg={12}>
          <SideHeroWrapper></SideHeroWrapper>
        </Col>
      </InnerLogin>
    </LoginDetailStyles>
  );
};

export default LoginDetail;
