import styled from 'styled-components/macro';
import { Menu } from 'antd';
import { Button, Select } from '../../common/';
const MenuItem = Menu.Item;

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledMenu = styled(Menu)`
  line-height: 1.5;
  width: 100%;

  border-bottom: none !important;

  margin-bottom: 15px;
  margin-top: 15px;

  color: ${(p) => p.theme.metaColor600};

  .ant-menu-item:hover,
  .ant-menu-submenu:hover,
  .ant-menu-item-active,
  .ant-menu-submenu-active,
  .ant-menu-item-open,
  .ant-menu-submenu-open,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected {
    color: ${(p) => p.theme.primaryColor500} !important;
    border-bottom-color: ${(p) => p.theme.primaryColor500} !important;
    font-weight: bold !important;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  margin: 0px !important;
  margin-right: 15px !important;
  padding: 0px !important;
`;

export const StyledSelect = styled(Select)`
  width: 125px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin-right: 15px;

  border-radius: 6px;
`;
