import { Drawer } from 'antd';
import React from 'react';
import HeaderMenu from '../HeaderMenu';
import UserHeader from '../UserHeader';
import HeaderDrawerStyles from './styles';

const HeaderDrawer = ({ visible, setVisible }) => {
  return (
    <Drawer visible={visible} onClose={() => setVisible(false)}>
      <HeaderDrawerStyles>
        <HeaderMenu />
        <UserHeader />
      </HeaderDrawerStyles>
    </Drawer>
  );
};

export default HeaderDrawer;
