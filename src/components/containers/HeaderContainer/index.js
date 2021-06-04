import { Menu } from '@styled-icons/boxicons-regular';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDrawer from './HeaderDrawer';
import HeaderMenu from './HeaderMenu';
import HeaderContainerStyles, {
  AppText,
  HeaderWrapper,
  BrandWrapper,
  DesktopWrapper,
  LeftSide,
} from './styles';
import UserHeader from './UserHeader';

const HeaderContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <HeaderContainerStyles>
      <HeaderDrawer visible={drawerOpen} setVisible={setDrawerOpen} />
      <HeaderWrapper>
        <LeftSide>
          <BrandWrapper>
            <Link to="/">
              <img src="/images/logo-small.png" style={{ width: '120px' }} />
            </Link>
          </BrandWrapper>
          <DesktopWrapper>
            <HeaderMenu />
          </DesktopWrapper>
        </LeftSide>
        <DesktopWrapper>
          <UserHeader />
        </DesktopWrapper>
        <Menu className="drawer-icon" onClick={() => setDrawerOpen(true)} />
      </HeaderWrapper>
    </HeaderContainerStyles>
  );
};

export default HeaderContainer;
