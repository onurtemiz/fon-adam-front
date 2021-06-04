import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../AuthContext';
import HeaderMenuStyles, { HeaderItem } from './styles';

const HeaderMenu = () => {
  const { user } = useAuth();

  return (
    <HeaderMenuStyles>
      {user && (
        <HeaderItem after="BETA">
          <Link to={`/portfolios?owner=${user?.uid}`}>Portföylerim</Link>
        </HeaderItem>
      )}
      <HeaderItem>
        <Link to="/portfolios">Portföyler</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to="/analysis">Fon Analiz</Link>
      </HeaderItem>
    </HeaderMenuStyles>
  );
};

export default HeaderMenu;
