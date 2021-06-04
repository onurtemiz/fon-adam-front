import { Col, Form, notification } from 'antd';
import React, { useState } from 'react';
import ForgotPasswordDetailStyles, {
  SideHeroWrapper,
  InnerLogin,
  Title,
  TitleWrapper,
  LoginSection,
  LoginWrapper,
  SubmitButton,
  StyledInput,
  InputSection,
  MetaText,
  CopyrightText,
} from './styles';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase';

const ForgotPasswordDetail = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email }) => {
    try {
      setLoading(true);

      await firebase.auth().sendPasswordResetEmail(email);
      notification.success({
        message: 'Başarılı!',
        description: 'Epostanıza şifre sıfırlama isteği yolladık.',
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordDetailStyles>
      <InnerLogin>
        <LoginWrapper xs={24} sm={24} md={24} lg={12}>
          <LoginSection>
            <TitleWrapper>
              <Title>Şifremi Unuttum</Title>
            </TitleWrapper>

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

              <Form.Item>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Şifremi Sıfırla
                </SubmitButton>
              </Form.Item>
            </Form>

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
        <Col xs={0} sm={0} md={0} lg={12}>
          <SideHeroWrapper></SideHeroWrapper>
        </Col>
      </InnerLogin>
    </ForgotPasswordDetailStyles>
  );
};

export default ForgotPasswordDetail;
