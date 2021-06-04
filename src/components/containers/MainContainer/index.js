import React from 'react';
import MainContainerStyles from './styles';
import { HeaderContainer, ContentWrapper, FooterContainer } from '@containers';
const MainContainer = ({ children }) => {
  return (
    <MainContainerStyles>
      <HeaderContainer />
      <ContentWrapper>{children}</ContentWrapper>
      <FooterContainer />
    </MainContainerStyles>
  );
};

export default MainContainer;
