import { Col, Row, Divider, Form, notification } from 'antd';
import React, { useState } from 'react';
import SignupDetailStyles, {
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
  StyledCheck,
} from './styles';
import { Google, Apple } from '@styled-icons/boxicons-logos';
import { Link, useHistory } from 'react-router-dom';
import firebase, { googleProvider } from '../../../firebase';
import { useAuth } from '../../../AuthContext';
import { errorHandler } from '@utils';
import api from '../../../api';
import mixpanel from 'mixpanel-browser';
const SignupDetail = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleEmail = async ({ email, password }) => {
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
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      mixpanel.track('Email Signup');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithRedirect(googleProvider);
      mixpanel.track('Google Signup');
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
    <SignupDetailStyles>
      <InnerLogin>
        <LoginWrapper xs={24} sm={24} md={24} lg={12}>
          <LoginSection>
            <TitleWrapper>
              <Title>Kaydol</Title>
              <TitleDescription>
                Fon Adam ile fonlarını <b>tamamen ücretsiz</b> takip et.
              </TitleDescription>
            </TitleWrapper>

            <SignupsWrapper>
              <IconButton
                icon={<Google className="button-icon" />}
                onClick={handleGoogle}
              >
                Google ile devam et
              </IconButton>
            </SignupsWrapper>

            <Divider plain>ya da email ile kaydolun</Divider>

            <Form name="signup" onFinish={handleEmail}>
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
                <Row gutter={15}>
                  <Col span={12}>
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
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="passwordAgain"
                      rules={[
                        {
                          required: true,
                          message: 'Lütfen şifrenizi yeniden girin.',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Yazdığınız şifreler uyuşmuyor.')
                            );
                          },
                        }),
                      ]}
                    >
                      <StyledPassword placeholder="Şifrenizi yeniden girin..." />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="terms"
                      valuePropName="checked"
                      rules={[
                        {
                          required: true,
                          message:
                            'Lütfen kullanıcı sözleşmesini ve gizlilik sözleşmesini kabul edin.',
                        },
                        {
                          type: 'boolean',
                        },
                      ]}
                    >
                      <StyledCheck>
                        <a href="/terms" target="_blank" rel="noreferrer">
                          Kullanıcı sözleşmesini
                        </a>{' '}
                        ve{' '}
                        <a href="/privacy" target="_blank" rel="noreferrer">
                          gizlilik sözleşmesini
                        </a>{' '}
                        kabul ediyorum.
                      </StyledCheck>
                    </Form.Item>
                  </Col>
                </Row>
              </InputSection>
              <Form.Item>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Kaydol
                </SubmitButton>
              </Form.Item>
            </Form>

            <MetaText>
              Zaten hesabınız var mı?{' '}
              <Link to="/login">
                <label className="focus-text">Giriş yapın</label>
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
    </SignupDetailStyles>
  );
};

export default SignupDetail;
