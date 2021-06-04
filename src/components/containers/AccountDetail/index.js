import { Check, EditAlt, X } from '@styled-icons/boxicons-regular';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthContext';
import AccountDetailStyles, {
  StyledInput,
  SectionTitle,
  Section,
  StyledPassword,
  PasswordWrapper,
  StyledButton,
} from './styles';
import { notification } from 'antd';
import { errorHandler } from '@utils';
import firebase from 'firebase';

import userFirebase from '../../../firebase';
import { useHistory } from 'react-router';

const AccountDetail = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [accountOpen, setAccountOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccount = async () => {
      setLoading(true);
      const providers = await userFirebase
        .auth()
        .fetchSignInMethodsForEmail(user.email);
      if (!providers.includes('google.com')) {
        setAccountOpen(true);
      }
      setLoading(false);
    };

    checkAccount();
  }, []);

  if (loading) {
    return null;
  }

  if (!accountOpen) {
    history.push('/');
  }

  return (
    <AccountDetailStyles>
      <EmailSection />
      <PasswordSection />
    </AccountDetailStyles>
  );
};

export default AccountDetail;

const EmailSection = () => {
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(user.email);
  }, []);

  const changeEmail = async () => {
    try {
      await user.updateEmail(email);
      setEditOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Section>
      {editOpen ? (
        <>
          <StyledInput
            bordered={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <X className="action-icon" onClick={() => setEditOpen(false)} />
          <Check className="action-icon" onClick={() => changeEmail()} />
        </>
      ) : (
        <>
          <SectionTitle>{email}</SectionTitle>
          <EditAlt className="util-icon" onClick={() => setEditOpen(true)} />
        </>
      )}
    </Section>
  );
};

const PasswordSection = () => {
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [samePassword, setSamePassword] = useState();

  const changePassword = async () => {
    if (password !== samePassword) {
      notification.error({
        message: 'Hata!',
        description: 'Şifreler uyuşmuyor.',
      });
      return;
    }

    try {
      setLoading(true);

      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );

      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(password);
      notification.success({
        message: 'Başarı!',
        description: 'Şifreniz başarılı bir şekilde değişti!',
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      {editOpen ? (
        <>
          <PasswordWrapper>
            <StyledPassword
              bordered={false}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Şu anki şifreniz..."
            />
            <StyledPassword
              bordered={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Yeni Şifre..."
            />

            <StyledPassword
              bordered={false}
              value={samePassword}
              onChange={(e) => setSamePassword(e.target.value)}
              placeholder="Yeni Şifre yeniden..."
            />
            <StyledButton
              type="primary"
              onClick={changePassword}
              loading={loading}
            >
              Şifreyi Güncelle
            </StyledButton>
          </PasswordWrapper>
          <X
            className="action-icon"
            style={{
              alignSelf: 'flex-start',
              marginLeft: '15px',
              marginTop: '10px',
            }}
            onClick={() => setEditOpen(false)}
          />
        </>
      ) : (
        <>
          <SectionTitle>•••••••••••</SectionTitle>
          <EditAlt className="util-icon" onClick={() => setEditOpen(true)} />
        </>
      )}
    </Section>
  );
};
