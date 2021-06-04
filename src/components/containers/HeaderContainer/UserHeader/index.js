import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserHeaderStyles, {
  LoginButton,
  SignupButton,
  ButtonWrapper,
  LoggedInHeaderWrapper,
} from './styles';
import { useAuth } from '../../../../AuthContext';
import { Exit } from '@styled-icons/boxicons-regular';
import { HeaderItem } from '../HeaderMenu/styles';
import firebase from '../../../../firebase';

const UserHeader = () => {
  const { user } = useAuth();

  return (
    <UserHeaderStyles>
      {user ? <LoggedInHeader /> : <OnboardButtons />}
    </UserHeaderStyles>
  );
};

export default UserHeader;

const LoggedInHeader = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const checkAccount = async () => {
      const providers = await firebase
        .auth()
        .fetchSignInMethodsForEmail(user.email);
      if (!providers.includes('google.com')) {
        setAccountOpen(true);
      }
    };

    checkAccount();
  }, []);

  const logout = async () => {
    await firebase.auth().signOut();
    history.push('/');
  };

  return (
    <LoggedInHeaderWrapper>
      {accountOpen && (
        <HeaderItem>
          <Link to="/account">Hesabım</Link>
        </HeaderItem>
      )}
      <li>
        <Exit className="logout-icon" onClick={logout} />
      </li>
    </LoggedInHeaderWrapper>
  );
};

const OnboardButtons = () => {
  return (
    <ButtonWrapper>
      <Link to="/login">
        <LoginButton type="secondary">Giriş Yap</LoginButton>
      </Link>
      <Link to="/signup">
        <SignupButton type="primary" shadow>
          Kaydol
        </SignupButton>
      </Link>
    </ButtonWrapper>
  );
};
